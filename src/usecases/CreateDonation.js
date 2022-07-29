import EventEmitter from 'events';

import Donation from '../domain/Donation.js';

export default class CreateDonation extends EventEmitter {
  constructor({ validators }) {
    super();
    this._validators = validators;
  }

  execute(donationData) {
    const donation = new Donation(donationData, this._validators.validateBlankFields);
    const validationData = donation.validate();
    if (validationData.error) {
      this.emit('ERROR', validationData);
    } else {
      const { errorCase, requiredFieldsCase, errorMessageCase } = this._validate(donationData);
      if (errorCase) {
        const dataCase = {
          error: errorCase,
          errorMessage: errorMessageCase,
        };
        if (requiredFieldsCase.length) {
          dataCase.requiredFields = requiredFieldsCase;
        }
        this.emit('ERROR', dataCase);
      } else {
        this.emit('SUCCESS', {
          success: true,
        });
      }
    }
  }

  _validate(donationData) {
    const { devices, email } = donationData;

    let errorCase = true;
    let errorMessageCase = '';
    const requiredFieldsCase = [];

    // Se tiver email, valida o email
    if (email.length && this._validators.validateEmail(email).error) {
      errorMessageCase = 'O campo email é opcional, mas se informado deve ser um email válido';
    } else { // Valida os valores dos campos dos devices.
      const validDevice = devices.every((value) => {
        if (
          (
            value.type !== 'notebook'
            && value.type !== 'desktop'
            && value.type !== 'netbook'
            && value.type !== 'screen'
            && value.type !== 'printer'
            && value.type !== 'scanner'
          ) || (
            value.condition !== 'working'
            && value.condition !== 'notWorking'
            && value.condition !== 'broken'
          )
        ) {
          return false;
        }

        return true;
      });

      if (!validDevice) { // Se os valores dos campos dos devices estiverem incorretos
        requiredFieldsCase.push({
          key: 'type',
          valueOption: [
            'notebook',
            'desktop',
            'netbook',
            'screen',
            'printer',
            'scanner',
          ],
        });
        requiredFieldsCase.push({
          key: 'condition',
          valueOption: [
            'working',
            'notWorking',
            'broken',
          ],
        });

        errorMessageCase = 'Todos os campos de device devem ser informados corretamente';
      } else { // Se tudo der certo
        errorCase = false;
      }
    }

    return {
      errorCase,
      errorMessageCase,
      requiredFieldsCase,
    };
  }
}
