import {
  BaseEntity, Column, DeleteDateColumn, Entity, Like, PrimaryGeneratedColumn
} from "typeorm";

export interface OutputUser {
  id: string;
  login: string;
  password: string;
  age: number;
  deletedDate: Date;
}

export type InputUser = Pick<OutputUser, 'login' | 'password' | 'age'>;
export type ToResponseUser = Pick<OutputUser, 'id' | 'login' | 'age'>;

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

  static async getAutoSuggest(loginSubstring: string, limit: number): Promise<User[]> {
    const filtered = await this.find({
      login: Like(`%${loginSubstring}%`)
    });
    return filtered.slice(0, limit);
  }
}
