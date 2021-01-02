import { Request, Response } from 'express';
import { Post } from '../entities';

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

    const hasMore: boolean = Math.ceil(+page * PAGE_LIMIT) < total;
    return res.status(200).send({ posts: result, hasMore });
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
