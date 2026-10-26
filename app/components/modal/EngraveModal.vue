<template>
    <div>
        <Modal :heading="heading" @close="closeModal">
            <!-- <div>
                <p class="py-5 text-center text-dim-black text-sm leading-6" id="engrave-description">
                    You can choose between our standard block font or a script font
                    as shown here and enter your text below. For engravings of more
                    than fourteen characters, discuss with customer service after
                    completing your order.
                </p>
            </div> -->

            <!-- Live Preview -->
            <div class="relative w-full h-44 rounded-xl overflow-hidden mb-6 border border-gray-100 bg-gray-50"
                :style="{
                    'background-image': 'url(' + $asset('~/assets/images/inscription.webp') + ')',
                    'background-size': 'contain',
                    'background-repeat': 'no-repeat',
                    'background-position': 'center'
                }"
                aria-hidden="true">
                <div class="absolute inset-0 flex items-center justify-center -translate-y-1">
                    <ul v-if="words.length"
                        class="flex items-center justify-center tracking-[0.2em] text-shadow-custom"
                        :class="fontFamily === 'tangerine' ? 'font-bold text-2xl -mt-1.5' : 'text-base'">
                        <li v-for="(item, index) in words" :key="index"
                            :style="{ transform: `rotate(${angle[index]}deg)`, 'font-family': fontFamily }">
                            {{ item }}
                        </li>
                    </ul>
                    <span v-else class="text-gray-500 italic" :style="{ 'font-family': fontFamily }">
                        Your engraving appears here
                    </span>
                </div>
            </div>

            <form @submit.prevent="addEngravingText" novalidate aria-describedby="engrave-errors" ref="formBox">
                <!-- Text Input -->
                <div class="mb-5">
                    <div class="flex justify-between items-center mb-1.5">
                        <label for="engraveText" class="text-sm font-medium text-gray-700">
                            Engraving Text
                            <span class="text-red-500 ml-0.5" aria-hidden="true">*</span>
                        </label>
                        <span class="text-xs tabular-nums"
                            :class="inputText.length >= 14 ? 'text-red-500 font-medium' : 'text-gray-400'"
                            aria-hidden="true">
                            {{ inputText.length }}/14
                        </span>
                        <span class="sr-only" aria-live="polite" aria-atomic="true">
                            {{ inputText.length >= 12 ? `${14 - inputText.length} characters remaining` : '' }}
                        </span>
                    </div>
                    <InputField
                        :id="'text'"
                        v-model="inputText"
                        @input="extractWords"
                        :maxlength="14"
                        name="text"
                        placeholder="e.g. Forever Yours"
                        :error="submitted && textError"
                                        autocomplete="off"
                        :rules="`required`"
                        :aria-required="true"
                        :aria-invalid="submitted && textError ? 'true' : 'false'"
                        aria-describedby="engrave-limit engrave-errors"
                    />
                    <p v-if="submitted && textError" id="engrave-errors"
                        class="text-xs text-red-500 mt-1.5 flex items-center gap-1" role="alert">
                        <svg class="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                        </svg>
                        {{ textError }}
                    </p>
                    <p id="engrave-limit" class="sr-only">
                        Maximum 14 characters allowed
                    </p>
                </div>

                <!-- FONT SELECTOR -->
                <fieldset
                    class="mb-6"
                    aria-label="Font selection"
                >
                    <legend class="text-sm font-medium text-gray-700 mb-2">Font Style</legend>

                    <div class="grid grid-cols-2 gap-3">
                        <!-- BLOCK -->
                        <label class="relative cursor-pointer rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                            <input
                                type="radio"
                                name="fontType"
                                value="block"
                                v-model="type"
                                @change="fontFamily = 'Jost'"
                                class="absolute inset-0 opacity-0 z-10 cursor-pointer"
                            />
                            <span class="relative h-full flex flex-col items-center justify-center py-3.5 px-4 border-2 rounded-xl transition-all select-none"
                                :class="type === 'block'
                                    ? 'border-black bg-black/5'
                                    : 'border-gray-200 hover:border-gray-300 bg-white'">
                                <span class="text-base font-bold tracking-widest leading-snug mb-0.5" style="font-family: Jost">BLOCK</span>
                                <span class="text-xs text-gray-500">Classic Bold</span>
                                <span v-if="type === 'block'"
                                    class="absolute right-0 top-0 -m-2 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </span>
                            </span>
                        </label>

                        <!-- SCRIPT -->
                        <label class="relative cursor-pointer rounded-xl focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2">
                            <input
                                type="radio"
                                name="fontType"
                                value="script"
                                v-model="type"
                                @change="fontFamily = 'tangerine'"
                                class="absolute inset-0 opacity-0 z-10 cursor-pointer w-full h-full"
                            />
                            <span class="relative flex flex-col items-center justify-center py-3.5 px-4 border-2 rounded-xl transition-all select-none"
                                :class="type === 'script'
                                    ? 'border-black bg-black/5'
                                    : 'border-gray-200 hover:border-gray-300 bg-white'">
                                <span class="text-2xl leading-snug mb-0.5" style="font-family: tangerine">Script</span>
                                <span class="text-xs text-gray-500">Elegant Cursive</span>
                                <span v-if="type === 'script'"
                                    class="absolute right-0 top-0 -m-2 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                                    <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                                    </svg>
                                </span>
                            </span>
                        </label>
                    </div>
                </fieldset>
                <Button type="submit" class="w-full">
                    Submit
                </Button>
            </form>
        </Modal>
    </div>
</template>
<script setup>
import Modal from "~/components/ui/Modal.vue";
import InputField from "~/components/ui/InputField.vue";
import Button from "~/components/common/Button.vue";
import { useForm, useField } from 'vee-validate';

const props = defineProps({
    modalClass: String,
    heading: {
        type: String,
        default() {
            return 'Engrave Your Ring';
        },
    },
})
const emit = defineEmits(['close', 'engraveTextTag'])
const { $bus } = useNuxtApp()

// vee-validate 4: rules are registered globally; validation is explicit
const { validate } = useForm()
const { value: inputText, errorMessage: textError, validate: validateText } = useField('text', 'required', {
    label: 'text',
    initialValue: '',
})

const words = ref([]) // Store individual words here
const angle = ref([])
const fontFamily = ref('tangerine')
const type = ref('script')
const submitted = ref(false)

watch(inputText, () => { if (submitted.value) validateText(); })

onMounted(() => {
    nextTick(() => {
        $bus.emit('aria-announce', `${props.heading} dialog opened. Fill in engraving text and choose font style, then press Submit.`);
    });
})

function extractWords() {
    if (inputText.value.length > 14) {
        return;
    }

    // Replace regular spaces with non-breaking spaces so they're visible in rendering
    words.value = inputText.value.split("").map(char => char === " " ? "\u00A0" : char);

    let curvature = 10;
    let angleObj = [];

    for (let i = 0; i < words.value.length; i++) {
        const curve = (i - (words.value.length - 1) / 2) * (curvature / 8);
        angleObj.push(curve);
    }

    angle.value = angleObj;
}
function closeModal() {
    emit("close");
}
async function addEngravingText() {
    submitted.value = true;
    const isValid = (await validate()).valid;
    if (!isValid) {
        nextTick(() => {
            // the InputField is rendered with id="text"
            document.getElementById('text')?.focus();
        });
        return;
    }
    submitted.value = false;

    emit("engraveTextTag", { text: inputText.value, type: type.value });
    closeModal();
}
</script>