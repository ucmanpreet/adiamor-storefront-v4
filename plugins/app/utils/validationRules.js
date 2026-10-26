import VeeValidate from 'vee-validate'
import { postcodeValidator } from 'postcode-validator'

export const registerValidationRules = (countryCode = 'US') => {
  VeeValidate.Validator.extend('postcode', {
    params: ['country'],
    validate(value, [country]) {
      try {
        const isValid = postcodeValidator(value, country ?? countryCode);
        return isValid
      } catch (error) {
        return false;
      }
    },
    getMessage: field => `${field} must be a valid postal code.`
  })

  VeeValidate.Validator.extend('phoneNumber', {
    validate(value) {
      const phoneNumberPattern = /^\+?(\(\d{1,4}\)|\d{1,4})[\d\s-]*$/;      

      return phoneNumberPattern.test(value)
    },
    getMessage: field => `${field} must be a valid phone number.`
  })

   VeeValidate.Validator.extend('password_match', {
    params: ['targetValue'],
    validate(value, [targetValue]) {
      return value === targetValue;
    },
    getMessage: () => 'Passwords do not match'
  })
}
