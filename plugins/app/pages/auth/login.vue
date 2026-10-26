<template>
    <div>
        <Login :key="$route.fullPath"/>
    </div>
</template>
<script>
import Login from '~/components/form/auth/Login.vue';
export default {
    name : 'LoginPage',
    components: { Login },
    head() {
        return {
            title: 'Create Account Login | Adiamor',
        };
    },
    mounted() {
        this.$nextTick(() => {
            this.$bus.emit(
                'aria-announce',
                'Login and account creation page loaded. Please sign in or create a new account.'
            );
        });
    }
}
</script>