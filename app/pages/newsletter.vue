<template>
    <div>
        <Banner
			:bgImage="`https://cdn.adiamor.com/landing-pages/heros/holidays.jpg?updatedAt=1746137271223`"
            :contentBackgroundColor="`bg-black/70`"
            :contentPosition="`left`"
            :contentTextColor="`text-white`"
			alt="Adiamor Newsletter Subscription Banner"
			>
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercase lg:text-[3.375rem] font-normal mb-4">Newsletter</h1>
            <p class="mb-8 text-sm sm:text-lg lg:text-xl">Get exclusive access to new arrivals, promotions, and
                style tips when you sign up for our newsletter.</p>
        </Banner>

        <section aria-labelledby="benefits-heading" class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12">
            <div class="sm:overflow-hidden bg-white">
                <div class="flex flex-col justify-center sm:items-center sm:flex-row gap-4 sm:gap-0">
                    <div class="max-w-full sm:max-w-sm lg:max-w-md xl:max-w-2xl">
                        <h2 id="benefits-heading" class="text-lg md:text-xl lg:text-3xl font-normal">
                            Adiamor Newsletter Subscription</h2>
                        <p class="mt-3 text-sm lg:text-lg">For specific plan details, please refer to your Terms and
                            Conditions.
                        </p>
                        <dl class="mt-6 max-w-xl space-y-2 text-sm sm:text-base/7 lg:max-w-none" role="list">
                            <div class="relative pl-9" v-for="list in benefits" :key="list.id" role="listitem">
                                <dt class="inline">
                                    <Icon name="diamond"
                                        class="w-4 lg:w-5 h-4 lg:h-5 text-primary absolute left-1 top-1" />
                                </dt>
                                <dd class="inline">{{ list }}</dd>
                            </div>
                        </dl>
                    </div>
                    <div class="flex relative flex-1 sm:pl-4 md:pl-12 lg:pl-24 xl:pl-40">
                        <nuxt-img provider="cdn" src="/landing-pages/heros/marbtest.jpg?updatedAt=1746137277627"
                            alt="Adiamor newsletter benefits illustration showing jewelry promotions" class="w-full h-full object-cover"/>
                    </div>
                </div>
            </div>
        </section>

        <section aria-labelledby="education-heading" class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 lg:space-y-12">
            <header class="max-w-full sm:max-w-sm lg:max-w-md xl:max-w-3xl mx-auto text-center">
                <h2 id="education-heading" class="text-lg md:text-xl lg:text-3xl xl:text-4xl font-normal">Diamond and Jewelry Buying Guides
                </h2>
                <p class="mt-3 text-sm lg:text-lg">Need help finding the perfect ring? Educate yourself about the 4 C's
                    and our collection of fine jewelry.
                    If you would like further information regarding our jewelry, please sign up below.</p>
            </header>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-0">
                <div class="relative">
                    <nuxt-img provider="cdn" src="/landing-pages/update/header-education?updatedAt=1746457966511" alt="Diamond education resources and jewelry buying guides"
                        class="w-full h-full object-cover" />
                </div>
                <div class="space-y-4 max-w-2xl sm:px-4 lg:px-8 2xl:px-16">
                    <article aria-labelledby="subscribe-heading">
                        <h3 id="subscribe-heading" class="text-lg md:text-xl font-normal">Reminders</h3>
                        <p class="mt-3 text-sm">To receive reminders on exclusive offers for special occasions please
                            provide the following (optional):</p>
                        <form action="" @submit.prevent="submit(1)" aria-describedby="subscribe-error">
                            <div class="mt-3 space-y-2">
                                <label for="birthday" class="block text-sm lg:text-base">Birthday:</label>
                                <div class="grid grid-cols-2 gap-4" aria-labelledby="birthday-group">
                                    <select id="birthday_month" name="birthday_month" v-model="selectedMonth"
                                        class="w-full p-2 border border-gray-200 rounded-none" aria-describedby="birthday-error" required
                                        @change="$bus.emit('aria-announce', 'Birthday month selected')">
                                        <option value="">Month</option>
                                        <option v-for="(month, index) in months" :key="index" :value="index + 1"> {{
                                            month }}</option>
                                    </select>
                                    <select id="birthday_day" name="birthday_day" aria-describedby="birthday-error"
                                        :disabled="!selectedMonth"
                                        class="w-full p-2 border border-gray-200 rounded-none" required>
                                        <option value="">Day</option>
                                        <option v-for="day in days" :key="day" :value="day">
                                            {{ day }}
                                        </option>
                                    </select>
                                </div>
                                <span id="birthday-error" class="sr-only" aria-live="polite"></span>
                            </div>
                            <div class="mt-3 space-y-2" aria-labelledby="anniversary-group">
                                <label for="birthday" class="block text-sm lg:text-base">Anniversary:</label>
                                <div class="grid grid-cols-2 gap-4">
                                    <select id="anniversary_month" name="anniversary_month" aria-describedby="anniversary-error"
                                        v-model="selectedSecondMonth" class="w-full p-2 border border-gray-200 rounded-none"
                                        @change="$bus.emit('aria-announce', 'Anniversary month selected')"
                                        required>
                                        <option value="">Month</option>
                                        <option v-for="(month, index) in months" :key="index" :value="index + 1"> {{
                                            month }}</option>
                                    </select>
                                    <select id="anniversary_day" name="anniversary_day" aria-describedby="anniversary-error"
                                        :disabled="!selectedSecondMonth"
                                        class="w-full p-2 border border-gray-200 rounded-none" required>
                                        <option value="">Day</option>
                                        <option v-for="day in daysSecond" :key="day" :value="day">
                                            {{ day }}
                                        </option>
                                    </select>
                                </div>
                                <span id="anniversary-error" class="sr-only" aria-live="polite"></span>
                            </div>
                            <div class="mt-3 space-y-2">
                                <label for="subscribe_input" class="block text-sm lg:text-base">Email address</label>
                                <input id="subscribe_input" name="email" type="email" autocomplete="email" required
                                    class="peer border p-2 text-sm w-full border-gray-200 rounded-none"
                                    placeholder="Enter your email" v-model="emailSubs" aria-describedby="subscribe-error"
                                    @input="$bus.emit('aria-announce', 'Email address entered')">
                                <span id="subscribe-error" class="sr-only" aria-live="polite"></span>
                            </div>
                            <div class="mt-3 space-y-2">
                                <Button type="submit" id="subscribe_button" class="p-3 bg-black text-white w-full sm:w-auto"
                                    @click="$bus.emit('aria-announce', 'Updating newsletter preferences')"
                                >
                                    Update Preferences
                                </Button>
                            </div>
                        </form>

                        <p v-if="showSubscribed"
                            role="alert"
                            aria-live="polite"
                            aria-atomic="true"
                            class="mt-3 text-sm text-green-800 border border-green-200 py-2 px-3 bg-green-50"
                            aria-label="Subscription updated successfully"
                        >
                            Thank you for your interest in Adiamor! You will now receive emails that will notify you on upcoming
                            promotions and any new jewelry releases.
                        </p>
                    </article>

                    <article aria-labelledby="unsubscribe-heading">
                        <h3 id="unsubscribe-heading" class="text-lg md:text-xl font-normal">Unsubscribe</h3>
                        <p class="mt-3 text-sm">If you would like to stop receiving emails from Adiamor, please enter
                            your email in the form below.
                            Please be sure to enter the same address you previously used to sign up or place an order.
                        </p>
                        <form action="" @submit.prevent="submit(2)" aria-describedby="unsubscribe-error">
                            <div class="mt-3 space-y-2">
                                <label for="unsubscribe_input" class="block text-sm lg:text-base">Email address</label>
                                <input id="unsubscribe_input" name="email" type="email" autocomplete="email" required
                                    class="peer border p-2 text-sm w-full border-gray-200 rounded-none"
                                    aria-describedby="unsubscribe-error"
                                    @input="$bus.emit('aria-announce', 'Unsubscribe email entered')"
                                    placeholder="Enter your email" v-model="emailUnSubs">
                                <span id="unsubscribe-error" class="sr-only" aria-live="polite"></span>
                            </div>
                            <div class="mt-3 space-y-2">
                                <Button type="submit" id="unsubscribe_button"
                                    @click="$bus.emit('aria-announce', 'Unsubscribing from newsletter')"
                                    class="p-3 bg-black text-white w-full sm:w-auto"
                                >
                                    Unsubscribe
                                </Button>
                            </div>
                        </form>

                        <p v-show="showUnsubscribed"
                            role="alert"
                            aria-live="polite"
                            aria-atomic="true"
                            aria-label="Unsubscribed successfully"
                            class="mt-3 text-sm text-green-800 border border-green-200 py-2 px-3 bg-green-50">You have
                            been successfully unsubscribed from the Adiamor Newsletter. If you wish to resubscribe at any
                            time, please visit our site again.</p>
                    </article>
                </div>
            </div>
        </section>

        <div class="mt-8 lg:mt-16"
            role="region"
            aria-label="Contact Assistance">
            <ContactLink />
        </div>
    </div>
</template>
<script setup>
import Banner from "~/components/ui/Banner.vue";
import Icon from "~/components/common/Icon.vue";
import Button from "~/components/common/Button.vue";
import ContactLink from "~/components/common/ContactLink.vue";

const { $bus } = useNuxtApp();

const benefits = ref([
    'Exclusive offers on Adiamor jewelry',
    'Detailed guides and tips to help educate you on fine jewelry purchases',
    'Notifications regarding upcoming site enhancements to improve your Adiamor experience',
]);
const selectedMonth = ref('');
const selectedSecondMonth = ref('');
const selectedDay = ref('');
const selectedSecondDay = ref('');

// Native JS month names
const months = ref(Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'long' })
));

const showUnsubscribed = ref(false);
const showSubscribed = ref(false);
const emailSubs = ref('');
const emailUnSubs = ref('');

const days = computed(() => {
    if (selectedMonth.value) {
        const numberOfDays = new Date(
            new Date().getFullYear(),
            selectedMonth.value,
            0
        ).getDate();

        return Array.from({ length: numberOfDays }, (_, i) => i + 1);
    }
    return [];
});

const daysSecond = computed(() => {
    if (selectedSecondMonth.value) {
        const numberOfDays = new Date(
            new Date().getFullYear(),
            selectedSecondMonth.value,
            0
        ).getDate();

        return Array.from({ length: numberOfDays }, (_, i) => i + 1);
    }
    return [];
});

function submit(type) {
    if (type == 1) {
        $bus.emit('aria-announce', 'Newsletter preferences updated successfully');
        showSubscribed.value = true;
        selectedMonth.value = '';
        selectedSecondMonth.value = '';
        emailSubs.value = '';
    } else {
        $bus.emit('aria-announce', 'Successfully unsubscribed from newsletter');
        showUnsubscribed.value = true;
        emailUnSubs.value = '';
    }

    setTimeout(() => {
        showSubscribed.value = false;
        showUnsubscribed.value = false;
    }, 5000);
}

onMounted(() => {
    nextTick(() => {
        $bus.emit('aria-announce', 'Welcome to Adiamor Newsletter subscription page');
    });
});
</script>