<template>
    <!-- Decorative placeholder icon -->
    <Icon
        name="no-image"
        class="w-full h-full"
        aria-hidden="true"
        focusable="false"
    />
</template>

<script>
import Icon from "~/components/common/Icon.vue";
export default {
    name : 'NoImage',
    components: { Icon },
    props: ['className'],
    props: {
        className: {
            type: [String, Array],
            default: ''
        }
    }
}
</script>