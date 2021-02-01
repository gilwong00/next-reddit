import { Request, Response } from 'express';
import { Post, User, Vote } from '../entities';

interface IPost {
  votes: Array<string>;
  title: string;
  body: string;
  username: string;
  user: User;
  id: number;
  created_at: Date;
  updated_at: Date;
  totalVotes: number;
}

interface IVoteAccumlator {
  votes: Array<string>;
  totalVotes: number;
}

const PAGE_LIMIT = 10;

// this might still need some work
// if there was only 1 vote and the user with that vote decides to downvote, the 1 should go down to -1
const computeVotes = (
  postVotes: Array<Vote>
): { votes: Array<string>; totalVotes: number } => {
  return postVotes.reduce<IVoteAccumlator>(
    (acc: IVoteAccumlator, curr: Vote) => {
      const isUpVote: boolean = curr.value === 1;
      if (isUpVote) acc.votes.push(curr.username);

      if (!isUpVote) {
        if (acc.votes.includes(curr.username)) {
          acc.votes = acc.votes.filter(
            (vote: string) => vote !== curr.username
          );
        }
      }

      acc.totalVotes = isUpVote ? (acc.totalVotes += 1) : (acc.totalVotes -= 1);
      return acc;
    },
    { votes: [], totalVotes: 0 }
  );
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { page } = req.query.page as { page: string };
    const [result, total] = await Post.findAndCount({
      order: { created_at: 'DESC' },
      take: PAGE_LIMIT,
      skip: (+page - 1) * PAGE_LIMIT,
      relations: ['votes']
    });

    const response: Array<IPost> = result.map<IPost>(post => {
      const { votes, totalVotes } = computeVotes(post.votes);
      return {
        ...post,
        votes,
        totalVotes
      };
    });

    const hasMore: boolean = Math.ceil(+page * PAGE_LIMIT) < total;
    return res.status(200).send({ posts: response, hasMore });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, body, username } = req.body;
    const newPost = await Post.create({ title, body, username }).save();
    return res.status(200).send(newPost);
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
