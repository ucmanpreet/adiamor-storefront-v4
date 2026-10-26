<!-- File: PdfViewerModal.vue -->
<template>
  <Modal
    v-if="!isMobile"
    maxWidthClass="max-w-5xl xl:!h-[calc(100dvh_-_3.5rem)]"
    :heading="getCertficateHeading(pdfSrc)"
    @close="$emit('close')"
    role="dialog"
    aria-modal="true"
  >
    <div class="w-full h-full overflow-hidden">
      <iframe
        v-if="isPDF"
        :src="pdfViewerUrl"
        frameborder="0"
        width="100%"
        height="100%"
        allowfullscreen
        allow="fullscreen"
        class="block w-full h-[650px] xl:h-[900px] xl:max-h-[85vh] overflow-hidden"
        title="PDF document viewer"
        aria-label="PDF document viewer"
      ></iframe>
      <img
        v-else
        :src="pdfSrc"
        alt="Certificate"
        class="w-full h-full object-contain"
      />
    </div>
  </Modal>
</template>

<script>
import Modal from "~/components/ui/Modal.vue";
import KEYS from "~/utils/constant.js";

export default {
  name: "PdfViewer",

  components: {
    Modal
  },

  props: ["pdfSrc"],

  computed: {
    isMobile() {
      return this.$isMobile;
    },

    isPDF() {
      if (!this.pdfSrc) return false;

      return /\.pdf(?:$|[?#])/i.test(this.pdfSrc);
    },

    pdfViewerUrl() {
      if (!this.pdfSrc) return "";

      return `${this.pdfSrc}#zoom=page-fit&navpanes=0`;
    }
  },

  mounted() {
    if (!import.meta.client) return;

    if (this.isMobile) {
      // Open the PDF in a new tab/window on mobile
      window.open(this.pdfSrc, "_blank", "noopener,noreferrer");
      this.$emit("close");
    }
  },

  methods: {
    getCertficateHeading(element) {
      let matched = KEYS.CERTIFICATE_TYPE.find(el =>
        element?.toLowerCase().includes(el)
      );

      if (!matched) {
        matched = KEYS.NON_PROVIDED_CERTIFICATE_TYPES.find(el =>
          element?.toLowerCase().includes(el)
        );

        if (matched) matched = `gcal ${matched}`;
      }

      return `${matched || "Diamond"} Certificate`;
    }
  }
};
</script>