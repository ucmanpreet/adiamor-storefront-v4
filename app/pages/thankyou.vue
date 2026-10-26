<template>
	<div>
		<section class="mx-auto max-w-5xl w-full px-4 lg:px-8 py-12">
			<div class="flex gap-4">
				<icon name="check-circle-fill" class="text-primary w-16 h-16 mb-4" />
				<h2 class="text-black text-4xl sm:text-6xl font-bold !font-sans normal-case !-tracking-tight">Thank you for your
					order!</h2>
			</div>
			<p class="text-sm sm:text-base mt-3 mb-2">
				Your order <b class="text-primary font-semibold">#{{ order?.increment_id }}</b> has been placed in our system
				for processing.<br>
				Please reference this number when contacting Adiamor about your order.
			</p>
			<h2 class="uppercase text-2xl mt-8 mb-6">order confirmation</h2>
			<p class="bg-secondary-200 text-sm leading-[1.5rem] my-5">
				All orders are verified by phone within 1 business day of your order being placed. A confirmation email will be
				sent to the address provided: <span
					class="text-primary font-medium mailto-user">{{ order?.customer_email }}</span><br><br>
				To check the status of your order at any time, please visit your
				<a class="text-primary font-medium" target="_blank" :href="myAccountPath"
					@click="$bus.emit('aria-announce', 'Opening My Account page in a new tab.')">
					My Account
				</a>
				page.<br>
				Please contact our office by phone if you have any questions at
				<a class="font-medium" :href="`tel:${telPhoneNumber}`" :aria-label="`Call customer service at ${phoneNumber}`"
					@click="$bus.emit('aria-announce', 'Calling customer service at ' + phoneNumber)">
					{{ phoneNumber }}
				</a><br>
				Thank you for choosing Adiamor.
			</p>
			<h3 class="font-header text-lg pt-4 leading-8 font-normal capitalize">An Important Note Regarding Email
				Confirmations:</h3>
			<p class="text-sm mt-3 mb-2">
				If you do not receive an email confirmation, please ensure that the email is not in your bulk, spam or junk mail
				folders. To avoid any unintended delays in processing your order and to continue receiving updates regarding
				your order, please add 
				<a
					class="text-primary font-medium"
					aria-label="Send email to Service at Adiamor dot com"
					@click="$bus.emit('aria-announce', 'Opening email to Service at Adiamor dot com')"
					href="mailto:Service@Adiamor.com">Service@Adiamor.com</a> to your accepted email list.
			</p>
			<h3 class="font-header text-lg pt-4 leading-8 font-normal capitalize">Save you and a friend up to $100!</h3>
			<p class="text-sm mt-3 mb-2">
				By referring a friend to Adiamor, you could both earn $100 off your next order. <br>Visit <a
					class="text-primary font-medium"
					:href="referFriendPath"
					target="_blank"
					aria-label="Refer a Friend program, opens in new tab"
					@click="$bus.emit('aria-announce', 'Opening Refer A Friend page in a new tab.')"> Refer A Friend</a> for more details.
			</p>
			<p class="text-sm mt-3 mb-2">Customer service is our top priority.</p><br>
			<hr>
			<h3 class="font-header text-lg pt-4 leading-8 font-normal capitalize">Protect Your Jewelry For All Its Worth</h3>
			<p class="text-sm mt-3 mb-2">
				<img alt="Perfect Circle Jewelry Insurance" class="float-right" role="img"
					:src="`${$config?.public?.cdnPrefix}browntemplate/education/jewelersmutual_logo.png`">
				Insuring your jewelry is quick and easy, and gives you the freedom to wear your jewelry without worry.<br>
				Jewelers Mutual provides essential worldwide repair or replacement coverage against loss, theft, damaged and
				mysterious dissappearance.<br>
				<button type="button"
					class="bg-primary w-52 m-auto text-white py-3 px-6 block text-center my-3 hover:ring-1 hover:ring-blue-600 uppercase font-gill-sans tracking-[0.125rem] text-sm"
					@click="openInsuranceQuote">
					Get A Free Quote
				</button>
			</p>
			<p class="text-sm my-8">
				If you have any questions about Jewelers Mutual's Jewelry Insurance, please email
				<a
					class="mailto-jmic text-primary"
					aria-label="Send email to personaljewelry at jminsure dot com"
					@click="$bus.emit('aria-announce', 'Opening email to Jewelers Mutual support')"
					href="mailto:personaljewelry@jminsure.com">personaljewelry@jminsure.com</a>
				or call 888.884.2424.
			</p>
			<p class="block text-xs" aria-label="Insurance disclaimer">
				*Product not available in Quebec.<br>
				Coverage and pricing are subject to underwriting review and approval, and to policy terms and conditions.<br>
				Adiamor is not a licensed agent of Jewelers Mutual Insurance Company and does not sell or recommend
				insurance.<br>
				By clicking the "Get a Free Quote" link above you authorize Jewelers Mutual to use a secure system to retrieve
				and save details of this purchase from Adiamor for the purpose of calculating an insurance quote. Retrieved
				information may include your name and address.
			</p>
		</section>
	</div>
</template>
<script setup>
import Icon from '~/components/common/Icon.vue';
import { STATIC_ROUTES } from '~/utils/staticRoutes';

const store = useMainStore();
const { $bus } = useNuxtApp();

// asyncData redirect guard moved to route middleware `thankyou` (see middleware/thankyou.js)
const order = ref(null);
const myAccountPath = STATIC_ROUTES.MY_ACCOUNT;
const referFriendPath = STATIC_ROUTES.REFER_FRIEND;

const phoneNumber = computed(() => store.phoneNumber);
const telPhoneNumber = computed(() => store.phoneNumber?.replace(/[^+\d]/g, ''));

onMounted(async () => {
	try {
		order.value = await store.getOrderedData ?? '';
		if (order.value) {
			// store.runGtmEvent({ action_type: 'purchase', txnId: order.value?.increment_id });
			emitPurchaseEventOnce(order.value?.increment_id);
			let addressObjStore = store.getAddress;
			if (!order.value?.customer_email) order.value.customer_email = addressObjStore.order_billing ? addressObjStore.order_billing.email : '';
			getRandomString();
			nextTick(() => {
				$bus.emit(
					'aria-announce',
					`Thank you for your order. Your order number is ${order.value?.increment_id}.`
				);

				// Delay so NVDA doesn't interrupt first announcement
				setTimeout(() => {
					$bus.emit(
						'aria-announce',
						`A confirmation email will be sent to ${order.value?.customer_email}. All orders are verified by phone within 1 business day.`
					);
				}, 3000);
			});
		}
	} catch (error) {
		console.log(error, 'mounted');
	}
});

onBeforeRouteLeave(() => {
	// Clear state on navigation
	store.setOrderedData(null);
	store.setCartItems([]);
});

function openInsuranceQuote() {
	$bus.emit('aria-announce', 'Opening jewelry insurance quote in a new window.');
	const params = new URLSearchParams({
		providerKey: 'adiamor',
		OrderNumber: String(order.value?.increment_id ?? ''),
		Email: String(order.value?.customer_email ?? ''),
	});
	const url = `https://my.jewelersmutual.com/jewelry-insurance-quote-apply/Express?${params}`;
	const win = window.open(url, 'pc', 'scrollbars=1,resizable=1,directories=0,height=600,width=1000');
	if (win) win.focus();
}
function getPurchaseEventStorageKey(orderId) {
	return orderId ? `gtm_purchase_sent_${orderId}` : null;
}

function emitPurchaseEventOnce(orderId) {
	if (!import.meta.client || !orderId) return;

	const storageKey = getPurchaseEventStorageKey(orderId);
	if (!storageKey || localStorage.getItem(storageKey)) return;

	store.runGtmEvent({
		action_type: 'purchase',
		txnId: orderId
	});

	localStorage.setItem(storageKey, '1');
}
async function getRandomString(n = 7) {
	useCookie('visitorCode').value = null;
	const characters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
	let randomString = '';

	for (let i = 0; i < n; i++) {
		const index = Math.floor(Math.random() * characters.length);
		randomString += characters[index];
	}

	// Set the visitorCode cookie with a 1-week expiration
	const visitorCode = useCookie('visitorCode', {
		path: STATIC_ROUTES.HOME,
		maxAge: 60 * 60 * 24 * 7, // 1 week
	});
	visitorCode.value = randomString;
	if (randomString) {
		store.setVisitorCode(randomString);
	}
}
</script>
