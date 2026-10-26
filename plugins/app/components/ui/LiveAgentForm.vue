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

<script>
import CustomLoader from '~/components/ui/CustomLoader.vue';

export default {
  name: 'LiveAgentForm',
  components: { CustomLoader },

  props: {
    id: { type: String, required: true },
    ariaLabel: String
  },

  data() {
    return {
      loading: true,
      errorMsg: ''
    };
  },

  mounted() {
    if (!import.meta.client) return;

    this.init();
  },

  methods: {
    async init() {
      try {
        await this.waitForLiveAgent();

        const el = this.$refs.formContainer;

        if (!el) return;

        // Call form
        window.LiveAgent.createForm(this.id, el);

        // 👇 Controlled loader duration (smooth UX)
        setTimeout(() => {
          this.loading = false;
        }, 1200);

      } catch (err) {
        console.error('[LiveAgent]', err);
        this.errorMsg = 'Failed to load form.';
        this.loading = false;
      }
    },

    waitForLiveAgent() {
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
  }
};
</script>