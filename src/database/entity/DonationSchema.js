import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'Donation',
  tableName: 'donation',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    deviceCount: {
      type: 'int',
      nullable: false,
    },
    giverId: {
      type: 'int',
      nullable: false,
    },
  },
  relations: {
    giver: {
      target: 'Giver',
      type: 'many-to-one',
      joinColumn: true,
    },
    device: {
      target: 'Device',
      type: 'one-to-many',
      inverseSide: 'donation',
      cascade: true,
    },
  },
});
