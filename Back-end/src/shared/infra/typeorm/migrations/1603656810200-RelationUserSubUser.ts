import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class RelationUserSubUser1603656810200 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'sub_Users',
      new TableForeignKey({
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        name: 'SubUsersUsers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sub_Users', 'SubUsersUsers')
  }
}
