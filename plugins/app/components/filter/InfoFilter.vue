<template>
    <div role="document" aria-live="polite">
        <div v-if="modalTitle === 'diamond_cut_grade'">
            <div class="prose prose-sm prose-a:text-white prose-white capitalize max-w-full">
                Diamond Cut, more than any other quality aspect, gives a diamond its sparkle. A diamond gets its
                brilliance
                by cutting and polishing the diamond facets to allow the maximum amount of light to be dispersed
                back.<br>
                <b>
                    AF:&nbsp;&nbsp;Affinity Ideal<br>
                    EX:&nbsp;&nbsp;Excellent<br>
                    VG:&nbsp;&nbsp;Very Good<br>
                    G:&nbsp;&nbsp;Good<br>
                    F:&nbsp;&nbsp;Fair<br>
                </b><br>
                <strong>Affinity Ideal</strong> is the highest cut grade.<br><br><a :href="STATIC_ROUTES.EDUCATION_DIAMOND_CUT">Learn
                    more
                    about Diamond Cut</a>
            </div>
        </div>
        <div class="prose prose-sm prose-a:text-white prose-white capitalize max-w-full" v-if="modalTitle === 'diamond_color_grade'">
            Diamond Color is one of the most important factors to consider, as it is noticeable to the "naked"
            eye.<br><br>
            Diamond color has a significant impact on its value. Although many diamonds appear to be colorless, many of
            them
            have at least a hint of body color.<br><br>
            <strong>D</strong> is the highest color grade. Adiamor only carries diamonds in the color range from
            <strong>D -
                J</strong>.<br><br>
            <a :href="STATIC_ROUTES.EDUCATION_DIAMOND_COLOR">Learn more about Diamond Color</a>
        </div>
        <div class="prose prose-sm prose-a:text-white prose-white capitalize max-w-full" v-if="modalTitle === 'diamond_clarity_grade'">
            Most diamonds have unique clarity characteristics, much like a fingerprint. These distinguishing
            characteristics
            can be classified as <strong>inclusions</strong> and <strong>blemishes</strong>.<br><br>
            If there is anything disrupting the flow of this in the diamonds, such as an inclusion, a proportion of the
            light reflected may be lost and can detract from the pure beauty of the diamond.<br><br>
            <strong>IF (Internally Flawless)</strong> is the highest clarity grade.<br><br>
            <a :href="STATIC_ROUTES.EDUCATION_DIAMOND_CLARITY">Learn more about Diamond Clarity</a>
        </div>
        <div v-if="modalTitle === 'diamond_polish'" class="prose prose-sm prose-a:text-white prose-white capitalize max-w-full">
            <strong>Polish</strong> refers to the quality of the diamond's surface and includes such features as nicks,
            polish lines and abrasions.
        </div>
        <div v-if="modalTitle === 'diamond_symmetry'" class="prose prose-sm prose-a:text-white prose-white capitalize max-w-full">
            <strong>Symmetry</strong> refers to the exactitude of the shape and alignment of the facets.
        </div>
        <div v-if="modalTitle === 'diamond_fluorescence'" class="prose prose-sm prose-a:text-white prose-white capitalize max-w-full">
            <strong>Fluorescence</strong> is not directly related to a diamond's color. This separate characteristic refers to the
            diamond's
            ability to fluoresce under ultraviolet (UV) light.<br><br>
            The fluorescence of a diamond is defined by its intensity as either None, Faint, Medium, Strong, or Very
            Strong.
            Although fluorescence is a characteristic that can be measured, it is rarely an issue when selecting a
            diamond
            and is usually not detectable to the eye.
        </div>
    </div>
</template>
<script>
import { STATIC_ROUTES } from "~/utils/staticRoutes";
export default {
    name : 'InfoFilter',
    props: ['modalTitle'],
    data() {
        return { STATIC_ROUTES };
    }
}
</script>