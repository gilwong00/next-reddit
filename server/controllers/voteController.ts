import { Request, Response } from 'express';
import { Vote } from '../entities';

export const vote = async (req: Request, res: Response) => {
  const { value, postId, username } = req.body;
  // maybe fetch user with userId to get username

  const newVote = await Vote.create({ value, postId, username }).save();
  return res.status(200).send(newVote);
};
