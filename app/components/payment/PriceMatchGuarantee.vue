<template>
    <div>
        <Modal @close="closeModal" >
            <!-- <div id="priceMatchForm"></div> -->
            <CustomLiveAgentForm type="price-match" :product="product"/>
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