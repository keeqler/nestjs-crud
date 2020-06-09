import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAuthors1591608589401 implements MigrationInterface {
  private readonly table = new Table({
    name: 'authors',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        isUnique: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '30',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'createdAt',
        type: 'date',
        isNullable: false,
        default: 'now()',
      },
      {
        name: 'updatedAt',
        type: 'date',
        isNullable: false,
        default: 'now()',
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
