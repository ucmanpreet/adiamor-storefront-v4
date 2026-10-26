<template>
	<div class="relative py-0 min-h-[620px] flex items-center">

		<div class="max-w-7xl mx-auto w-full px-4 lg:px-24 2xl:px-8 py-6 md:py-14 relative z-10 h-full">
			<fieldset class="block max-w-lg my-auto ml-auto h-full" :key="updateFieldSet">
				<legend class="mb-6">
					<h2 class="text-2xl font-semibold space-y-2" id="account-heading">
						My Account
						<small class="font-light block text-base normal-case">{{ !showForget ? `Access your account or Create a new one` : `Forget Password?` }}</small>
					</h2>
				</legend>

				<!-- Tab list -->
				<div v-show="!showForget" role="tablist" aria-label="Account options">
					<button
						id="tab-login"
						role="tab"
						:aria-selected="tab === 'login'"
						aria-controls="signin-panel"
						:tabindex="tab === 'login' ? 0 : -1"
						@click="switchTab('login')"
						@keydown.right.prevent="switchTab('signup')"
						@keydown.left.prevent="switchTab('signup')"
						:class="['inline-flex py-3 px-8 border-b-2 font-medium', tab === 'login' ? 'text-primary border-primary' : 'border-gray-200']"
					>Sign In</button>

					<button
						id="tab-signup"
						role="tab"
						:aria-selected="tab === 'signup'"
						aria-controls="signup-panel"
						:tabindex="tab === 'signup' ? 0 : -1"
						@click="switchTab('signup')"
						@keydown.right.prevent="switchTab('login')"
						@keydown.left.prevent="switchTab('login')"
						:class="['inline-flex py-3 px-8 border-b-2 font-medium', tab === 'signup' ? 'text-primary border-primary' : 'border-gray-200']"
					>Create Account</button>
				</div>

				<!-- SIGN IN / FORGET PANEL -->
				<div
					id="signin-panel"
					role="tabpanel"
					aria-labelledby="tab-login"
					v-show="tab === 'login'"
					class="py-4 md:py-8"
				>
					<LoginForm @isForget="setForget" v-if="!showForget" :key="tab"/>
					<ForgetPassword @isForget="setForget" v-else />
				</div>

				<!-- SIGNUP PANEL -->
				<div
					id="signup-panel"
					role="tabpanel"
					aria-labelledby="tab-signup"
					v-show="tab === 'signup'"
					class="py-4 md:py-8"
				>
					<Signup @setLogin="setUpdateKey" v-if="tab === 'signup'"/>
				</div>
			</fieldset>
		</div>

		<nuxt-img provider="cdn" src="/landing-pages/heros/jewelry-wide.png?updatedAt=1746137274180" alt="login"
			aria-hidden="true"
			class="absolute inset-0 w-full h-full object-cover"/>
	</div>
</template>

<script setup>
import LoginForm from '~/components/form/auth/LoginForm.vue';
import ForgetPassword from '~/components/form/auth/ForgetPassword.vue';
import Signup from '~/components/form/auth/Signup.vue';

const { $bus } = useNuxtApp();
const route = useRoute();
const router = useRouter();

const tab = ref('login');
const showForget = ref(false);
const updateFieldSet = ref(0);

onMounted(() => {
	if (route.query.tab === 'signup') {
		switchTab('signup');
	}
});

function switchTab(newTab) {
	tab.value = newTab;
	$bus.emit('aria-announce', newTab === 'login' ? 'Sign in tab selected' : 'Create account tab selected');
	if (newTab === 'login') {
		const { query } = route;
		if (query.tab) {
			const newQuery = { ...query };
			delete newQuery.tab;
			router.replace({ query: newQuery }).catch(() => {});
		}
		// Move focus to the active tab button
		nextTick(() => {
			document.getElementById('tab-login')?.focus();
		});
	} else {
		nextTick(() => {
			document.getElementById('tab-signup')?.focus();
		});
	}
}
function setForget(val) {
	showForget.value = val;
	$bus.emit('aria-announce', val ? 'Forgot password form opened' : 'Sign in form opened');
}
function setUpdateKey() {
	updateFieldSet.value++;
	tab.value = 'login';
	$bus.emit('aria-announce', 'Signup successful. Switching to sign in form');
}
</script>
