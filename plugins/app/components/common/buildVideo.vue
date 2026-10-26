<template>
    <!-- Your Design it, Web build it -->
    <section class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 pt-8 lg:pt-16" aria-labelledby="design-build-heading">
        <div class="relative text-white h-60 md:h-[398px] flex items-center justify-center md:justify-end">
            <!-- Content Overlay -->
            <div class="relative z-10 max-w-md w-full h-full px-4 lg:px-14 space-y-7 flex flex-col justify-center items-center md:items-start after:content-[''] after:absolute after:inset-0 after:bg-[#f6f6f622] after:backdrop-blur-sm after:-z-10 after:brightness-50 text-center md:text-left">
                <div class="absolute inset-0 bg-black/50 z-0" aria-hidden="true"></div>
                <div class="flex flex-col space-y-4 z-10">
                    <h2 id="design-build-heading" class="font-normal text-lg md:text-xl lg:text-3xl">
                        You <strong class="font-medium">Design</strong> It,
                        We <strong class="font-medium">Build</strong> It
                    </h2>
                    <p class="mt-1 text-sm md:text-lg">Make it your own. Each ring is a one of a kind masterpiece
                        made for you in our Los Angeles manufacturing house.</p>
                    <Link :href="ringLink" aria-label="Design your own custom engagement ring"
                        class="lg:!py-3 !px-8 md:!text-sm font-medium mx-auto md:ml-0 uppercase font-gill-sans tracking-[0.125rem]">Design Your Own Ring</Link>
                </div>
            </div>
            <!-- Background Video (Decorative) -->
            <video loop autoplay muted playsinline name="media" tabindex="-1" aria-hidden="true"
                class="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2">
                <source src="https://cdn.adiamor.com/Media/manufacturing.mp4?updatedAt=1747477494232" type="video/mp4">
            </video>
        </div>
    </section>
</template>
<script>
import Link from "~/components/ui/Link.vue";
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name : 'BuildVideo',
    data() {
        return {
            ringLink: STATIC_ROUTES.DESIGN_RING
        }
    },
    components: { Link }
}
</script>