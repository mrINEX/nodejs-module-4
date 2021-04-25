import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm';
import { User } from '../users/user.model';

type Permissions = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type GroupType = {
  id: string;
  name: string;
  permissions: Array<Permissions>;
};

export type InputGroup = Omit<GroupType, 'id'>;

@Entity()
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('simple-array')
  permissions: Array<Permissions>;

  @ManyToMany(() => User)
  @JoinTable({ name: 'UserGroup' })
  users: User[];
}
