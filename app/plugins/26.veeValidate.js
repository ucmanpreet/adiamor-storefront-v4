// vee-validate 4 rules and messages.
import { configure, defineRule } from 'vee-validate'
import { email, min, required } from '@vee-validate/rules'
import { postcodeValidator } from 'postcode-validator'
import { generateMessage } from '~/utils/veeCompat.js'

// vee-validate 2 skipped non-required rules for empty values
const isEmpty = (value) => value === undefined || value === null || value === '' || (Array.isArray(value) && !value.length)

export default defineNuxtPlugin((nuxtApp) => {
  const countryCode = useRuntimeConfig().public.countryCode || 'US'

  defineRule('required', required)
  defineRule('email', email)
  defineRule('min', min)

  defineRule('postcode', (value, [country]) => {
    if (isEmpty(value)) return true
    try {
      return postcodeValidator(value, country ?? countryCode)
    } catch (e) {
      return false
    }
  })
  defineRule('phoneNumber', (value) => isEmpty(value) || /^\+?(\(\d{1,4}\)|\d{1,4})[\d\s-]*$/.test(value))
  defineRule('password_match', (value, [target]) => isEmpty(value) || value === target)

  configure({ generateMessage, validateOnBlur: false, validateOnChange: false, validateOnInput: false })

})
