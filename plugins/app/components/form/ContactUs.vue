<template>
    <div class="" v-on:click="handleFocusIn" @click="handleFocusIn">
       <CustomLiveAgentForm type="contact-us-header"/>
    </div>
</template>
<script>
import CustomLiveAgentForm from './CustomLiveAgentForm.vue';
export default {
    name : 'ContactUs',
    components: { CustomLiveAgentForm },
    props: ['activeDropdown'],
    methods: {
        handleFocusIn(event) {
            if (event.target === event.currentTarget) {
                event.stopPropagation();
            }
        },
    },
};
</script>