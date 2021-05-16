import { Connection, QueryRunner, Table } from 'typeorm';

export async function dropAndCreateTable(queryRunner: QueryRunner, connection: Connection): Promise<void> {
  const hasTable: boolean = await queryRunner.hasTable('user');
  if (hasTable) {
    // await queryRunner.dropTable('user');
    return;
  }
  await queryRunner.createTable(Table.create(connection.entityMetadatas[0], connection.driver));
}
