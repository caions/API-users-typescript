export interface IUser {
  id: string;
  name: string;
  lastName: string;
  nickname: string;
  address: string;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
}
