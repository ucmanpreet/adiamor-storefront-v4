<template>
    <div>
        <Modal @close="closeModal" role="dialog" aria-modal="true" aria-labelledby="contact-form-title">
            <h2 id="contact-form-title" class="sr-only">
                Contact Support Form
            </h2>
            <CustomLiveAgentForm type="ask-question" :product="product"/>
        </Modal>
    </div>
</template>

<script setup>
import Modal from '~/components/ui/Modal.vue';
import CustomLiveAgentForm from '../form/CustomLiveAgentForm.vue';

defineProps(['product']);
const emit = defineEmits(['close']);

function closeModal() {
    emit("close");
}
</script>