<template>
  <div class="relative flex items-center" v-if="staticInfoData[code]" v-click-outside="closeModal">
    <button
      type="button"
      ref="infoBtn"
      @click="assignVariables()"
      :aria-expanded="isModalOpen.toString()"
      aria-haspopup="dialog"
      :aria-label="`More information about ${item?.name || code}`"
      :tabindex="hidden ? -1 : 0"
    >
      <Icon name="info" class="w-4 h-4 cursor-pointer relative z-10" aria-hidden="true"/>
    </button>
    <template v-if="isDesktop">
      <div class="!leading-normal">
        <Popover v-if="isModalOpen" :heading="item?.name" :modalTitle="code" @close="closeModal">
            {{ staticInfoData[code] }}
        </Popover>
      </div>
    </template>
    <template v-if="!isDesktop">
      <div>
        <Modal
          v-if="isModalOpen"
          :heading="item?.name"
          @close="closeModal"
          maxWidthClass="max-w-sm"
        >
          <div class="-mt-6">
            {{ staticInfoData[code] }}
          </div>
        </Modal>
      </div>
    </template>
  </div>
</template>
<script setup>
import Icon from "~/components/common/Icon.vue";
import Popover from "~/components/product/Popover.vue";
import Modal from "~/components/ui/Modal.vue";

const props = defineProps(["item", "hidden"]);
const emit = defineEmits(["assignCode"]);

const { $isMobile } = useNuxtApp();

const staticInfoData = ref({
        diamond_carat_weight:
          "A unit of weight for a diamond, equivalent to 200 milligrams, or 0.2 gram.",
        diamond_cut_grade:
          'Generally, cut refers to both the shape of a stone (round, marquise, princess cut, oval, etc.) and the proportions and finish of a diamond also known as "make". The make of a stone is the most important factor in determining how much sparkle comes from a diamond.',
        diamond_color_grade:
          "A grade given to a diamond to describe the color tones of the stone. The color scale ranges from D, meaning completely colorless, to Z, fancy yellow. As the scale moves from D to Z, it indicates increasing levels of yellow and brown tone.",
        diamond_clarity_grade:
          "A grade given to a diamond to describe how many inclusions are within the diamond. The clarity scale ranges from FL (flawless), meaning a diamond has no internal or external flaws, to I3 (severely included), meaning a diamond has many flaws clearly visible to the naked eye.",
        diamond_depth_percent:
          "The height of a diamond (measured from the : to the table) divided by the width of the diamond. The depth % is critical to creating brilliance and fire in a diamond; a depth % that is too low or too high will cause a diamond to lack sparkle.",
        diamond_table_percent:
          "The largest facet on a diamond, located on the top of the diamond facing out from the setting. The Table % is the width of the table divided by the total diameter of the diamond. The table % is critical to creating sparkle in a diamond; a table % that is too low or too high will cause a diamond to lack sparkle.",
        diamond_polish:
          "A grade given to the external finish of a stone. The polish scale ranges from poor to excellent.",
        diamond_symmetry: `The overall uniformity of the cut of a diamond. Graded from poor to excellent, it is based on the diamond's proportions and the relation of one facet to another.Poor symmetry will hurt the sparkle of a diamond.`,
        diamond_girdle:
          "The outermost edge of a diamond, it can be unpolished, polished, or faceted. Usually where the diamond is held in a setting.",
        diamond_fluorescence:
          'A glow, usually of a bluish color, which emanates from certain diamonds when exposed to ultraviolet light. Faint fluorescence usually does not affect the appearance of a diamond. Strong, very strong and sometimes medium blue fluorescence may slightly improve the color appearance of diamonds rated "H" in color or below (I,J,K etc).',
        sidestone_weight: 'A unit of weight for a diamond, equivalent to 200 milligrams, or 0.2 gram.',
        sidestone_clarity: 'A grade given to a diamond to describe how many inclusions are within the diamond. The clarity scale ranges from FL (flawless), meaning a diamond has no internal or external flaws, to I3 (severely included), meaning a diamond has many flaws clearly visible to the naked eye.',
        sidestone_color: 'A grade given to a diamond to describe the color tones of the stone. The color scale ranges from D, meaning completely colorless, to Z, fancy yellow. As the scale moves from D to Z, it indicates increasing levels of yellow and brown tone.',
      });
const isModalOpen = ref(false);

const code = computed(() => props.item?.code);

const isDesktop = computed(() => !$isMobile);

function assignVariables() {
    emit("assignCode", code.value);
    isModalOpen.value = !isModalOpen.value;
}

function closeModal() {
    isModalOpen.value = false;
}
</script>
