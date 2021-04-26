import { getConnection } from 'typeorm';
import { Group } from '../groups/group.model';
// import { User } from '../users/user.model';

export async function addUsersToGroup(groupId: string, userId: string): Promise<boolean> {
  const connection = getConnection();

  // const a = await connection.createQueryBuilder().relation(Group, 'users').of(groupId).loadMany();
  // const b = await connection.createQueryBuilder().relation(User, 'groups').of(userId).loadMany();
  // console.log('a:', a);
  // console.log('b:', b);
  // return true;

  const queryRunner = connection.createQueryRunner();
  await queryRunner.connect();

  await queryRunner.startTransaction();

  try {
    await connection.createQueryBuilder().relation(Group, 'users').of(groupId).add(userId);

    return true;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    return false;
  } finally {
    await queryRunner.release();
  }
}
