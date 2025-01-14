<template>
    <div class="Input">
        <label :for="name" class="Input__label">{{ label }}</label>
        <textarea :id="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type" :class="[`Input__field Input__field--${name}`, { 'Input--error': error }]"></textarea>
        <span class="Input__error">{{ error }}</span>
    </div>
</template>

<script setup>
defineProps({
    label: String,
    type: String,
    name: String,
    modelValue: {
        type: String,
        default: '',
    },
    error: String
});
</script>

<style lang="scss">
.Input {
    
    &__field {

        &--description {
            min-height: 10vh;
            resize: vertical;
        }
    }
}
</style>