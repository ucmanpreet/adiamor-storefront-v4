<template>
	<div :id="id" class="relative z-10 ml-auto"></div>
</template>
<script setup>
const props = defineProps({ amount: Number, id: String, cart: [Object, Array] });
const emit = defineEmits(['boltModalClose']);

const store = useMainStore();
const api = useApi();
const config = useRuntimeConfig().public;
const { $bus } = useNuxtApp();

const payPalId = 'paypalId';

onMounted(async () => {
	if (document.getElementById(payPalId) === null) {
		const script = document.createElement("script");
		script.src = `${config.paypalCdn}?client-id=${config.paypalClientId}&intent=${config.paypalIntent}&disable-funding=${config.paypalDisableFunding}`;
		script.async = true;
		script.defer = true;
		script.setAttribute('id', payPalId);
		script.onload = () => {
			store.setPaypalObj(paypal);
			paypal.Buttons(configHandler()).render(`#${props.id}`);
		};
		document.head.appendChild(script);
	}
});

watch(() => store.getPaypalObj, (newVal) => {
	if (document.getElementById(payPalId)) {
		let paypal = newVal;
		if (paypal && document.getElementById(props.id)?.children.length === 0) {
			paypal.Buttons(configHandler()).render(`#${props.id}`);
		}
	}
}, { deep: true });

onBeforeUnmount(() => {
	const scriptElem = document.getElementById(payPalId);
	scriptElem ? scriptElem.remove() : '';
	store.setPaypalObj('');
});

function configHandler() {
	try {
		return {
			createOrder: async (data, actions) => {
				try {
					const cartId = props.cart?.id;
					const response = await api.request('post',
						`${config.baseUrl}paypal/create-order`,
						{ body: { cart_id: cartId } }
					);
					return response.data.orderID;
				} catch (error) {
					$bus.emit("ModalCloseEvent");
					throw error;
				}
			},
			onApprove: (data, actions) => {
				$bus.emit("applyLoader");
				const cartId = props.cart?.id;
				api.request('post',
					`${config.baseUrl}paypal/authorize/${data.orderID}`, { body: { cart_id: cartId } }
				)
					.then(response => {
						try {
							let transaction = response.data;
							if (transaction) {
								let paymentJson = transaction.purchase_units[0]?.payments?.authorizations[0];
								let transactionObject = {
									transaction_id: paymentJson.id,
									authorization_id: transaction.id,
									date: paymentJson.create_time,
									amount: paymentJson.amount.value,
									payment_method: "paypal_standard"
								}

								$bus.emit("paymentResponse", transactionObject);
							}
						} catch (error) {
							emit("boltModalClose");
							$bus.emit("ModalCloseEvent");
						}
						$bus.emit("ModalCloseEvent");
					})
					.catch(error => {
						console.error(error);
						$bus.emit("ModalCloseEvent");
					});
			},
			onCancel(data) {
				// Show a cancel page, or return to cart
				$bus.emit("paypalCloseEvent");
			},
			onError(err) {
				// For example, redirect to a specific error page
				$bus.emit("paypalCloseEvent");
				$bus.emit("ModalCloseEvent");
			},
			style: {
				layout: 'horizontal',
				color: 'blue',
				shape: 'rect',
				label: 'paypal',
				height: 45
			},
			onInit(data, actions) {
			},
			onClick() {
			}
		}
	} catch (error) {
		$bus.emit("ModalCloseEvent");
	}
}
</script>