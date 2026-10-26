<template>
    <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8">
        <div class="bg-primary py-10 lg:py-24">
            <div class="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
                <h2 class="max-w-xl text-lg md:text-3xl tracking-tight text-white lg:col-span-7"  id="newsletter-heading">Sign up for new
                    styles, special offers, and trend alerts!</h2>
                <form class="w-full max-w-md lg:col-span-5 lg:pt-2" @submit.prevent="isSubsribed = true" aria-labelledby="newsletter-heading">
                    <div v-if="!isSubsribed">
                        <div class="flex gap-2 md:gap-x-2">
                            <label for="email_capture_instagram" class="sr-only hidden sm:inline-block">Email address</label>
                            <input id="email_capture_instagram" name="email" type="email" autocomplete="email" required
                                class="min-w-0 flex-auto bg-white px-3.5 py-2 text-base outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-black/75 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-white sm:text-sm/6 rounded-none"
                                placeholder="Enter your email"  aria-required="true"
                                aria-describedby="newsletter-privacy">
                            <Button type="submit" colorType="bordered-white" aria-label="Subscribe to newsletter">Subscribe</Button>
                        </div>
                        <p class="mt-4 text-sm/6 text-gray-100">We care about your data. Read our <a :href="STATIC_ROUTES.POLICIES_PRIVACY"
                                class="font-semibold text-white hover:text-primary">privacy&nbsp;policy</a>.</p>
                    </div>
                    <div v-else class="text-center text-sm/6 sm:text-base/6 text-green-700 py-2 px-3 bg-green-50 border border-gray-200" role="status" aria-live="polite">
                        Thank you! You have been subscribed.
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>
<script>
import Button from "~/components/common/Button.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name : 'Newsletter',
    components: { Button },
    data(){ return { 
            isSubsribed: false,
            STATIC_ROUTES
        } 
    }
}
</script>