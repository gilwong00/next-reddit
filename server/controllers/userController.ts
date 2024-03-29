import { Request, Response } from 'express';
import { verify } from 'argon2';
import { User } from '../entities';
import { AuthRequest } from '../types';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, username, password } = req.body;
    const doesUserExist: boolean = !!(await User.findOne({ email }));

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

export const login = async (req: AuthRequest, res: Response) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const query = usernameOrEmail.includes('@')
      ? { where: { email: usernameOrEmail } }
      : { where: { username: usernameOrEmail } };

    const user = await User.findOne(query);

    if (user) {
      const isPasswordCorrect = await verify(user.password, password);

      if (!isPasswordCorrect) throw new Error('Passwords is incorrect');
      req.session.userId = user.id;

      return res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at
      });
    } else {
      return res
        .status(404)
        .send(
          `Could not find user with username or email of ${usernameOrEmail}`
        );
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err);
  }
};

export const whoami = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.session;

    if (!userId) return res.status(401).send('Not Authed');
    const user = await User.findOneOrFail({ id: userId });

    return res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};
