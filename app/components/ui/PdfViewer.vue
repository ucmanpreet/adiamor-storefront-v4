<!-- File: PdfViewerModal.vue -->
<template>
  <Modal
    v-if="!isMobile"
    maxWidthClass="max-w-5xl xl:!h-[calc(100dvh_-_3.5rem)]"
    :heading="getCertficateHeading(pdfSrc)"
    @close="emit('close')"
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

<script setup>
import Modal from "~/components/ui/Modal.vue";
import KEYS from "~/utils/constant.js";

const props = defineProps(["pdfSrc"]);

const emit = defineEmits(["close"]);

const nuxtApp = useNuxtApp();

const isMobile = computed(() => nuxtApp.$isMobile);

const isPDF = computed(() => {
  if (!props.pdfSrc) return false;

  return /\.pdf(?:$|[?#])/i.test(props.pdfSrc);
});

const pdfViewerUrl = computed(() => {
  if (!props.pdfSrc) return "";

  return `${props.pdfSrc}#zoom=page-fit&navpanes=0`;
});

onMounted(() => {
  if (!import.meta.client) return;

  if (isMobile.value) {
    // Open the PDF in a new tab/window on mobile
    window.open(props.pdfSrc, "_blank", "noopener,noreferrer");
    emit("close");
  }
});

function getCertficateHeading(element) {
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
</script>