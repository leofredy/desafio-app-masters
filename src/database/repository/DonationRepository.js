import dataSource from '../ormconfig.js';

import GiverRepository from './GiverRepository.js';

class DonationRepository {
  constructor() {
    this._donationRepository = dataSource.getRepository('Donation');
  }

  async create({
    name,
    email,
    phone,
    zip,
    city,
    state,
    streetAddress,
    number,
    complement,
    neighborhood,
    deviceCount,
    devices,
  }) {
    const { id: giverId } = await GiverRepository.add({
      name,
      email,
      phone,
      zip,
      city,
      state,
      streetAddress,
      number,
      complement,
      neighborhood,
    });
    const { id: donationId, device: donationDevices } = await this._donationRepository.save({
      deviceCount,
      giverId,
      device: devices,
    });

    return {
      giverId,
      donationId,
      devicesId: donationDevices.map((device) => device.id),
    };
  }

  findAll({ offset, limit, order }) {
    return this._donationRepository.find({
      take: limit,
      skip: offset,
      order: {
        id: order || 'DESC',
      },
      relations: {
        giver: true,
        device: true,
      },
    });
  }
}
// Singleton Pattern
export default new DonationRepository();
