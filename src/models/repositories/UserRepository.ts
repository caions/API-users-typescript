import { getRepository, Repository, ILike, FindManyOptions } from 'typeorm';
import { User } from '../entities/User';
import { IUser } from '../interfaces/user.interface';

type UserDTO = Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>;

export class UsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  public async filter(name: string, lastName: string): Promise<User[]> {
    const where: FindManyOptions['where'] = {};

    if (name) {
      where.name = ILike(name);
    }

    if (lastName) {
      where.lastName = ILike(lastName);
    }

    const user = await this.repository.find({
      where,
    });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }

  public async findByNickname(nickname: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { nickname: ILike(nickname) },
    });
    return user;
  }

  public async findByName(name: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      where: { name: ILike(name) },
    });
    return user;
  }

  public async create(userData: UserDTO): Promise<User> {
    const user = this.repository.create(userData);
    await this.repository.save(user);
    return user;
  }

  public async save(userData: UserDTO): Promise<User> {
    const user = await this.repository.save(userData);
    return user;
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
