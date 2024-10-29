<template>
    <div class="Input">
        <label :for="name" class="Input__label">{{ label }}</label>
        <input :id="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" :type="type" class="Input__field">
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
    placeholder: {
        type: String,
        default: '',
    },
});
</script>

<style lang="scss">
.Input {
    display: inherit;
    flex-direction: inherit;

    &__label {
        display: inherit;
        margin: 0.5rem 0;
    }

    &__field {
        border: solid 3px #f9f9fc;
        border-radius: 10px;
        padding: 0.5rem 1rem;
        min-height: 40px;
        width: 100%;
        margin-bottom: 10px;
    }
}
</style>