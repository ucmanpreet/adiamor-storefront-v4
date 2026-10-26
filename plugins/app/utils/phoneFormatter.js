import { parsePhoneNumberFromString } from 'libphonenumber-js'

export function formatPhoneByCountry(input, country) {
  if (!input) return ''

  const phone = parsePhoneNumberFromString(input, country)

  if (!phone) return input

  // Allow formatting for possible numbers
  if (!phone.isPossible()) {
    return input
  }

  return phone.formatNational()
}