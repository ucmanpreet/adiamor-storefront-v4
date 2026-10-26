<template>
    <div :class="className ? className : defaultClass" role="img" aria-hidden="true">
        Sample Image</div>
</template>
<script>
export default {
 name : "SampleImage",
 props:['className'],
 computed : {
     defaultClass() {
         return "absolute bottom-0 left-0 z-10 w-full p-1 text-center text-sm opacity-40 bg-[#D2D1D4]"
     }
 }
}
</script>