import { Table, TableForeignKey } from 'typeorm';

export default class device1659663282049 {
  async up(queryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'device',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'type',
            type: 'enum',
            enum: [
              'notebook',
              'desktop',
              'netbook',
              'screen',
              'printer',
              'scanner',
            ],
            isNullable: false,
          },
          {
            name: 'condition',
            type: 'enum',
            enum: [
              'working',
              'notWorking',
              'broken',
            ],
            isNullable: false,
          },
          {
            name: 'donationId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'device',
      new TableForeignKey({
        columnNames: ['donationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'donation',
        onDelete: 'CASCADE',
      }),
    );
  }

  async down(queryRunner) {
    const table = await queryRunner.getTable('device');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('donationId') !== -1,
    );
    await queryRunner.dropForeignKey('device', foreignKey);

    await queryRunner.dropTable('device');
  }
}
