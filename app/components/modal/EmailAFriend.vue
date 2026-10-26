<template>
    <div>
        <Modal :heading="!emailResponse ? 'Email A friend' : ''" @close="closeModal"  role="dialog" aria-modal="true" aria-labelledby="email-friend-title">
            <!-- Accessible modal title -->
            <h2 id="email-friend-title" class="sr-only">
                Email a Friend
            </h2>
            <div class="prose prose-a:text-primary space-y-6 font-medium text-center" v-if="emailResponse" role="status" aria-live="polite" tabindex="-1" ref="successBox">
                <svg class="w-20 h-20 mx-auto text-green-600 mt-4" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                    <path fill-rule="evenodd"
                        d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                        clip-rule="evenodd"></path>
                </svg>
                <div v-html="$sanitize(emailResponse)"></div>
            </div>
            <form v-else @submit.prevent="submitEmailAFriend()" class="space-y-4" novalidate aria-describedby="form-errors" ref="formBox">
                <div id="form-errors" class="sr-only" aria-live="assertive"></div>
                <InputField
                    v-model="friendName"
                    name="friendName"
                    placeholder="Your Friend's Name"
                    :error="submitted ? friendNameError : false"
                    :aria-required="true"
                    :aria-invalid="submitted && friendNameError ? 'true' : 'false'"
                />
                <InputField
                    v-model="friendEmail"
                    type="email"
                    name="friendEmail"
                    placeholder="Your Friend's Email"
                    :error="submitted ? friendEmailError : false"
                    :aria-required="true"
                    :aria-invalid="submitted && friendEmailError ? 'true' : 'false'"
                />
                <Textarea
                    v-model="message"
                    name="message"
                    aria-label="Your Message"
                    placeholder="Your Message"
                    :error="submitted ? messageError : ''"
                    :aria-required="true"
                    :aria-invalid="submitted && messageError ? 'true' : 'false'"
                ></Textarea>
                <InputField
                    v-model="yourName"
                    type="name"
                    name="name"
                    placeholder="Your Name"
                    :error="submitted ? nameError : false"
                    :aria-required="true"
                    :aria-invalid="submitted && nameError ? 'true' : 'false'"
                />
                <InputField
                    v-model="yourEmail"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    :error="submitted ? emailError : false"
                    :aria-required="true"
                    :aria-invalid="submitted && emailError ? 'true' : 'false'"
                />
                <div class="mt-4 flex items-center">
                    <label for="checkbox_2" class="select-none grid grid-flow-col gap-3 items-center text-sm">
                        <div class="grid items-center justify-center">
                            <input type="checkbox" id="checkbox_2" checked=""
                                class="peer row-start-1 col-start-1 appearance-none w-4 h-4 border ring-transparent border-slate-300 rounded checked:bg-primary checked:border-primary forced-colors:appearance-auto"
                                v-model="emailForm.Subscribe" :aria-checked="emailForm.Subscribe.toString()">
                            <svg viewBox="0 0 14 14" fill="none"
                                class="invisible peer-checked:visible row-start-1 col-start-1 stroke-white forced-colors:hidden">
                                <path d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round">
                                </path>
                            </svg>
                        </div>
                        Yes, send me updates on new styles and special offers.
                    </label>
                </div>
                <div class="mt-4" aria-label="Security verification">
                    <recaptcha />
                </div>
                <div class="mt-6">
                    <button type="submit" v-if="btnLoader"
                        class="bg-primary text-white p-3 text-sm font-semibold text-center w-full">Submit</button>
                    <button v-else type="button" disabled aria-busy="true" aria-live="polite" aria-label="Loading"
                        class="bg-primary text-white p-3 font-semibold text-center w-full relative inset-0 bg-black/20 flex items-center justify-center">
                        <svg aria-hidden="true"
                            class="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                    </button>
                </div>
            </form>
        </Modal>
    </div>
</template>
<script setup>
import api from '~/api-client/rest-api/index.js';
import { createSwalAlert } from '~/composables/useAlert.js'
import Modal from '~/components/ui/Modal.vue';
import InputField from '~/components/ui/InputField.vue';
import Textarea from '~/components/ui/Textarea.vue';
import { useForm, useField } from 'vee-validate';

const props = defineProps(['product'])
const emit = defineEmits(['close'])
const route = useRoute()
const { $recaptcha } = useNuxtApp()

const emailForm = ref({
    YourName: "",
    YourEmail: "",
    FriendName: "",
    FriendEmail: "",
    VariantSku: "",
    Message: "",
    Subscribe: true,
    Captcha: "",
    Product: ""
})
const submitted = ref(false)

// vee-validate 4: rules are registered globally; validation is explicit
const { validate } = useForm()
const { value: friendName, errorMessage: friendNameError, validate: validateFriendName } = useField('friendName', 'required', { label: 'friendName', initialValue: '' })
const { value: friendEmail, errorMessage: friendEmailError, validate: validateFriendEmail } = useField('friendEmail', 'required|email', { label: 'friendEmail', initialValue: '' })
const { value: message, errorMessage: messageError, validate: validateMessage } = useField('message', 'required', { label: 'message', initialValue: '' })
const { value: yourName, errorMessage: nameError, validate: validateName } = useField('name', 'required', { label: 'name', initialValue: '' })
const { value: yourEmail, errorMessage: emailError, validate: validateEmail } = useField('email', 'required|email', { label: 'email', initialValue: '' })

// keep the field values and emailForm in sync both ways
function syncField(field, key, revalidate) {
    watch(field, (v) => {
        if (emailForm.value[key] !== v) emailForm.value[key] = v
        if (submitted.value) revalidate()
    })
    watch(() => emailForm.value[key], (v) => { if (field.value !== v) field.value = v })
}
syncField(friendName, 'FriendName', validateFriendName)
syncField(friendEmail, 'FriendEmail', validateFriendEmail)
syncField(message, 'Message', validateMessage)
syncField(yourName, 'YourName', validateName)
syncField(yourEmail, 'YourEmail', validateEmail)
const btnLoader = ref(true)
const emailResponse = ref('')

async function submitEmailAFriend() {
    try {
        submitted.value = true;
        const isValid = (await validate()).valid;
        if (!isValid) {
            return;
        }
        submitted.value = false;
        emailForm.value.Captcha = await $recaptcha.getResponse();
        emailForm.value.Product = props.product ? props.product.sku : '';
        const rawSku = route.query.sku || '';
        emailForm.value.VariantSku = /^[A-Za-z0-9\-_]+$/.test(rawSku) ? rawSku : '';
        btnLoader.value = false;

        let response = await api.postRequest('email-a-friend?token=true', emailForm.value);
        btnLoader.value = true;
        // at the end you need to reset recaptcha
        await $recaptcha.reset();
        if (!response) {
            createSwalAlert('Internal Server Error', "error");
            return;
        }
        if (response) {
            if (response.data?.success) createSwalAlert(response.data?.message, "success");
            if (response.data?.data) emailResponse.value = response.data?.data;
        }
    } catch (error) {
        createSwalAlert(error, "error");
    }
}
function closeModal() {
    emailResponse.value = '';
    emailForm.value = {
        YourName: "",
        YourEmail: "",
        FriendName: "",
        FriendEmail: "",
        Message: "",
        Subscribe: true,
        Captcha: "",
        Product: ""
    };
    emit("close");
}
</script>