import { Table, TableForeignKey } from 'typeorm';

export default class donation1659580164144 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'donation',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'deviceCount',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'giverId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'donation',
      new TableForeignKey({
        columnNames: ['giverId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'giver',
        onDelete: 'CASCADE',
      }),
    );
  }

  async down(queryRunner) {
    const table = await queryRunner.getTable('giver');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('giverId') !== -1,
    );
    await queryRunner.dropForeignKey('donation', foreignKey);
    await queryRunner.dropTable('donation');
  }
}
