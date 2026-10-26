<template>
    <div>
        <Login :key="$route.fullPath"/>
    </div>
</template>
<script setup>
import Login from '~/components/form/auth/Login.vue';

const { $bus } = useNuxtApp();

useHead({ title: 'Create Account Login | Adiamor' });

onMounted(() => {
    nextTick(() => {
        $bus.emit(
            'aria-announce',
            'Login and account creation page loaded. Please sign in or create a new account.'
        );
    });
});
</script>