import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm'

export class RelationSubUserSales1603656949037 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'sales',
      new TableForeignKey({
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        name: 'UsersSales',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    )
    await queryRunner.createForeignKey(
      'sales',
      new TableForeignKey({
        referencedTableName: 'sub_Users',
        referencedColumnNames: ['id'],
        columnNames: ['subUser_id'],
        name: 'SubUsersSales',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('sales', 'UsersSales')
    await queryRunner.dropForeignKey('sales', 'SubUsersSales')
  }
}
