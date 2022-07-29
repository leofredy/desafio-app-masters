export function validateEmail(email) {
  const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  return {
    error: !regex.test(email),
    requiredFields: 'email',
  };
}

export function validateBlankFields(listFields, data) {
  let error = false;

  const invalidFields = listFields
    .filter((requiredField) => {
      let invalid = false;
      if (typeof data[requiredField] === 'undefined') {
        invalid = true;
      } else if (
        Array.isArray(data[requiredField])
        || typeof data[requiredField] === 'string'
        || typeof data[requiredField] === 'number'
      ) {
        if (typeof data[requiredField] === 'number') {
          invalid = !String(data[requiredField]).length;
        } else {
          invalid = !data[requiredField].length;
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
