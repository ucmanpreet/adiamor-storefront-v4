// vee-validate 2 API on top of vee-validate 4 (rules engine).
// The Nuxt 2 forms use: `v-validate` directive, `data-vv-as`, `errors.first/has/clear/count/items`,
// `$validator.validate/validateAll/reset/localize/errors`. Keeping that surface means the 15 form files do not
// have to be rewritten, while rule evaluation, rule syntax ('required|min:6', { password_match: pw }) and
// custom rules run on vee-validate 4.
import { reactive } from 'vue'
import { validate as runRules } from 'vee-validate'

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

// ---- error bag ----
export class ErrorBag {
  constructor() {
    this.items = reactive([])
  }
  add(error) {
    this.items.push({ field: error.field, msg: error.msg, rule: error.rule, scope: error.scope ?? null, id: error.id })
  }
  remove(field) {
    for (let i = this.items.length - 1; i >= 0; i--) if (this.items[i].field === field) this.items.splice(i, 1)
  }
  clear(field) {
    if (field) return this.remove(field)
    this.items.splice(0)
  }
  first(field) {
    const found = this.items.find((e) => e.field === field)
    return found ? found.msg : null
  }
  has(field) {
    return this.items.some((e) => e.field === field)
  }
  collect(field) {
    return field ? this.items.filter((e) => e.field === field).map((e) => e.msg) : this.items.map((e) => e.msg)
  }
  all() {
    return this.items.map((e) => e.msg)
  }
  any() {
    return this.items.length > 0
  }
  count() {
    return this.items.length
  }
}

// ---- validator (one per component, created lazily) ----
export class Validator {
  constructor() {
    this.fields = new Map()
    this.errors = new ErrorBag()
  }
  localize(locale, dict) {
    localize(locale, dict)
  }
  register(field) {
    this.fields.set(field.name, field)
  }
  unregister(name) {
    this.fields.delete(name)
    this.errors.remove(name)
  }
  async validateField(field, value = field.getValue()) {
    const rules = field.rules
    this.errors.remove(field.name)
    if (!rules || (typeof rules === 'object' && !Object.keys(rules).length)) return true
    const result = await runRules(value, rules, { name: field.name, label: field.alias || field.name })
    if (!result.valid) result.errors.forEach((msg) => this.errors.add({ field: field.name, msg }))
    return result.valid
  }
  /** validate('field') -> boolean | validate() -> all fields */
  async validate(name, value) {
    if (name === undefined) return this.validateAll()
    const field = this.fields.get(name)
    if (!field) return true
    return this.validateField(field, value)
  }
  async validateAll() {
    const results = await Promise.all([...this.fields.values()].map((f) => this.validateField(f)))
    return results.every(Boolean)
  }
  reset() {
    this.errors.clear()
  }
}

// ---- `v-validate` directive (native inputs and components using v-model) ----
// Vue 3 detail: on a component, directive hooks receive the vnode of the component's ROOT ELEMENT (not the component
// vnode), so the component instance is recovered through `el.__vueParentComponent` (the owner of that root element).
const resolveTarget = (el, binding) => {
  const owner = el.__vueParentComponent
  const isComponent = !!owner && owner !== binding.instance?.$ && owner.subTree?.el === el
  if (!isComponent) {
    return {
      name: el.getAttribute?.('name') || el.getAttribute?.('data-vv-name'),
      alias: el.getAttribute?.('data-vv-as') || undefined,
      read: () => (el.type === 'checkbox' ? (el.checked ? el.value || true : '') : el.value),
      isComponent,
    }
  }
  return {
    name: owner.props.name || owner.attrs['data-vv-name'],
    alias: owner.attrs['data-vv-as'] || undefined,
    read: () => owner.props.modelValue ?? owner.props.value ?? '',
    isComponent,
  }
}

export const validateDirective = {
  mounted(el, binding) {
    const validator = binding.instance?.$validator
    if (!validator) return
    const target = resolveTarget(el, binding)
    if (!target.name) return

    const field = {
      name: target.name,
      alias: target.alias,
      rules: binding.value,
      lastValue: target.read(),
      getValue: target.read,
    }
    el.__vee = { validator, field, target }
    validator.register(field)

    const validateNow = () => validator.validateField(field, field.getValue())
    el.__veeValidateNow = validateNow
    // vee-validate 2 default events: input | blur (focusout bubbles up from inner inputs of component roots)
    if (!target.isComponent) el.addEventListener('input', validateNow)
    el.addEventListener('focusout', validateNow)
  },
  updated(el, binding) {
    const state = el.__vee
    if (!state) return
    const { field, validator, target } = state
    field.rules = binding.value
    if (target.isComponent) {
      const value = target.read()
      if (value !== field.lastValue) {
        field.lastValue = value
        validator.validateField(field, value)
      }
    }
  },
  unmounted(el) {
    const state = el.__vee
    if (!state) return
    el.removeEventListener('input', el.__veeValidateNow)
    el.removeEventListener('focusout', el.__veeValidateNow)
    state.validator.unregister(state.field.name)
    delete el.__vee
  },
}

// ---- global mixin: `this.$validator` (lazy) and `errors` on every component, like vee-validate 2 ----
export const validatorMixin = {
  beforeCreate() {
    let validator
    Object.defineProperty(this.$.ctx, '$validator', {
      configurable: true,
      get: () => (validator ||= new Validator()),
    })
  },
  computed: {
    errors() {
      return this.$validator.errors
    },
  },
}
