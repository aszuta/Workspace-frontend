<template>
    <div class="FileInput">
        <label :for="name" class="FileInput__label">{{ label }}</label>
        <input :id="name" type="file" @change="handleFileChange" ref="file" accept="image/jpeg,image/png,image/jpg" class="FileInput__field">
    </div>
</template>

<script setup>
defineProps({
    label: String,
    name: String,
});

const emit = defineEmits(['uploaded-file']);
let file = ref('');

const handleFileChange = (fileData) => {
    const fileInputData = fileData.target;
    if(fileInputData.files && fileInputData.files?.length > 0) {
        file = fileInputData.files[0];
        emit('uploaded-file', file);
    }
};
</script>

<style lang="scss">
.FileInput {
    display: flex;
    flex-direction: column;

    &__label {
        display: inherit;
        margin: 0.5rem 0;
        font-size: 16px;
    }

    &__field {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;

        &:hover {
            border: 1px solid var(--app-border-default);
            transition: 0.3s;
        }
    }
}
</style>