<template>
  <div>
    <nav class="bg-white border-b border-gray-100 shadow-sm" aria-label="Checkout progress">
      <div class="max-w-7xl mx-auto w-full px-4 lg:px-8">

        <ol class="flex items-start py-3 lg:py-5" role="list">
          <li
            v-for="(item, index) in checkoutTabs"
            :key="index"
            role="listitem"
            :aria-current="item.stage === 'current' ? 'step' : undefined"
            class="flex items-start"
            :class="index < checkoutTabs.length - 1 ? 'flex-1' : ''"
          >
            <!-- Step indicator: circle + label -->
            <div
              class="flex flex-col items-center gap-1.5 lg:gap-2 flex-shrink-0"
              @click.prevent="item.stage === 'completed' || item.stage === 'current' ? activeClass(item.slug, index) : ''"
            >
              <button
                type="button"
                :disabled="item.stage === 'default'"
                @click="renderToPage(item, index, checkoutTabs)"
                :aria-label="getStepAriaLabel(item, index)"
                class="flex flex-col items-center gap-1.5 lg:gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary rounded-md disabled:cursor-default"
              >
                <!-- Mobile: small dot -->
                <div
                  class="lg:hidden h-2.5 w-2.5 rounded-full flex-shrink-0 transition-all duration-300"
                  :class="[
                    item.stage === 'completed' ? 'bg-primary' :
                    item.stage === 'current'   ? 'bg-primary ring-4 ring-primary/20' :
                    'bg-gray-200'
                  ]"
                  aria-hidden="true"
                ></div>

                <!-- Desktop: full circle with icon/number -->
                <div
                  class="hidden lg:flex w-9 h-9 rounded-full items-center justify-center border-2 flex-shrink-0 transition-all duration-300"
                  :class="[
                    item.stage === 'completed' ? 'bg-primary border-primary' :
                    item.stage === 'current'   ? 'bg-primary border-primary ring-4 ring-primary/20' :
                    'bg-white border-gray-200'
                  ]"
                  aria-hidden="true"
                >
                  <Icon v-if="item.stage === 'completed'" name="check" class="w-4 h-4 text-white" aria-hidden="true" />
                  <span v-else-if="item.stage === 'current'" class="w-2.5 h-2.5 rounded-full bg-white"></span>
                  <span v-else class="text-xs font-medium text-gray-400">{{ item.step }}</span>
                </div>

                <!-- Mobile label: only current step visible -->
                <span
                  class="lg:hidden text-xs font-semibold text-primary leading-tight text-center"
                  :class="item.stage !== 'current' ? 'sr-only' : ''"
                  v-html="$sanitize(item.title)"
                ></span>

                <!-- Desktop label: always visible -->
                <span
                  class="hidden lg:block text-xs font-medium text-center leading-tight transition-colors duration-300 max-w-[96px]"
                  :class="[
                    item.stage === 'current'   ? 'text-primary font-semibold' :
                    item.stage === 'completed' ? 'text-gray-500' :
                    'text-gray-400'
                  ]"
                  v-html="$sanitize(item.title)"
                ></span>
              </button>
            </div>

            <!-- Connector line between steps -->
            <div
              v-if="index < checkoutTabs.length - 1"
              class="flex-1 mt-[4px] lg:mt-[17px] mx-1.5 lg:mx-3"
              aria-hidden="true"
            >
              <div
                class="h-0.5 w-full rounded-full transition-all duration-500"
                :class="item.stage === 'completed' ? 'bg-primary' : 'bg-gray-200'"
              ></div>
            </div>
          </li>
        </ol>

      </div>

      <!-- Live region for screen readers -->
      <div class="sr-only" aria-live="polite" aria-atomic="true">
        {{ liveAnnouncement }}
      </div>
    </nav>
  </div>
</template>

<script>
import { STATIC_ROUTES } from "~/utils/staticRoutes";
import Icon from "~/components/common/Icon.vue";
export default {
    name : 'ProgressStep',
    components: { Icon },
    data() {
        return {
            checkoutTabs: [
                {
                    link: STATIC_ROUTES.CART_STEP_SUMMARY,
                    title: "Summary",
                    slug: "summary",
                    step: 1,
                    stage: "default",
                    position: " left : -15px",
                    subTitle: 'Your Order Details'
                },
                {
                    link: STATIC_ROUTES.CART_STEP_CONTACT,
                    title: "Contact <span class='hidden sm:inline'>Information</span>",
                    slug: "contact",
                    step: 2,
                    stage: "default",
                    position: " left : -56px",
                    subTitle: 'Fill your Shipping Details'
                },
                {
                    link: STATIC_ROUTES.CART_STEP_PAYMENT,
                    title: "Payment <span class='hidden sm:inline'>Information</span>",
                    slug: "payment",
                    step: 3,
                    stage: "default",
                    position: " left : -56px",
                    subTitle: 'Secure Payment Details'
                },
                {
                    link: STATIC_ROUTES.CART_STEP_REVIEW,
                    title: "Review",
                    slug: "review",
                    step: 4,
                    stage: "default",
                    position: " left : -12px",
                    subTitle: 'Review Your Order'
                }
            ],
            presentTab: "summary",
            visitorCode: "",
            liveAnnouncement: ''
        };
    },
    props: { emptyCart: Boolean },
    async mounted() {
        let index = this.checkoutTabs?.findIndex(el => {
            return this.$route.name == `${el.slug}Page`;
        });
        this.visitorCode = await this.$getVisitorCode();
        if (index < 0) {
            return this.$router.push(`${STATIC_ROUTES.CART_SUMMARY_WITH_VISITOR_CODE}${this.visitorCode}`);
        }
        this.activeClass(this.$route.name, index);
    },
    methods: {
        activeClass(tabName, currentIndex) {
            this.presentTab = tabName;
            this.checkoutTabs.forEach((item, index) => {
                if (index < currentIndex) {
                    item.stage = "completed";
                } else if (index === currentIndex) {
                    item.stage = "current";
                    this.liveAnnouncement = `Now on step ${index + 1} of ${this.checkoutTabs.length}, ${item.slug}`;
                } else {
                    item.stage = "default";
                }
            });
        },
        renderToPage(item, index, items) {
            if (item.stage === "completed" || item.stage === "current") {
                let link = item.link;
                if (link) {
                    this.$router.push(`/cart${link}?visitor_code=${this.visitorCode}`);
                }
            }
        },
        getStepAriaLabel(item, index) {
            const total = this.checkoutTabs.length;
            const position = index + 1;

            let stateText = '';

            if (item.stage === 'current') {
                stateText = 'Current step';
            } else if (item.stage === 'completed') {
                stateText = 'Completed';
            } else {
                stateText = 'Not completed';
            }

            return `Step ${position} of ${total}, ${item.slug}, ${stateText}`;
        },

    },
};
</script>
