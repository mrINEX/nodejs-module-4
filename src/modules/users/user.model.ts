import { BaseEntity, Column, DeleteDateColumn, Entity, Like, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from '../groups/group.model';

export interface OutputUser {
  id: string;
  login: string;
  password: string;
  age: number;
  deletedDate: Date;
}

export type InputUser = Pick<OutputUser, 'login' | 'password' | 'age'>;
export type ToResponseUser = Pick<OutputUser, 'id' | 'login' | 'age'>;
export type IdUser = Pick<OutputUser, 'id'>;

export type IGetAutoSuggest = { loginSubstring: string; limit: number | unknown };

@Entity()
export class User extends BaseEntity implements OutputUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  age: number;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToMany(() => Group, (group) => group.users)
  groups: Group[];

  static async getAutoSuggest(loginSubstring: string, limit: number): Promise<User[]> {
    const filtered = await this.find({
      login: Like(`%${loginSubstring}%`),
    });
    return filtered.slice(0, limit);
  }

  static toResponse(user: OutputUser): ToResponseUser {
    const { id, login, age } = user;
    return { id, login, age };
  }
}
