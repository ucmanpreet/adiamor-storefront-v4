<template>
  <div class="relative min-h-[300px]" aria-live="polite" :aria-busy="loading.toString()">

    <!-- Loader overlay -->
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
      role="status"
    >
      <CustomLoader />
    </div>

    <!-- Form container -->
    <div
      ref="formContainer"
      class="w-full"
      :aria-label="ariaLabel || 'Contact support form'"
    ></div>

    <!-- Error -->
    <span v-if="errorMsg">{{ errorMsg }}</span>

  </div>
</template>

<script setup>
import CustomLoader from '~/components/ui/CustomLoader.vue';

const props = defineProps({
  id: { type: String, required: true },
  ariaLabel: String
});

const loading = ref(true);
const errorMsg = ref('');
const formContainer = ref(null);

onMounted(() => {
  if (!import.meta.client) return;

  init();
});

async function init() {
  try {
    await waitForLiveAgent();

    const el = formContainer.value;

    if (!el) return;

    // Call form
    window.LiveAgent.createForm(props.id, el);

    // 👇 Controlled loader duration (smooth UX)
    setTimeout(() => {
      loading.value = false;
    }, 1200);

  } catch (err) {
    console.error('[LiveAgent]', err);
    errorMsg.value = 'Failed to load form.';
    loading.value = false;
  }
}

function waitForLiveAgent() {
  return new Promise((resolve, reject) => {
    const interval = 150;
    let elapsed = 0;
    const timeout = 6000;

    const poll = setInterval(() => {
      if (
        window.LiveAgent &&
        typeof window.LiveAgent.createForm === 'function'
      ) {
        clearInterval(poll);
        resolve();
      }

      elapsed += interval;

      if (elapsed >= timeout) {
        clearInterval(poll);
        reject(new Error('LiveAgent load timeout'));
      }
    }, interval);
  });
}
</script>