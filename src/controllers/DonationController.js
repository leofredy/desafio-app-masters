import CreateDonation from '../usecases/CreateDonation.js';

import { validateBlankFields, validateEmail } from '../utils/validator.js';

export default {
  create(request, response) {
    const createDonation = new CreateDonation({
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
};
