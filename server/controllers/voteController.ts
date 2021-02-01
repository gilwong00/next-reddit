import { Request, Response } from 'express';
import { Vote } from '../entities';

export const vote = async (req: Request, res: Response) => {
  const { value, postId, username } = req.body;

  const newVote = await Vote.create({
    value,
    post_id: postId,
    username
  }).save();
  return res.status(200).send(newVote);
};
