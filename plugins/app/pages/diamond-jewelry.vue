<template>
    <div>
        <Banner
            :bgImage="`https://cdn.adiamor.com/landing-pages/heros/banner_diamondjewelry.jpg?updatedAt=1746137179966`"
            :contentBackgroundColor="`bg-black/70 sm:bg-transparent`"
            :contentTextColor="`text-white sm:text-gray-black`"
            alt="Diamond Jewelry"
        >
            <h1 class="text-4xl sm:text-5xl tk-gill-sans-nova tracking-normal uppercasefont-normal mb-4">Diamond Jewelry</h1>
            <p class="mb-8 text-sm sm:text-lg">Everything from diamond engagement rings and elegant diamond
                stud earrings to classic solitaire pendants and diamond tennis bracelets.</p>
            <div class="flex justify-end md:justify-start gap-4">
                <NuxtLink
                    :to="STATIC_ROUTES.JEWELRY_SEARCH_DIAMOND"
                    class="flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-primary text-white font-normal sm:!text-base px-8 py-2.5 uppercase font-gill-sans tracking-[0.125rem] bg-primary hover:bg-primary/90"
                    aria-label="Search all diamond jewelry"
                    @click="$bus.emit('aria-announce','Navigating to search all diamond jewelry')"
                >
                    Search All Diamond Jewelry
                </NuxtLink>
            </div>
        </Banner>

        <!-- Design Your Own -->
        <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16" aria-labelledby="design-your-own-heading">
            <div class="relative flex items-center">
                <div
                    class="mx-auto flex-1 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center lg:justify-start">
                    <div class="max-w-md w-full text-center md:text-left space-y-4">
                        <hgroup class="space-y-2">
                            <h2 class="text-base">Design Your Own</h2>
                            <h2 id="design-your-own-heading" class="text-lg md:text-xl lg:text-3xl font-normal">Diamond Jewelry</h2>
                            <p class="mt-2 text-sm">Choose a diamond and design your unique piece of timeless diamond jewelry.</p>
                        </hgroup>
						<div class="w-full text-center flex flex-col gap-3">
                            <NuxtLink
                                :to="STATIC_ROUTES.DESIGN_RING"
                                class="w-full px-8 py-2.5 font-medium mx-auto focus:outline-none focus:ring-1 bg-primary uppercase font-gill-sans tracking-[0.125rem] text-white hover:bg-primary/90 focus:ring-primary"
                                aria-label="Design your own diamond ring"
                                @click="$bus.emit('aria-announce','Navigating to design your own ring')"
                            >
                                Design Your Own Ring
                            </NuxtLink>

                            <NuxtLink
                                :to="STATIC_ROUTES.DESIGN_EARRINGS"
                                class="w-full px-8 py-2.5 font-medium mx-auto focus:outline-none focus:ring-1 bg-primary uppercase font-gill-sans tracking-[0.125rem] text-white hover:bg-primary/90 focus:ring-primary"
                                aria-label="Design your own diamond earrings"
                                @click="$bus.emit('aria-announce','Navigating to design your own earrings')"
                            >
                                Design Your Own Earring
                            </NuxtLink>

                            <NuxtLink
                                :to="STATIC_ROUTES.DESIGN_PENDANT"
                                class="w-full px-8 py-2.5 font-medium mx-auto focus:outline-none focus:ring-1 bg-primary uppercase font-gill-sans tracking-[0.125rem] text-white hover:bg-primary/90 focus:ring-primary"
                                aria-label="Design your own diamond pendant"
                                @click="$bus.emit('aria-announce','Navigating to design your own pendant')"
                            >
                                Design Your Own Pendant
                            </NuxtLink>
                        </div>
                    </div>
                </div>
				<div class="flex-1">
					<nuxt-img provider="cdn" src="/landing-pages/heros/diamond_jewelry_generic.jpg?updatedAt=1746137194467" class="w-full h-full object-cover"
						alt="Engagement Ring Guide"/>
				</div>
            </div>
        </section>

        <!-- category grid -->
		<div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16 space-y-6 md:space-y-12">
			<div class="grid grid-cols-2 sm:grid-rows-2 grid-flow-dense gap-4 md:gap-8">
				<div class="relative row-span-2 col-start-2 flex flex-col">
                    <NuxtLink
                        :to="STATIC_ROUTES.WEDDING_RINGS_SEARCH"
                        class="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Shop diamond rings"
                        @click="$bus.emit('aria-announce','Navigating to diamond rings search')"
                    ></NuxtLink>
					<div class="relative w-full h-full grow max-lg:mx-auto max-lg:max-w-sm flex-1 max-h-full">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-top" src="/landing-pages/heros/diajel_rings.jpg?updatedAt=1746137188446" alt="Diamond Rings collection"/>
					</div>
					<div class="p-2 sm:p-4 absolute backdrop-blur-sm bg-white/60 inset-x-0 top-0 flex flex-col">
						<h2 class="font-normal text-sm sm:text-lg lg:text-3xl">Diamond Rings</h2>
						<p class="mt-1 text-xs sm:text-base">Learn about the “4Cs” to help you with your online diamond shopping.</p>
					</div>
				</div>
				<div class="relative flex items-center">
					<div class="relative w-full h-full flex-1 border border-gray-200">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-top" src="/landing-pages/heros/diajel_earrings.jpg?updatedAt=1746137188387" alt="Diamond Earrings collection"/>
					</div>
					<div class="absolute top-0 inset-x-0 bg-white/60 backdrop-blur-sm sm:backdrop-blur-0 sm:relative flex flex-col flex-1 p-2 sm:p-6">
						<h2 class="font-normal text-sm sm:text-lg lg:text-xl">Diamond Earrings</h2>
                        <NuxtLink
                            :to="STATIC_ROUTES.EARRINGS_SEARCH_DIAMOND"
                            class="underline text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Shop diamond earrings"
                            @click="$bus.emit('aria-announce','Navigating to diamond earrings search')"
                        >
                            Shop Now
                        </NuxtLink>
					</div>
				</div>
				<div class="relative flex items-center">
					<div class="relative w-full h-full flex-1 border border-gray-200">
						<nuxt-img provider="cdn" class="w-full h-full object-cover object-top" src="/landing-pages/heros/diajel_pendant.jpg?updatedAt=1746137188212" alt="Diamond Pendants collection"/>
					</div>
					<div class="absolute top-0 inset-x-0 bg-white/60 backdrop-blur-sm sm:backdrop-blur-0 sm:relative flex flex-col flex-1 p-2 sm:p-6">
						<h2 class="font-normal text-sm sm:text-lg lg:text-xl">Diamond Pendants</h2>
                        <NuxtLink
                            :to="STATIC_ROUTES.NECKLACES_SEARCH_DIAMOND"
                            class="underline text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            aria-label="Shop diamond pendants"
                            @click="$bus.emit('aria-announce','Navigating to diamond pendants search')"
                        >
                            Shop Now
                        </NuxtLink>
					</div>
				</div>
			</div>
		</div>

        <div
            class="mt-8 lg:mt-16"
            role="region"
            aria-label="Contact Assistance"
        >
            <ContactLink />
        </div>
    </div>
</template>

<script>
    import Banner from "~/components/ui/Banner.vue";
    import ContactLink from "~/components/common/ContactLink.vue";
    import { STATIC_ROUTES } from "~/utils/staticRoutes";
    export default {
        name : "DiamondJewelryPage",
        components: { Banner, ContactLink },
        data() {
            return{
                STATIC_ROUTES
            }
        },
        mounted() {
            this.$bus.emit(
                'aria-announce',
                'Diamond Jewelry page loaded. You can search all diamond jewelry or design your own ring, earrings, or pendant.'
            );
        }
    }
</script>