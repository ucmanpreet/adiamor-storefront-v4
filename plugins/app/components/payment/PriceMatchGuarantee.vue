<template>
    <div>
        <Modal @close="closeModal" >
            <!-- <div id="priceMatchForm"></div> -->
            <CustomLiveAgentForm type="price-match" :product="product"/>
        </Modal>
    </div>
</template>

<script>
// import KEYS from '~/utils/constant.js';
import Modal from '~/components/ui/Modal.vue';
import CustomLiveAgentForm from '../form/CustomLiveAgentForm.vue';
export default {
    name : 'PriceMatchGuarantee',
    props: ['product'],
    components: { Modal, CustomLiveAgentForm },
    // data() {
    //     return {
    //         loading: true,
    //         iframe: null
    //     }
    // },
    // async mounted() {
    //     let priceMatchForm = document.getElementById('priceMatchForm');
    //     if (priceMatchForm && window && window.LiveAgent) {
    //         let formCreated = await window.LiveAgent.createForm(KEYS.PRICE_MATCH_ID, priceMatchForm);
            
    //         let vm = this;
    //         var wait_for_live_agent_timer = setInterval(function () {
    //             if (typeof (window.LiveAgent) != "undefined" && window.LiveAgent) {
    //                 window.LiveAgent.addTicketField('product_reference', vm.product?.sku);
    //                 clearInterval(wait_for_live_agent_timer);
    //             }
    //         }, 50);

    //         this.iframe = formCreated.iframeElement;
    //         setTimeout(async () => {
    //             this.iframe ? this.loading = false : '';
    //         }, 700);
    //     }
    // },
    methods: {
        closeModal() {
            this.$emit("close");
        },
    },
};
</script>