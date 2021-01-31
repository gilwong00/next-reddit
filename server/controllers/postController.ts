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
}

const PAGE_LIMIT = 10;

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { page } = req.query.page as { page: string };
    const [result, total] = await Post.findAndCount({
      order: { created_at: 'DESC' },
      take: PAGE_LIMIT,
      skip: (+page - 1) * PAGE_LIMIT,
      relations: ['votes']
    });

    // interate through the votes and return and array with userIds that have a upvote
    const response: Array<IPost> = result.map<IPost>(post => {
      const votes =
        post.votes.length === 0
          ? []
          : post.votes.reduce<Array<string>>(
              (acc: Array<string>, curr: Vote) => {
                if (curr.value === 1) acc.push(curr.username);
                return acc;
              },
              []
            );

      return {
        ...post,
        votes
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
