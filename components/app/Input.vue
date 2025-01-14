<template>
    <div class="Input">
        <label :for="name" class="Input__label">{{ label }}</label>
        <input :id="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" :type="type" class="Input__field" :class="{ 'Input--error': error }">
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
    error: String,
});
</script>

<style lang="scss">
.Input {
    display: inherit;
    flex-direction: inherit;
    margin-top: 1.25rem;

    &__label {
        display: inherit;
        margin: 0.5rem 0;
        font-size: 14px;
    }

    &__field {
        border: solid 1px var(--app-border-primary);
        border-radius: 10px;
        font-size: 16px;
        padding: 0.5rem 1rem;
        min-height: 44px;
        width: 100%;

        &:focus {
            outline: none;
            border: 1px solid var(--app-primary);
            box-shadow: 0 0 10px var(--app-primary-light);
        }
    }

    &__error {
        color: rgba(var(--app-color-red) ,1);
        font-size: 14px;
        display: block;
        line-height: 20px;
        margin-top: 5px;
    }

    &--error {
        border: solid 1px rgba(var(--app-color-red) ,1);

        &:focus {
            border: 1px solid rgba(var(--app-color-red) ,1);
            box-shadow: 0 0 10px rgba(var(--app-color-red) ,1);
        }
    }
}
</style>