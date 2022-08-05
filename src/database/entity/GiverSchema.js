import { EntitySchema } from 'typeorm';

export default new EntitySchema({
  name: 'Giver',
  tableName: 'giver',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    name: {
      type: 'varchar',
      nullable: false,
    },
    email: {
      type: 'varchar',
      nullable: true,
    },
    phone: {
      type: 'varchar',
      nullable: false,
    },
    zip: {
      type: 'varchar',
      nullable: false,
    },
    city: {
      type: 'varchar',
      nullable: false,
    },
    state: {
      type: 'varchar',
      nullable: false,
    },
    streetAddress: {
      type: 'varchar',
      nullable: false,
    },
    number: {
      type: 'varchar',
      nullable: false,
    },
    complement: {
      type: 'varchar',
      nullable: true,
    },
    neighborhood: {
      type: 'varchar',
      nullable: false,
    },
  },
  relations: {
    donation: {
      target: 'Donation',
      type: 'one-to-many',
      inverseSide: 'giver',
      cascade: true,
    },
  },
});
