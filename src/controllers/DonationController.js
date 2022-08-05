import CreateDonation from '../usecases/CreateDonation.js';
import ListingDonation from '../usecases/ListingDonation.js';

import DonationRepository from '../database/repository/DonationRepository.js';

import { validateBlankFields, validateEmail } from '../utils/validator.js';

export default {
  create(request, response) { // criação de doação
    // injection dependency
    const createDonation = new CreateDonation({
      DonationRepository,
      validators: {
        validateBlankFields,
        validateEmail,
      },
    });

    createDonation
      .on('SUCCESS', (data) => {
        response.status(200).json(data);
      })
      .on('ERROR', (data) => {
        response.status(400).json(data);
      });

    createDonation.execute(request.body);
  },

  find(request, response) { // lista de doações.
    // injection dependency
    const listingDonation = new ListingDonation({ DonationRepository });

    listingDonation
      .on('SUCCESS', (data) => {
        response.status(200).json(data);
      })
      .on('ERROR', (data) => {
        response.status(400).json(data);
      });

    listingDonation.execute(request.query);
  },
};
