<template>
  <client-only>
    <div ref="root">
      <form aria-labelledby="la-form-heading" novalidate @submit.prevent="onSubmit" class="space-y-4">
        <h3 v-if="config.title" id="la-form-heading" class="text-2xl font-semibold mb-2">
          {{ config.title }}
        </h3>

        <p v-if="config.subtitle" class="text-sm text-gray-500 mb-6" v-html="formattedSubtitle"></p>
        <div style="position:absolute; left:-9999px; top:-9999px;" aria-hidden="true">
          <label :for="`la-${type}-website`">Leave this field empty</label>
          <input
            :id="`la-${type}-website`"
            v-model="honeypot"
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
          />
        </div>

        <div class="space-y-4">
          <template v-for="(field, index) in config.fields">
            <div v-if="field.type === 'number-range'" :key="`${field.key}_range`" class="grid grid-cols-2 gap-3">
              <div>
                <InputField :id="`la-${field.key}-min`" type="number" :label="`${field.label} (min)`"
                  :name="`${field.key}_min`" v-model.number="values[field.minKey]" :placeholder="field.minPlaceholder"
                  :min="field.min" :max="field.max" :step="field.step" :disabled="loading" />
              </div>
              <div>
                <InputField :id="`la-${field.key}-max`" type="number" :label="`${field.label} (max)`"
                  :name="`${field.key}_max`" v-model.number="values[field.maxKey]" :placeholder="field.maxPlaceholder"
                  :min="field.min" :max="field.max" :step="field.step" :disabled="loading" />
              </div>
            </div>
            <div v-else-if="field.type === 'textarea-with-attachments'" :key="`${field.key}_textarea_attachments`">
              <label :for="`la-${field.key}`" class="block text-sm font-medium text-gray-700 mb-1">
                {{ field.label }}
                <span v-if="field.required" class="text-red-500 ml-0.5" aria-hidden="true">*</span>
              </label>

              <div class="border border-gray-300 rounded-md overflow-hidden" @dragover.prevent
                @drop.prevent="handleDrop($event)" :class="submitted && fieldErrors[field.key]
                  ? 'border-red-600'
                  : 'border-gray-300 focus:border-primary'
                  ">
                <textarea :id="`la-${field.key}`" v-model="values[field.key]" :name="field.key" :rows="field.rows || 4"
                  :placeholder="field.placeholder" :disabled="loading" :aria-invalid="submitted && fieldErrors[field.key] ? 'true' : 'false'
                    " :aria-describedby="`err-${field.key}`" class="w-full px-3 py-2 resize-none border-0 focus:ring-0"
                  @input="clearError(field.key)" />
                <div v-if="attachments?.length" class="border-t px-3 py-2 space-y-2">
                  <div v-for="(file, index) in attachments" :key="index"
                    class="flex items-center justify-between text-sm">
                    <span>
                      {{ file.name }}
                      ({{ (file.size / 1024).toFixed(1) }} KB)
                    </span>

                    <button type="button" class="text-red-500" @click="removeFile(index)">
                      ✕
                    </button>
                  </div>
                </div>

                <!-- Footer -->
                <div class="border-t px-3 py-2 flex items-center">
                  <label class="cursor-pointer text-primary text-sm" @click="emit('fileInputClicked')">
                    📎 Attach file
                    <input type="file" multiple class="hidden" @change="handleFiles($event)" />
                  </label>
                </div>
              </div>
            </div>

            <!-- ·· select ··········································· -->
            <div v-else-if="field.type === 'select'" :key="`${field.key}_select`">
              <label :for="`la-${field.key}`" class="block text-sm font-medium text-gray-700 mb-1">
                {{ field.label }}
                <span v-if="field.required" class="text-red-500 ml-0.5" aria-hidden="true">*</span>
                <span v-else-if="field.optional" class="font-normal text-gray-400 ml-1">(optional)</span>
              </label>

              <select :id="`la-${field.key}`" v-model="values[field.key]" :name="field.key" :disabled="loading"
                :aria-invalid="submitted && fieldErrors[field.key] ? 'true' : 'false'
                  " :aria-describedby="`err-${field.key}`"
                class="w-full px-3 py-2.5 text-sm border rounded-md bg-white text-gray-900 appearance-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                :class="submitted && fieldErrors[field.key]
                  ? 'border-red-600'
                  : 'border-gray-300 focus:border-primary'
                  " @change="clearError(field.key)">
                <option value="">Select {{ field.label.toLowerCase() }}</option>
                <option v-for="opt in field.options" :key="opt" :value="opt">
                  {{ opt }}
                </option>
              </select>

              <small :id="`err-${field.key}`" class="error" role="alert" aria-live="assertive"
                v-show="submitted && fieldErrors[field.key]">{{ fieldErrors[field.key] }}</small>
            </div>

            <!-- ·· textarea ········································· -->
            <div v-else-if="field.type === 'textarea'" :key="`${field.key}_textarea`">
              <label :for="`la-${field.key}`" class="block text-sm font-medium text-gray-700 mb-1">
                {{ field.label }}
                <span v-if="field.required" class="text-red-500 ml-0.5" aria-hidden="true">*</span>
                <span v-else-if="field.optional" class="font-normal text-gray-400 ml-1">(optional)</span>
              </label>

              <textarea :id="`la-${field.key}`" v-model="values[field.key]" :name="field.key" :rows="field.rows || 4"
                :placeholder="field.placeholder" :disabled="loading" :aria-invalid="submitted && fieldErrors[field.key] ? 'true' : 'false'
                  " :aria-describedby="`err-${field.key}`"
                class="w-full px-3 py-2.5 text-sm border rounded-md bg-white text-gray-900 resize-y min-h-[100px] leading-relaxed transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30"
                :class="submitted && fieldErrors[field.key]
                  ? 'border-red-600'
                  : 'border-gray-300 focus:border-primary'
                  " @input="clearError(field.key)" />

              <small :id="`err-${field.key}`" class="error" role="alert" aria-live="assertive"
                v-show="submitted && fieldErrors[field.key]">{{ fieldErrors[field.key] }}</small>
            </div>
            <!-- ·· checkbox ········································· -->
            <div v-else-if="field.type === 'checkbox'" :key="`${field.key}_checkbox`" class="flex items-start gap-3">
              <input :id="`la-${field.key}`" v-model="values[field.key]" :name="field.key" type="checkbox"
                :disabled="loading" class="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />

              <label :for="`la-${field.key}`" class="text-sm text-gray-700 cursor-pointer">
                {{ field.label }}
                <span v-if="field.required" class="text-red-500 ml-0.5" aria-hidden="true">*</span>
                <span v-else-if="field.optional" class="font-normal text-gray-400 ml-1">(optional)</span>
              </label>
            </div>

            <div v-else-if="field.type === 'additional_message'" :key="`${field.key}_${index}_span_message`">
              <p v-if="field?.isHtml" v-html="field?.text"></p>
              <small v-else :id="`err-${field.key}`" class="">{{ field?.text }}</small>
            </div>
            <div v-else-if="field.type === 'msg_with_simple_file'" :key="`${field.key}_file`" class="relative">
              <textarea :id="`la-${field.key}`" v-model="values[field.key]" :rows="field.rows || 3"
                :placeholder="field.placeholder"
                class="w-full border-l border-r border-b border-t-0 border-gray-100 rounded-b-md p-3 pr-10 resize-none" />

              <label class="absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-primary"
                @click="emit('fileInputClicked')">
                📎
                <input type="file" multiple class="hidden" @change="handleFiles($event)" />
              </label>

              <div v-if="attachments?.length" class="mt-2 space-y-1">
                <div v-for="(file, index) in attachments" :key="index"
                  class="flex items-center justify-between text-xs">
                  <span>{{ file.name }}</span>
                  <button type="button" @click="removeFile(index)" class="text-red-500">
                    ✕
                  </button>
                </div>
              </div>
            </div>
            <!-- ·· text / email / tel — uses project InputField ····· -->
            <div v-else :key="`${field.key}_input`">
              <FloatingInputField compact :id="`la-${field.key}`" v-if="isHeaderForm" :type="field.type"
                :label="field.label" :name="field.key" v-model="values[field.key]" :placeholder="field.placeholder"
                :rules="fieldRules(field)" :error="submitted && fieldErrors[field.key]"
                :aria-invalid="submitted && fieldErrors[field.key] ? 'true' : 'false'"
                :aria-describedby="`err-${field.key}`" :disabled="loading" :inputClass="field.inputClass"
                :required="field.required" />
              <InputField v-else :id="`la-${field.key}`" :type="field.type" :label="field.label" :name="field.key"
                v-model="values[field.key]" :placeholder="field.placeholder" :autocomplete="field.autocomplete || 'off'" :rules="fieldRules(field)"
                :error="submitted && fieldErrors[field.key]"
                :aria-invalid="submitted && fieldErrors[field.key] ? 'true' : 'false'"
                :aria-describedby="`err-${field.key}`" :disabled="loading" :inputClass="field.inputClass" />
            </div>
          </template>
          <!-- ── /Fields loop ─────────────────────────────────────── -->

          <!-- ── reCAPTCHA ─────────────────────────────────────────── -->
          <div
            v-if="config.showRecaptcha"
            ref="recaptchaWrapper"
            class="mt-4"
            aria-label="Security verification"
          >
            <recaptcha ref="recaptchaRef" />
          </div>

          <p v-if="attachmentError" class="mt-2 text-sm text-red-600" role="alert">
            {{ attachmentError }}
          </p>

          <!-- ── Submit button ─────────────────────────────────────── -->
          <Button type="submit" :class="isHeaderForm ? '!text-sm !py-0.5 w-full' : '!text-lg !py-2.5 w-full'"
            :aria-busy="loading.toString()" :disabled="loading">
            {{ loading ? "Please wait..." : config.submitLabel }}
          </Button>
        </div>
      </form>
      <transition name="fade">
        <div v-if="messageJSON?.message" class="flex items-center py-4" role="status" aria-live="polite">
          <div class="text-green-600 text-2xl mr-3 flex-shrink-0" v-if="messageJSON?.type === 'success'">
            ✓
          </div>
          <div class="text-red-600 text-2xl mr-3 flex-shrink-0" v-else>
            ✕
          </div>

          <p class="text-lg font-medium text-gray-800 text-left">
            {{ messageJSON?.message }}
          </p>
        </div>
      </transition>
    </div>
  </client-only>
</template>

<script setup>
import customErrorMessages from "~/utils/customMessages.js";
import InputField from "~/components/ui/InputField.vue";
import Button from "~/components/common/Button.vue";
import Icon from "~/components/common/Icon.vue";
import { FORM_CONFIGS } from "~/utils/formConfigs";
import FloatingInputField from "../ui/FloatingInputField.vue";
import Textarea from '../ui/Textarea.vue';
import api from "~/api-client/rest-api/index.js";
import { validate as validateValue } from 'vee-validate';
import { localize } from '~/utils/veeCompat.js';

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (v) => Object.keys(FORM_CONFIGS).includes(v),
  },
  product: {
    type: [Object, Array],
    default: () => ({}),
  },
});

const emit = defineEmits(['recaptchaClicked', 'recaptchaClosed', 'recaptchaSubmitted', 'fileInputClicked']);
const store = useMainStore();
const route = useRoute();

// vee-validate 4: first error message per field key, filled by validateAll() on submit
const fieldErrors = reactive({});
function clearError(key) {
  if (key) delete fieldErrors[key];
  else Object.keys(fieldErrors).forEach((k) => delete fieldErrors[k]);
}

const root = ref(null);
// template ref of the <recaptcha> component (named differently so it does not shadow the component tag)
const recaptchaRef = ref(null);
const values = ref({});
const honeypot = ref("");
const submitted = ref(false);
const loading = ref(false);
const messageJSON = ref({ type: 'error', message: '' });
const attachments = ref([]);
const attachmentError = ref(null);
const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp", "pdf", "doc", "docx"];
const maxFiles = 5;

let recaptchaOpen = false;
let recaptchaObserver = null;

const config = computed(() => FORM_CONFIGS[props.type]);
const formattedSubtitle = computed(() => config.value?.subtitle?.replace(/\/n/g, "<br>") || "");
const isHeaderForm = computed(() => props.type === "contact-us-header");

watch(
  () => props.type,
  () => {
    initValues();
    clearError();
  },
  { immediate: true }
);

onMounted(() => {
  localize("en", customErrorMessages);
  if (props.product?.sku) prefillProductSku();
  // Start watching for the reCAPTCHA v2 challenge iframe
  setupRecaptchaWatcher();
});

onBeforeUnmount(() => {
  teardownRecaptchaWatcher();
});

defineExpose({ reset });

function setupRecaptchaWatcher() {
  if (typeof MutationObserver === 'undefined') return; // SSR guard

  recaptchaOpen = false;

  const isChallengeVisible = () => {
    // The challenge bframe is injected at document.body level.
    // It is visible when it exists AND is not hidden via display:none / visibility:hidden.
    const frame = document.querySelector(
      'iframe[src*="recaptcha/api2/bframe"], iframe[title*="recaptcha challenge"]'
    );
    if (!frame) return false;
    const style = window.getComputedStyle(frame.parentElement || frame);
    // Google wraps the bframe in a div; when hidden the wrapper gets visibility:hidden
    const wrapper = frame.closest('div[style*="visibility"]') || frame.parentElement;
    if (wrapper) {
      const ws = window.getComputedStyle(wrapper);
      if (ws.visibility === 'hidden' || ws.display === 'none') return false;
    }
    return true;
  };

  recaptchaObserver = new MutationObserver(() => {
    const isOpen = isChallengeVisible();

    if (isOpen && !recaptchaOpen) {
      // Challenge just appeared
      recaptchaOpen = true;
      emit('recaptchaClicked');
    } else if (!isOpen && recaptchaOpen) {
      // Challenge just closed (solved, dismissed, or expired)
      recaptchaOpen = false;
      emit('recaptchaClosed');
    }
  });

  // Watch body for iframe injection (childList) and style changes (attributes)
  recaptchaObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class'],
  });
}

function teardownRecaptchaWatcher() {
  if (recaptchaObserver) {
    recaptchaObserver.disconnect();
    recaptchaObserver = null;
  }
  recaptchaOpen = false;
}

// ─── Safe reset — never throws ─────────────────────────────────
function resetCaptcha() {
  try {
    const { $recaptcha } = useNuxtApp();
    if (recaptchaRef.value && typeof recaptchaRef.value.reset === 'function') {
      recaptchaRef.value.reset();
    } else if ($recaptcha && typeof $recaptcha.reset === 'function') {
      $recaptcha.reset();
    }
  } catch (error) {
    console.warn('[reCAPTCHA] Reset skipped:', error?.message);
  }
}

// ─── Safe getResponse — never throws ───────────────────────────
async function getCaptchaToken() {
  try {
    const { $recaptcha } = useNuxtApp();
    if (typeof $recaptcha?.getResponse === 'function') {
      return await $recaptcha.getResponse();
    }
    if (typeof recaptchaRef.value?.getResponse === 'function') {
      return await recaptchaRef.value.getResponse();
    }
    return null;
  } catch (error) {
    console.warn('[reCAPTCHA] getResponse failed:', error?.message);
    return null;
  }
}

// ─── File handling ──────────────────────────────────────────────
function handleFiles(event) {
  processFiles(Array.from(event.target.files));
}

function handleDrop(event) {
  processFiles(Array.from(event.dataTransfer.files));
}

function processFiles(files) {
  attachmentError.value = null;
  const existingCount = attachments.value?.length;

  if (existingCount + files.length > maxFiles) {
    attachmentError.value = `You can upload a maximum of ${maxFiles} files.`;
    return;
  }

  const maxSize = 10 * 1024 * 1024; // 10 MB

  for (const file of files) {
    const extension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(extension)) {
      attachmentError.value = "Upload failed with error: File of this type (extension) is not allowed!";
      return;
    }

    if (file.size > maxSize) {
      attachmentError.value = "Upload failed with error: File size exceeds the 10 MB limit.";
      return;
    }
  }
  attachments.value.push(...files);
}

function removeFile(index) {
  attachments.value.splice(index, 1);
}

// ─── Initialisation ────────────────────────────────────────────
function initValues(avoidMessage = false) {
  const vals = {};
  for (const f of FORM_CONFIGS[props.type]?.fields || []) {
    if (f.type === "number-range") {
      vals[f.minKey] = "";
      vals[f.maxKey] = "";
    } else if (f.type !== "file") {
      vals[f.key] = "";
    }
  }
  values.value = vals;
  submitted.value = false;
  loading.value = false;
  if (!avoidMessage) messageJSON.value = { type: 'error', message: '' };
  attachments.value = [];
  if (props.product?.sku) prefillProductSku();
}

function prefillProductSku() {
  const val = props.product?.sku;
  if (!val) return;

  config.value.fields
    .filter(f => f.prefillFrom === 'productSku')
    .forEach(field => {
      if (!values.value[field.key]) {
        values.value[field.key] = val;
      }
    });
}

// ─── Vee-validate rule string ───────────────────────────────────
function fieldRules(field) {
  const rules = [];
  if (field.required) rules.push("required");
  if (field.type === "email") rules.push("email");
  if (field.type === "tel") rules.push("min:7");
  return rules.join("|");
}

// rules per field, equal to the old v-validate strings
function rulesFor(field) {
  if (["textarea-with-attachments", "select", "textarea"].includes(field.type)) return field.required ? "required" : "";
  if (["number-range", "checkbox", "additional_message", "msg_with_simple_file"].includes(field.type)) return "";
  return fieldRules(field);
}

async function validateAll() {
  clearError();
  let allValid = true;
  for (const field of config.value.fields) {
    const rules = rulesFor(field);
    if (!rules) continue;
    const { valid, errors: fieldErrs } = await validateValue(values.value[field.key], rules, { name: field.key, label: field.label });
    if (!valid) {
      allValid = false;
      fieldErrors[field.key] = fieldErrs[0];
    }
  }
  return allValid;
}

// ─── Submit ─────────────────────────────────────────────────────
async function onSubmit() {
  try {
    submitted.value = true;

    const isValid = await validateAll();
    if (!isValid) {
      nextTick(() => {
        const el = root.value?.querySelector(
          '[aria-invalid="true"], .error:not(:empty)'
        );
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      return;
    }

    loading.value = true;
    store.setGTMData(null);
    await submitTicket();

  } catch (err) {
    console.error("[LiveAgentForm] onSubmit error:", err);
    messageJSON.value = { type: 'error', message: "Something went wrong. Please try again." };
    resetCaptcha();
  } finally {
    loading.value = false;
    // Signal parent that the form flow is complete so recaptchaActive resets
    emit('recaptchaSubmitted');
  }
}

function reset() {
  initValues(true);
  resetCaptcha();
  clearError();
  if (props.product?.sku) prefillProductSku();
}

function sanitizeUrlSafe(str) {
  return String(str || "")
    .trim()
    .replace(/[^a-zA-Z0-9_\-.~]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

async function submitTicket() {
  try {
    submitted.value = false;

    const formData = new FormData();

    for (const [key, value] of Object.entries(values.value)) {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }

    if (formData.get('remember_me') === 'true') {
      formData.set('remember_me', true);
    }

    formData.append('url', window.location.href || route.fullPath);
    formData.append('website', honeypot.value || '');

    attachments.value.forEach((file, index) => {
      formData.append(`files[${index}]`, file, file.name);
    });

    if (config.value.showRecaptcha) {
      const token = await getCaptchaToken();
      formData.append('captcha', token || '');
    }

    const response = await api.postRequest(
      `contact/${config.value.submitUrl}`,
      formData
    );

    resetCaptcha();

    if (response?.data?.success) {
      const gtmPayload = {};
      for (const f of config.value.fields) {
        if (f.excludeFromGtm || f.type === 'file' || f.type === 'number-range') continue;
        const v = values.value[f.key];
        if (v) gtmPayload[f.key] = v;
      }
      store.setGTMData({
        ...gtmPayload,
        url: typeof window !== 'undefined' ? window.location.href : '',
        isLiveAgentForm: true,
      });
      await store.runGtmEvent({ action_type: config.value.gtmEvent });
      reset();
      messageJSON.value = { type: 'success', message: response.data?.message };
    } else {
      messageJSON.value = { type: 'error', message: "Something went wrong. Please try again." };
    }

  } catch (error) {
    console.error('[LiveAgentForm] submitTicket error:', error);
    messageJSON.value = { type: 'error', message: "Something went wrong. Please try again." };
  }
}
</script>
