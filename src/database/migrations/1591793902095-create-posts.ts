import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createPosts1591793902095 implements MigrationInterface {
  private readonly table = new Table({
    name: 'posts',
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
        name: 'authorId',
        type: 'integer',
        isNullable: false,
      },
      {
        name: 'title',
        type: 'varchar',
        length: '30',
        isNullable: false,
      },
      {
        name: 'text',
        type: 'varchar',
        length: '255',
        isNullable: false,
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

  private foreignKey = new TableForeignKey({
    columnNames: ['authorId'],
    referencedTableName: 'authors',
    referencedColumnNames: ['id'],
    onDelete: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKey(this.table, this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
