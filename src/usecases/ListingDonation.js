import { EventEmitter } from 'events';

export default class ListingDonation extends EventEmitter {
  constructor({ DonationRepository }) {
    super();
    this._repository = DonationRepository;
  }

  execute({ limit, offset, order }) {
    const { error, invalidFields } = this._validate({ limit, offset, order });
    if (error) {
      this.emit('ERROR', {
        requiredFields: invalidFields,
        errorMessage: 'Todos os campos obrigatórios devem ser informados',
      });
    } else {
      this._repository.findAll({ limit, offset, order }).then((data) => {
        this.emit('SUCCESS', { success: true, data });
      });
    }
  }

  _validate({ limit, offset, order }) {
    let error = false;
    const invalidFields = [];

    if (Number.isNaN(parseInt(limit, 10))
      || Number.isNaN(parseInt(offset, 10))
    ) { // verifica se limit ou offset não é um possivel number
      error = true;
      if (Number.isNaN(parseInt(limit, 10))) {
        invalidFields.push('limit');
      }
      if (Number.isNaN(parseInt(offset, 10))) {
        invalidFields.push('offset');
      }
    }

    // se order for diferente de asc ou desc
    if (order
      && order.toLowerCase() !== 'asc'
      && order !== 'desc'
    ) {
      invalidFields.push('order');
      error = true;
    }

    return {
      error,
      invalidFields,
    };
  }
}
