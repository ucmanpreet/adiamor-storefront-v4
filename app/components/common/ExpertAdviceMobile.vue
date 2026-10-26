<template>
    <div class="mt-4 w-100 bg-primary/7 border border-gray-200 text-gray-black sm:hidden">
        <div class="relative w-100 bg-black flex flex-col">
            <div class="inset-0">
                <nuxt-img provider="cdn" src="/landing-pages/heros/education-wide.jpg?tr=w-360,h-135&amp;updatedAt=1747976883375"
                    alt="Diamond education and jewelry buying guide resources" class="w-full h-full object-cover object-left"/>
            </div>
            <div class="z-0 text-white p-4">
                <h2 class="text-sm font-normal flex items-center gap-1">Questions? Just Ask</h2>
                <p>
                    <button
                        type="button"
                        @click="openHelpDesk()"
                        class="underline focus:outline-none focus:ring-2 focus:ring-white"
                        aria-label="Open chat with expert staff"
                    >
                        Our expert staff is ready to help.
                    </button>
                </p>
            </div>
        </div>
        <div class="flex px-6 pt-6 flex-col justify-between gap-2 mb-6 text-sm">
            <button
                type="button"
                class="p-2 shadow-banner flex-1 bg-white text-left focus:outline-none focus:ring-2 focus:ring-primary"
                @click="openHelpDesk('Can I finance my purchase?')"
                aria-label="Ask: Can I finance my purchase?"
            >
                Can I finance my purchase?
            </button>

            <button
                type="button"
                class="p-2 shadow-banner flex-1 bg-white text-left focus:outline-none focus:ring-2 focus:ring-primary"
                @click="openHelpDesk('How can I find my ring size?')"
                aria-label="Ask: How can I find my ring size?"
            >
                How can I find my ring size?
            </button>

            <button
                type="button"
                class="p-2 shadow-banner flex-1 bg-white text-left focus:outline-none focus:ring-2 focus:ring-primary"
                @click="openHelpDesk('Can I customize this ring?')"
                aria-label="Ask: Can I customize this ring?"
            >
                Can I customize this ring?
            </button>

            <button
                type="button"
                class="p-2 shadow-banner flex-1 bg-white text-left focus:outline-none focus:ring-2 focus:ring-primary"
                @click="openHelpDesk('Is this a good diamond?')"
                aria-label="Ask: Is this a good diamond?"
            >
                Is this a good diamond?
            </button>

            <button
                type="button"
                class="p-2 shadow-banner flex-1 bg-white text-left focus:outline-none focus:ring-2 focus:ring-primary"
                @click="openHelpDesk('Do I need a care plan?')"
                aria-label="Ask: Do I need a care plan?"
            >
                Do I need a care plan?
            </button>
        </div>
        <div class="flex px-6 pb-6 flex-col gap-2">
            <button
                type="button"
                @click="openHelpDesk()"
                class="flex flex-1 gap-2 items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary font-normal text-sm !px-4 !py-3 font-gill-sans uppercase tracking-widest-xl bg-primary text-white hover:bg-primary/90"
                aria-label="Chat now with support"
            >
                <svg width="20" height="20" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="cursor-pointer" aria-hidden="true" >
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M4.78 4.82C2.71 6.372 1.5 8.46 1.5 10.702c0 2.477 1.48 4.77 3.961 6.353l.355.227-.008.42c-.026 1.392-.554 2.757-1.196 3.86a233.68 233.68 0 005.585-2.555l.209-.099.227.035c.755.115 1.537.176 2.34.176 3.228 0 6.122-.982 8.192-2.535 2.07-1.552 3.28-3.64 3.28-5.882 0-2.242-1.21-4.33-3.28-5.882-2.07-1.552-4.964-2.535-8.192-2.535-3.23 0-6.123.983-8.193 2.535zm-.9-1.2C6.234 1.855 9.45.785 12.973.785c3.521 0 6.738 1.07 9.092 2.835 2.354 1.766 3.88 4.262 3.88 7.082 0 2.82-1.526 5.317-3.88 7.082-2.354 1.765-5.57 2.835-9.093 2.835-.796 0-1.577-.055-2.335-.16-3.57 1.694-7.483 3.383-8.237 3.709l-.096.04-.022.01.004-.001.01-.005.013-.006.012-.006a.672.672 0 00.022-.013l-.793-1.271c.438-.299 1.13-1.036 1.721-2.032.515-.866.91-1.852 1.012-2.81C1.7 16.293 0 13.68 0 10.701c0-2.82 1.526-5.316 3.88-7.082z"
                        fill="currentColor"></path>
                </svg>
                <span>Chat Now</span>
            </button>
            <button
                type="button"
                @click="openHelpDesk()"
                class="flex flex-1 gap-2 items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary font-normal text-sm !px-4 !py-3 font-gill-sans uppercase tracking-widest-xl bg-primary text-white hover:bg-primary/90"
                aria-label="Call support at 877-627-5094"
            >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                    class="cursor-pointer" aria-hidden="true" >
                    <path
                        d="M8.367 4.431l.541.97c.488.874.292 2.021-.477 2.79 0 0-.933.933.759 2.623 1.689 1.69 2.622.759 2.622.759.77-.77 1.917-.965 2.791-.478l.97.542c1.32.737 1.476 2.588.315 3.75-.697.697-1.552 1.24-2.496 1.275-1.59.06-4.291-.342-7-3.05-2.709-2.71-3.111-5.41-3.05-7 .035-.944.578-1.8 1.274-2.497 1.162-1.16 3.014-1.005 3.75.317m2.686-2.864a.625.625 0 01.718-.517l.125.025c.072.015.17.04.293.075.248.073.593.192 1.008.382.83.38 1.935 1.046 3.081 2.192 1.147 1.147 1.813 2.252 2.194 3.082.19.415.308.76.38 1.008.037.125.068.251.095.379l.004.025a.637.637 0 01-.514.732.625.625 0 01-.717-.514 2.501 2.501 0 00-.068-.273 6.169 6.169 0 00-.316-.836c-.325-.709-.91-1.687-1.942-2.719-1.032-1.031-2.009-1.615-2.718-1.94a6.167 6.167 0 00-.836-.317 5.012 5.012 0 00-.265-.067.633.633 0 01-.522-.717z"
                        fill="currentColor"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M11.235 4.442a.624.624 0 01.773-.43l.002.001h.003l.006.003.017.005.047.016a4.188 4.188 0 01.64.31c.406.243.963.643 1.617 1.298.654.654 1.055 1.21 1.297 1.618.12.204.2.37.252.492.028.063.053.128.075.194l.005.017.002.006v.003s0 .002-.6.174l.6-.172a.625.625 0 01-1.198.352l-.003-.008-.029-.074a3.355 3.355 0 00-.18-.347c-.186-.314-.522-.789-1.105-1.372-.583-.583-1.057-.918-1.372-1.104a3.331 3.331 0 00-.42-.208l-.008-.004a.625.625 0 01-.42-.77z"
                        fill="currentColor"></path>
                </svg>
                <span>877-627-5094</span>
            </button>
        </div>
    </div>
</template>

<script setup>
function openHelpDesk(message) {
  if (typeof helpDesk !== "undefined" && helpDesk.click) {
    if (message) {
      helpDesk.click(message);
    } else {
      helpDesk.click();
    }
  }
}
</script>