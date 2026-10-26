<template>
	<!-- Focus Trap Wrapper -->
		<div
			:class="[
				'fixed inset-0 flex items-center justify-center py-6',
				zIndexClass || 'z-65',
			]"
			@keydown.esc="closeModal"
		>
			<!-- Background overlay — aria-hidden so AT ignores it; keyboard close via @keydown.esc on outer div -->
			<div
				class="fixed inset-0 bg-black/40"
				aria-hidden="true"
				@click="closeModal"
			></div>

			<!-- Modal Content — escapeDeactivates:false so FocusTrap never closes modal on Esc;
			     outer div @keydown.esc does it, but only when dropdown stopPropagation hasn't consumed the event -->
			<FocusTrap :active="true" :initial-focus="() => modalHeadingEl || modalContent || undefined" :fallback-focus="() => modalContent || undefined" @deactivate="closeModal" :escape-deactivates="false">
			<div
				:class="[
					'relative transform overflow-hidden w-full bg-white text-left shadow-xl transition-all sm:my-8',
					maxWidthClass || modalWidth,
					'max-h-screen overflow-y-auto'
				]"
				role="dialog"
				aria-modal="true"
				:aria-labelledby="(heading || srHeading) ? 'modalHeading' : null"
				tabindex="-1"
				ref="modalContent"
			>
				<div class="bg-white rounded-lg shadow-lg w-full">

					<!-- Modal Header -->
					<div class="flex items-start justify-end gap-3 px-6 pt-4" :class="{ 'pb-4': heading }">
						<!-- sr-only heading: screen reader ke liye, visually hidden -->
						<div class="w-full pr-[60px]">
							<!-- sr-only heading for screen readers when no visible heading -->
							<h2
								v-if="srHeading && !heading"
								id="modalHeading"
								ref="modalHeadingEl"
								tabindex="-1"
								class="sr-only"
								:class="headingClass"
							>{{ srHeading }}</h2>
							<!-- Visual heading — v-if (not v-show) keeps only one #modalHeading in DOM -->
							<h2
								v-else-if="heading"
								id="modalHeading"
								ref="modalHeadingEl"
								tabindex="-1"
								class="text-center font-medium sm:font-normal text-xl sm:text-2xl text-gray-black uppercase flex-1"
								:class="headingClass"
							>
								{{ heading }}
							</h2>
						</div>

						<!-- Close Button -->
						<button
							v-if="!hideClose"
							type="button"
							@click="closeModal"
							class="text-white absolute z-50 top-0 right-0 block bg-gray-600 p-2 opacity-60 hover:opacity-100 border border-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
							data-bs-dismiss="modal" aria-label="Close"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="currentColor"
								class="cursor-pointer size-6 sm:size-8"
								viewBox="0 0 16 16"
								aria-hidden="true"
							>
								<path
									d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
								/>
							</svg>
						</button>
					</div>

					<!-- Loader — aria-hidden mirrors v-show so the live region is inert when invisible -->
					<div
						class="absolute inset-0 flex items-center justify-center z-20 group-dark"
						v-show="loading"
						:aria-hidden="loading ? 'false' : 'true'"
						role="status"
						aria-live="polite"
					>
						<CustomLoader />
						<span class="sr-only">Loading</span>
					</div>

					<!-- Modal Body -->
					<div :class="['px-6 pb-6', modalClass]">
						<slot></slot>
					</div>

				</div>
			</div>
			</FocusTrap>
		</div>
</template>

<script setup>
import CustomLoader from '~/components/ui/CustomLoader.vue';
import { FocusTrap } from 'focus-trap-vue';

const props = defineProps({
	modalClass: String,
	heading: String,
	srHeading: String,
	maxWidthClass: {
		type: String,
	},
	loading: {
		type: Boolean,
		default: false,
	},
	hideClose: {
		type: Boolean,
		default: false
	},
	zIndexClass: {
		type: String,
	},
	headingClass: {
		type: String
	}
});

const emit = defineEmits(['close']);

const modalContent = ref(null);
const modalHeadingEl = ref(null);

const modalWidth = computed(() => {
	if (import.meta.client) {
		return window.innerWidth > 640 && window.innerWidth < 1024 && window.innerHeight < 500
			? 'max-w-sm'
			: 'max-w-xl';
	}
	return 'max-w-xl';
});

function closeModal() {
	document.body.classList.remove("overflow-hidden");
	emit("close");
}

onMounted(() => {
	document.body.classList.add("overflow-hidden");
	nextTick(() => {
		(modalHeadingEl.value || modalContent.value)?.focus();
	});
});

onUnmounted(() => {
	document.body.classList.remove("overflow-hidden");
});
</script>

<style>
@media screen and (max-width: 768px) and (orientation: landscape) {
	.modal-container {
		max-width: 90vw;
		max-height: 90vh;
	}
}
</style>