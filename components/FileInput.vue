<template>
    <div>
        <label :for="name"></label>
        <input :id="name" type="file" @change="handleFileChange" ref="file" accept="image/jpeg,image/png,image/jpg">
    </div>
</template>

<script setup>
defineProps({
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