<template>
    <div class="" v-on:click="handleFocusIn" @click="handleFocusIn">
       <CustomLiveAgentForm type="contact-us-header"/>
    </div>
</template>
<script setup>
import CustomLiveAgentForm from './CustomLiveAgentForm.vue';

const props = defineProps(['activeDropdown']);

function handleFocusIn(event) {
    if (event.target === event.currentTarget) {
        event.stopPropagation();
    }
}
</script>