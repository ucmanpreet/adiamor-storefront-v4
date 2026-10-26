<template>
	<div :id="id" class="relative z-10 ml-auto"></div>
</template>
<script>
	export default {
		name : "PaypalPayment",
		data() { return { payPalId: 'paypalId' } },
		async mounted() {
			if (document.getElementById(this.payPalId) === null) {
				const script = document.createElement("script");
				script.src = `${this.$config.public.paypalCdn}?client-id=${this.$config.public.paypalClientId}&intent=${this.$config.public.paypalIntent}&disable-funding=${this.$config.public.paypalDisableFunding}`;
				script.async = true;
				script.defer = true;
				script.setAttribute('id', this.payPalId);
				script.onload = () => {
					this.$store.commit('setPaypalObj', paypal);
					paypal.Buttons(this.configHandler()).render(`#${this.id}`);
				};
				document.head.appendChild(script);
			}
		},
		watch: {
			'$store.getters.getPaypalObj': {
				deep: true,
				handler(newVal) {
					if (document.getElementById(this.payPalId)) {
						let paypal = newVal;
						if (paypal && document.getElementById(this.id)?.children.length === 0) {
							paypal.Buttons(this.configHandler()).render(`#${this.id}`);
						}
					}
				}
			}
		},
		props: { amount: Number, id: String, cart : [ Object, Array ] },
		methods: {
			configHandler() {
				try {
					return {
					createOrder: async (data, actions) => {
						try {
							const cartId = this.cart?.id;
							const response = await this.$axios.post(
								`${this.$config.public.baseUrl}paypal/create-order`,
								{ cart_id : cartId }
							);
							return response.data.orderID;
						} catch (error) {
							$bus.emit("ModalCloseEvent");
							throw error;
						}
					},
					onApprove: (data, actions) => {
						$bus.emit("applyLoader");
						const cartId = this.cart?.id;
						this.$axios.post(
							`${this.$config.public.baseUrl}paypal/authorize/${data.orderID}`, { cart_id : cartId }
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
									this.$emit("boltModalClose");
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
					this.$bus.emit("ModalCloseEvent");
				}
			}
		},
		beforeUnmount() {
			const scriptElem = document.getElementById(this.payPalId);
			scriptElem ? scriptElem.remove() : '';
			this.$store.commit('setPaypalObj', '');
		}
	};
</script>