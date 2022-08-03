export function validateEmail(email) {
  const regex = /^[a-z0-9\-_.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return {
    error: !regex.test(email),
    requiredFields: 'email',
  };
}

export function validatePhone(phone) {
  let error = true;
  const onlyPhone = String(phone).replace(/\D/g, ''); // Deixa apenas números, caso enviado um numero converte para string.

  if (onlyPhone.length >= 8 && onlyPhone.length < 14) {
    // 8 - telefone fixo sem DDI e DDD "36999999"
    // 9 - celular sem DDI e sem DDD "999999999"
    // 10 - telefone fixo sem DDI com DDD "1836999999"
    // 11 - celular sem DDI mas com DDD "18999999999" ou ong "0800 0000 000"
    // 12 - telefone fixo com DDI e DDD "551836999999"
    // 13 - celular com DDI e DDD ex: "5518999999999"
    error = false;
  }

  return {
    error,
    requiredFields: 'phone',
  };
}

export function validateZip(zip) {
  const onlyZip = String(zip).replace(/\D/g, ''); // Deixa apenas números, caso enviado um numero converte para string.

  return {
    // Por padrão o zip brasileiro possui 8 algarismos, segundo pesquisas.
    error: onlyZip.length !== 8,
    requiredFields: 'zip',
  };
}

export function validateBlankFields(listFields, data) {
  let error = false;

  const invalidFields = listFields
    .filter((requiredField) => {
      let invalid = false;
      if (typeof data[requiredField] === 'undefined' || data[requiredField] === null) {
        invalid = true;
      } else if (
        Array.isArray(data[requiredField])
        || typeof data[requiredField] === 'string'
        || typeof data[requiredField] === 'number'
      ) { // string, number ou array
        if (typeof data[requiredField] === 'number') { // number
          invalid = !String(data[requiredField]).length;
        } else if (Array.isArray(data[requiredField])) { // array
          invalid = !data[requiredField].length;
        } else { // string
          // caso o campo seja uma string e um cep ou phone.
          if (requiredField === 'zip' || requiredField === 'phone') {
            if (requiredField === 'phone') {
              invalid = validatePhone(data[requiredField]).error;
            } else {
              invalid = validateZip(data[requiredField]).error;
            }
          } else { // qualquer campo string diferente de zip e phone
            // Limpo espaços desnecessários e verifico comprimento.
            invalid = !data[requiredField].trim().length;
          }
        }
      }

      return invalid;
    });

  if (invalidFields.length) {
    error = true;
  }

  return {
    error,
    invalidFields,
  };
}
