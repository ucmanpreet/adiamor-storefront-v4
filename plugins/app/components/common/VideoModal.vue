<template>
    <div v-if="showModal">
      <Modal @close="closeModal"
        :maxWidthClass="maxWidthClass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
      >
        <!-- Hidden Title For Screen Readers -->
        <h2 id="video-modal-title" class="sr-only">
          Video player
        </h2>

        <!-- Loader -->
        <div v-if="loading" class="absolute z-0 inset-0 flex items-center justify-center"
          role="status"
          aria-live="polite"
        >
          <CustomLoader class="w-6 h-6 my-3"/>
          <span class="sr-only">Loading video</span>
        </div>

        <!-- Video Frame -->
        <iframe
          ref="videoFrame"
          :src="videoUrl"
          title="Embedded video player"
          width="100%"
          height="820"
          frameborder="0"
          allowfullscreen
          @load="handleVideoLoaded"
          class="p-9 xl:min-h-[624px] xl:max-h-[85vh] focus:outline-none"
          ></iframe>
      </Modal>
    </div>
</template>
<script>
import Modal from '~/components/ui/Modal.vue';
import CustomLoader from '~/components/ui/CustomLoader.vue';
export default {
  name : 'VideoModal',
  components: { Modal, CustomLoader },
  props: {
    videoUrl: {
      type: String,
      required: true
    },
    maxWidthClass: {
      type: String,
      default: ""
    }
  },
  mounted() {
    // Save focus before modal opens
    this.previouslyFocusedElement = document.activeElement;

    if (window.innerWidth <= 768) {
      // Mobile behaviour
      window.open(this.videoUrl, '_blank')
    } else {
      this.showModal = true

      this.$nextTick(() => {
        this.$refs.videoFrame?.focus();
      });
    }
  },
  data() {
    return {
      showModal: false,
      loading: true,
      previouslyFocusedElement: null
    };
  },
  methods: {
    handleVideoLoaded() {
      this.loading = false;
    },
    closeModal() {
      this.showModal = false;
      // Restore focus
      this.$nextTick(() => {
        this.previouslyFocusedElement?.focus();
      });
      this.$emit("close");
    }
  }
}
</script>