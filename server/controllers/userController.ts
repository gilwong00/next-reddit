import { Request, Response } from 'express';
import { User } from '../entities';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const doesUserExist: boolean = !!(await User.findOneOrFail({ email }));

    if (doesUserExist)
      return res.status(400).send('Email address is already in use');

    const newUser = await User.create({ email, username, password }).save();

    return res.status(200).send({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
};
