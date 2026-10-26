<template>
    <div>
        <Modal :heading="'Provide Your Diamond Details'" @close="closeModal" role="dialog" aria-modal="true">
            <form class="space-y-5" action="" novalidate @submit.prevent="prongSubmit">
                <p id="prong-description" class="py-5 text-center text-dim-black text-sm leading-6">
                    Please provide the details of the diamond you plan to set in this setting. This helps us properly build the setting to fit your stone.
                </p>
                <div>
                    <InputField type="number" :id="'carat_weight'" name="carat" v-model="carat" :max="100" :min="0.01" :step="0.01" 
                        inputClass="col-span-full" placeholder="ct" :error="!carat && submitted"
                        label="Carat Weight" :rules="`required`" !carat && submitted @blur="carat = round(carat)" aria-required="true"/>
                    <p v-if="!carat && submitted" class="mt-1 text-xs text-red-500" role="alert">
                        Carat weight is required.
                    </p>
                </div>

                <!-- Measurements -->
                <div class="border border-gray-100 rounded p-4 bg-gray-50">
                    <h2 class="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                        Measurements
                        <span class="normal-case font-normal text-gray-400 ml-1">(optional)</span>
                    </h2>
                    <div class="grid grid-cols-3 gap-3" role="group" aria-labelledby="measurements-heading">
                        <InputField type="number" :id="'length'" v-model="length" name="length" :min="0.01" :step="0.01" :max="100" placeholder="mm" label="Length" @blur="length = round(length)"/>
                        <InputField type="number" :id="'width'" v-model="width" name="width" :min="0.01" :step="0.01" :max="100" placeholder="mm" label="Width" @blur="width = round(width)"/>
                        <InputField type="number" :id="'height'" name="height" v-model="height" :min="0.01" :step="0.01" :max="100" placeholder="mm" label="Height" @blur="height = round(height)"/>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-3 pt-1">
                    <Button type="button" colorType="bordered-secondary" class="flex-1" @click="closeModal">
                        Cancel
                    </Button>
                    <Button type="button" colorType="primary" class="flex-1" @click="prongSubmit()" aria-label="Submit prong details">
                        Save Diamond Details
                    </Button>
                </div>
            </form>
        </Modal>
    </div>
</template>
<script setup>
import Modal from "~/components/ui/Modal.vue";
import InputField from "~/components/ui/InputField.vue";
import Button from "~/components/common/Button.vue";

defineProps(['modalClass', 'heading'])
const emit = defineEmits(['close', 'assignProngData'])

const carat = ref('')
const length = ref('')
const width = ref('')
const height = ref('')
const submitted = ref(false)

function closeModal() {
    emit("close");
}
function prongSubmit() {
    if (!carat.value) {
        submitted.value = true;
        return;
    }
    emit("assignProngData", { carat: carat.value, length: length.value, width: width.value, height: height.value });
}
function round(value, decimals = 2) {
    if (value === '' || value === null) return '';
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
</script>