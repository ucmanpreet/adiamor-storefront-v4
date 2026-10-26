<template>
  <div>
    <span v-if="itemId && configSummary" :id="itemId" class="sr-only">{{ configSummary }}</span>
    <dl
      class="flex flex-col text-sm mt-2"
      aria-label="Selected product configuration details"
    >
      <template v-if="isNoSummaryPage">
        <!-- Ring Size -->
        <template v-if="item?.ring_size">
          <div class="flex w-full items-center mt-1">
            <dt class="font-normal mr-1">
              Ring Size:
            </dt>
            <dd class="capitalize">
              {{ item.ring_size }}
            </dd>
          </div>
        </template>

        <!-- Engraving -->
        <template v-if="item.engraving?.type">
          <div class="flex w-full justify-between items-center mt-1">
            <div>
              <dt class="font-normal inline">
                Engraving:
              </dt>
              <dd class="inline capitalize">
                {{ item.engraving.type }} Lettering
                "<span>{{ item.engraving.text }}</span>"
              </dd>
            </div>

            <dd
              class="text-right"
              aria-label="Engraving price"
            >
              {{ formattedPrice(item.engraving?.price) }}
            </dd>
          </div>
        </template>

        <!-- Protection Plan -->
        <template v-if="item.protection_plan?.planSku">
          <div class="flex w-full justify-between items-center mt-1">
            <div>
              <dt class="font-normal inline">
                Protection Plan:
              </dt>
              <dd class="inline">
                {{
                  item.protection_plan.applicablePlanDuration
                    ? formatCarePlan(item.protection_plan.applicablePlanDuration) ||
                      item.protection_plan.applicablePlanDuration
                    : "-"
                }}
              </dd>
            </div>

            <dd
              class="text-right"
              aria-label="Protection plan price"
            >
              {{ formattedPrice(item.protection_plan?.price) }}
            </dd>
          </div>
        </template>

        <!-- Prong Fitting -->
        <template v-if="item.prong_fitting?.prong_type">
          <div class="flex w-full justify-between items-center mt-1">
            <div>
              <dt class="font-normal inline">
                Prongs:
              </dt>
              <dd class="inline">
                <span v-if="item.prong_fitting.carat">
                  {{ item.prong_fitting.carat }} ct.
                </span>
                {{ item.prong_fitting.prong_type }}

                <span
                  v-if="item.prong_fitting.length || item.prong_fitting.width || item.prong_fitting.height"
                >
                  {{ item.prong_fitting.length }}
                  {{ item.prong_fitting.width ? " x " + item.prong_fitting.width : "" }}
                  {{ item.prong_fitting.height ? " x " + item.prong_fitting.height : "" }}
                  mm
                </span>
              </dd>
            </div>

            <dd
              class="text-right"
              aria-label="Prong fitting price"
            >
              {{ formattedPrice(item.prong_fitting?.prong_price) }}
            </dd>
          </div>
        </template>
      </template>

      <!-- Prong Type -->
      <template v-if="item.prongs">
        <div class="flex w-full justify-between items-center mt-1">
          <div>
            <dt class="font-normal inline">
              Prong Type:
            </dt>
            <dd class="inline">
                {{ item.prongs }}
            </dd>
          </div>
        </div>
      </template>
    </dl>
  </div>
</template>
<script setup>
const props = defineProps(["item", "type", "itemId"]);
const { $formatPrice } = useNuxtApp();

function formattedPrice(price) {
  if (price === 0) return $formatPrice(0, true);
  if (price) return $formatPrice(parseFloat(price), true);
}
function formatCarePlan(str) {
  if (str && str?.includes('Year')) {
    return str.replace('Year', 'Years');
  }
  return str;
}

const isNoSummaryPage = computed(() => props.type != "cart_summary");
const configSummary = computed(() => {
  const parts = [];
  if (props.item?.ring_size) parts.push(`Ring Size: ${props.item.ring_size}`);
  if (props.item?.engraving?.type) parts.push(`Engraving: ${props.item.engraving.type} Lettering "${props.item.engraving.text}"`);
  if (props.item?.protection_plan?.planSku) {
    const dur = props.item.protection_plan.applicablePlanDuration;
    parts.push(`Protection Plan: ${dur ? formatCarePlan(dur) : '-'}`);
  }
  if (props.item?.prong_fitting?.prong_type) parts.push(`Prongs: ${props.item.prong_fitting.prong_type}`);
  if (props.item?.prongs) parts.push(`Prong Type: ${props.item.prongs}`);
  return parts.join(', ');
});
</script>
