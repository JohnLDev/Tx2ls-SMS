import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class RelationStorage1603658567588 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'storage',
      new TableForeignKey({
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        name: 'UsersStorage',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('storage', 'UsersStorage')
  }
}
