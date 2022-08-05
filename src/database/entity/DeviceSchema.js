import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'Device',
  tableName: 'device',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    type: {
      type: 'enum',
      enum: [
        'notebook',
        'desktop',
        'netbook',
        'screen',
        'printer',
        'scanner',
      ],
      nullable: false,
    },
    condition: {
      type: 'enum',
      enum: [
        'working',
        'notWorking',
        'broken',
      ],
      nullable: false,
    },
    donationId: {
      type: 'int',
      nullable: false,
    },
  },
  relations: {
    donation: {
      type: 'many-to-one',
      target: 'Donation',
      joinColumn: true,
    },
  },
});
