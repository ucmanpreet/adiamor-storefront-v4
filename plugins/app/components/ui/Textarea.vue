<!-- File: BaseTextarea.vue -->
<template>
  <div class="flex flex-col space-y-1">
    <!-- Label -->
    <label
      v-if="label"
      :for="computedTextareaId"
      class="block text-sm font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <!-- Textarea Field -->
    <textarea
      :id="computedTextareaId"
      :name="name"
      :rows="rows"
      :placeholder="placeholder"
      v-model="textareaValue"
      v-validate="rules"
      v-bind="$attrs"
      :disabled="disabled"
      :aria-invalid="error ? 'true' : 'false'"
      :aria-describedby="error ? `${computedTextareaId}-error` : null"
      :aria-label="!label ? placeholder || name : null"
      :class="[
        'peer border p-3 w-full focus:outline-none focus:ring-2 focus:ring-primary',
        error ? 'border-red-600 focus:ring-red-600 focus:ring-offset-1' : 'border-gray-200',
        disabled ? 'bg-gray-100 cursor-not-allowed' : '',
        textareaClass
      ]"
    ></textarea>
  </div>
</template>

<script>
export default {
  emits: ['input', 'update:modelValue'],
    name : 'Textarea',
    props: {
        textareaId: {
            type: String,
            required: false,
        },
        name: {
            type: String,
            required: true,
        },
        label: {
            type: String,
            required: false,
        },
        modelValue: {
            type: String,
            default: undefined,
        },
        value: {
            type: String,
            default: '', // Default to an empty string to avoid issues when empty
        },
        error: {
            type: [String, Boolean],
            default: false,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
        rules: {
            type: String,
            default: '',
        },
        textareaClass: {
            type: String,
            default: '',
        },
        rows: {
            type: Number,
            default: 4,
        },
  },
  data() {
    return {
      textareaValue: this.modelValue !== undefined ? this.modelValue : this.value,
    };
  },
  computed: {
    computedTextareaId() {
      return (
        this.textareaId ||
        (this.label
          ? this.label.toLowerCase().replace(/\s+/g, '-')
          : `textarea-${this.uid}`)
      );
    },
  },
  watch: {
    value(newValue) {
      this.textareaValue = newValue;
    },
    modelValue(newValue) {
      this.textareaValue = newValue;
    },
    textareaValue(newValue) {
      this.$emit('input', newValue);
      this.$emit('update:modelValue', newValue);
    },
  },
};
</script>