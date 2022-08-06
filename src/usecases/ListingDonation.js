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
