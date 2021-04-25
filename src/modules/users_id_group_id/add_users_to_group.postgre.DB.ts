import { getConnection } from 'typeorm';
import { Group } from '../groups/group.model';

export async function addUsersToGroup(groupId: string, userId: string): Promise<boolean> {
  const connection = getConnection();
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
