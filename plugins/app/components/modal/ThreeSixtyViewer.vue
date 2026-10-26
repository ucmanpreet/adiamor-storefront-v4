<template>
        <Modal @close="closeModal" maxWidthClass="max-w-2xl" aria-modal="true" role="dialog">
            <div  class="flex items-center justify-center w-full" role="region" aria-label="3D product model viewer">
                <model-viewer ref="modelViewer" id="primary-model-viewer" loading="eager" camera-controls touch-action="pan-y" auto-rotate :src="modelPath" :poster="frontViewPath" tone-mapping="aces"
                shadow-intensity="1" alt="A 3D model of a shishkebab" tabindex="0" aria-describedby="model-viewer-instructions"></model-viewer>
            </div>
            <!-- Screen reader instructions -->
            <p id="model-viewer-instructions" class="sr-only">
                Use mouse, touch, or arrow keys to rotate the 3D model. Use tab to navigate controls.
            </p>
        </Modal>
</template>

<script>
import Modal from '~/components/ui/Modal.vue';
export default {
    name : 'ThreeSixtyViewer',
    components: { Modal },
    props: ['frontViewPath', 'modelPath'],
    async mounted() {
        this.begin();
    },
    methods: {
        async begin() {
            const modelViewer = document?.querySelector("model-viewer#primary-model-viewer");

            modelViewer.addEventListener("load", (ev) => {

                modelViewer.exposure = 2.0;

                modelViewer.model.materials.forEach(function (material, i) {
                    if (material.name.toLowerCase().indexOf("gold") > -1 &&
                        material.name.toLowerCase().indexOf("#") > -1) { //incorrect textures on layers with # symbol, hide them
                        material.setAlphaMode("BLEND");
                        material.occlusionTexture.setTexture(null);
                        material.pbrMetallicRoughness.setBaseColorFactor([0, 0, 0, 0.0]);
                    }
                    else if (material.name.toLowerCase().indexOf("gold") > -1) {
                        material.pbrMetallicRoughness.setMetallicFactor(1.0);
                        material.pbrMetallicRoughness.setRoughnessFactor(0.05);
                        material.pbrMetallicRoughness.setBaseColorFactor("#ffd666");
                    }
                    else if (material.name.toLowerCase().indexOf("diamond") > -1) {
                        material.setAlphaMode("BLEND");
                        material.setDoubleSided(true);
                        material.pbrMetallicRoughness.setMetallicFactor(0.6);
                        material.pbrMetallicRoughness.setRoughnessFactor(0.4);
                        material.pbrMetallicRoughness.setBaseColorFactor([1, 1, 1, 0.6]);
                        material.setThicknessFactor(0.1);
                        material.occlusionTexture.setTexture(null);
                    }
                });
            });
        },
        dismissPoster() {
            this.$refs.modelViewer.dismissPoster();
        },
        closeModal() {
            this.$emit("close");
            if (this.$refs.modelViewer) this.$refs.modelViewer.dismissPoster();
        }
    }
};
</script>
<style scoped>
model-viewer {
    width: 621px;
    height: 621px;
}
</style>