export default class Donation {
  constructor(
    {
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
    },
    validationFunction,
  ) {
    this._name = name;
    this._email = email;
    this._phone = phone;
    this._zip = zip;
    this._city = city;
    this._state = state;
    this._streetAddress = streetAddress;
    this._number = number;
    this._complement = complement;
    this._neighborhood = neighborhood;
    this._deviceCount = deviceCount;
    this._devices = devices;

    this._validationFunction = validationFunction;
  }

  validate() {
    const requiredFields = [
      'name',
      'phone',
      'zip',
      'city',
      'state',
      'streetAddress',
      'number',
      'neighborhood',
      'deviceCount',
      'devices',
    ];

    const { error, invalidFields } = this._validationFunction(
      requiredFields,
      {
        name: this._name,
        phone: this._phone,
        zip: this._zip,
        city: this._city,
        state: this._state,
        streetAddress: this._streetAddress,
        number: this._number,
        neighborhood: this._neighborhood,
        deviceCount: this._deviceCount,
        devices: this._devices,
      },
    );

    if (error) {
      return {
        error,
        requiredFields: invalidFields,
        errorMessage: 'Todos os campos obrigatórios devem ser informados',
      };
    }
    if (parseInt(this._deviceCount, 10) !== this._devices.length) { // valida número de devices
      return {
        error: true,
        errorMessage: `A quantidade de equipamentos ${this._deviceCount} não está de acordo com as informações de equipamentos enviados ${this._devices.length}`,
      };
    }
    if (!Array.isArray(this._devices)) {
      return {
        error: true,
        errorMessage: 'O campo device deve ser do tipo Array',
      };
    }

    return {
      error: false,
    };
  }
}
