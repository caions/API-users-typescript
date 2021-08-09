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
    const { name, lastName, nickname, address, bio } = req.body;

    const userRepository = new UsersRepository();
    const checkNicknameExist = await userRepository.findByNickname(nickname);

    if (checkNicknameExist) {
      throw new AppError('Este nickname já esta em uso!');
    }

    const user = await userRepository.create({
      name,
      lastName,
      nickname,
      address,
      bio,
    });

    return res.status(201).json(user);
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
      user.lastName = lastName;
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
      const checkNicknameExists = await userRepository.findByNickname(nickname);

      if (checkNicknameExists) {
        throw new AppError('Este nickname já esta em uso!');
      }
      user.nickname = nickname;
    }

    const updatedUser = await userRepository.save(user);

    return res.json(updatedUser);
  }

  public async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userRepository = new UsersRepository();
    const checkUserExist = await userRepository.findById(id);

    if (!checkUserExist) {
      throw new AppError('Usuário não encontrado!', 404);
    }

    await userRepository.deleteById(id);

    return res.json();
  }
}
