// Validation messages for vee-validate 4 (vee-validate 2 wording).
// Forms use `useForm` / `useField` directly; `localize` installs the custom texts from utils/customMessages.js.

// ---- messages (vee-validate 2 wording + `localize('en', { custom: { field: { rule: () => msg } } })`) ----
const dictionary = { custom: {} }

export const localize = (_locale, dict = {}) => {
  Object.entries(dict.custom || {}).forEach(([field, rules]) => {
    dictionary.custom[field] = { ...(dictionary.custom[field] || {}), ...rules }
  })
}

export const generateMessage = (ctx) => {
  const rule = ctx.rule?.name
  const params = ctx.rule?.params || []
  const custom = dictionary.custom[ctx.name]?.[rule]
  if (custom) return typeof custom === 'function' ? custom(ctx.field, params, ctx) : custom

  const f = ctx.field
  const defaults = {
    required: `The ${f} field is required.`,
    email: `The ${f} field must be a valid email.`,
    min: `The ${f} field must be at least ${params[0]} characters.`,
    postcode: `${f} must be a valid postal code.`,
    phoneNumber: `${f} must be a valid phone number.`,
    password_match: 'Passwords do not match',
  }
  return defaults[rule] || `The ${f} field is not valid.`
}
