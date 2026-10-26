<template>
    <div>
        <Modal @close="closeModal" modalClass="min-h-[40.125rem]" maxWidthClass="max-w-[30rem]" :loading="loading" role="dialog" aria-modal="true" aria-labelledby="request-image-title">
            <!-- Accessible Modal Title -->
            <h2 id="request-image-title" class="sr-only">
                Request matching product image
            </h2>
             <div
                v-if="loading"
                class="sr-only"
                role="status"
                aria-live="polite"
            >
                Loading request form
            </div>
            <div id="requestImage" role="region" aria-label="Request matching product image form"></div>
        </Modal>
    </div>
</template>

<script setup>
import KEYS from '~/utils/constant.js';
import Modal from '~/components/ui/Modal.vue';

const props = defineProps(['product']);
const emit = defineEmits(['close']);

const loading = ref(true);
const iframe = ref(null);

onMounted(async () => {
    let requestImage = document.getElementById('requestImage');
    if (requestImage && window && window.LiveAgent) {
        let formCreated = await window.LiveAgent.createForm(KEYS.REQUEST_MATCH_ID, requestImage);
        iframe.value = formCreated.iframeElement;
        var wait_for_live_agent_timer = setInterval(function () {
            if (typeof (window.LiveAgent) != "undefined" && window.LiveAgent) {
                window.LiveAgent.addTicketField('product_reference', props.product?.sku);
                clearInterval(wait_for_live_agent_timer);
            }
        }, 50);

        setTimeout(
            async () => {
                iframe.value ? loading.value = false : '';
            }, 350);

        let counter = 0;

        let intervalId = setInterval(function () {
            let iframeEl = document.getElementById(iframe.value.getAttribute('id'));
            if (iframeEl) {
                iframeEl.style.height = '550px';
            }
            counter++;
        }, 400);
        if (counter >= 5) {
            clearInterval(intervalId);
        }
    }
});

function closeModal() {
    emit("close");
}
</script>