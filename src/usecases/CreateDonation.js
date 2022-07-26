/**
 * Implementação do projeto ultilizando a arquitetura limpa.
 * As camadas do caso de uso se torna responsável apenas pela regra da aplicação, sendo:
 *  - Validação dos campos para o funcionamento desta a aplicação em exclusivo,
 *  - E processamento dos calculos,etc
 *  - Deve ter depender apenas da regra do dominio
 *  - São regras que podem ser implementada fora do sistema - em papel e caneta.
 *
 *  *OBS: O repository que é uma cama mais externa utilizo a injeção de dependencia,
 *  pois o caso de uso não é obrigado a saber qual o repository sera usado, por isso
 *  é recebido por quem instanciará o caso de uso - neste caso o controller.
 */
import EventEmitter from 'events';

import Donation from '../domain/Donation.js';

export default class CreateDonation extends EventEmitter {
  constructor({ DonationRepository, validators }) {
    super();
    this._repository = DonationRepository;
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
        this._repository.create(donationData).then((data) => {
          this.emit('SUCCESS', {
            success: true,
            data,
          });
        }).catch((error) => {
          console.log('ERRORDONATION: ', error);
          this.emit('ERROR');
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
    if (email !== null && email !== undefined && this._validators.validateEmail(email).error) {
      requiredFieldsCase.push('email');
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
