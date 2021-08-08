import { Request, Response } from 'express';

import { UsersRepository } from '../models/repositories/UserRepository';
import { AppError } from '../errors/AppError';

interface IRequest {
  name?: string;
  lastName?: string;
}

export class UsersControllers {
  public async index(req: Request, res: Response): Promise<Response> {
    const { name, lastName } = req.query as IRequest;

    const userRepository = new UsersRepository();
    const users = await userRepository.filter(name, lastName);
    return res.json(users);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const userRepository = new UsersRepository();
    const user = await userRepository.findByNickname(req.params.nickname);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }
    const { name, lastName, nickname } = user;

    return res.json({ name, lastName, nickname });
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { nickname } = req.body;

    const userRepository = new UsersRepository();
    const user = await userRepository.findByNickname(
      nickname.toLocaleLowerCase(),
    );

    if (user) {
      throw new AppError('Este nickname já esta em uso!');
    }

    const newUser = {
      ...req.body,
    };

    const novo = await userRepository.create(newUser);

    return res.status(201).json(novo);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { lastName, address } = req.body;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado', 404);
    }

    if (lastName) {
      user.lastName = lastName.toLowerCase();
    }

    if (address) {
      user.address = address;
    }

    await userRepository.save(user);

    return res.json(user);
  }

  public async patch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { nickname } = req.body;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    if (nickname) {
      const findNickname = await userRepository.findByNickname(nickname);

      if (findNickname) {
        throw new AppError('Este nickname já esta em uso!');
      }
      user.nickname = nickname.toLowerCase();
    }

    await userRepository.save(user);

    return res.json(user);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = new UsersRepository();
    const user = await userRepository.findById(id);

    if (!user) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    await userRepository.deleteById(id);

    return res.json();
  }
}
