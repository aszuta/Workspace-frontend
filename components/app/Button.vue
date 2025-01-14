<template>
    <button :class="`Button Button--${name}`" @submit.prevent="$emit('click')" :type="type">
        <slot></slot>
    </button>
</template>

<script setup>
defineProps({
    name: String,
    type: String,
});
</script>

<style lang="scss">
.Button {
    width: 100%;
    min-height: 40px;
    padding: 0.5rem 1rem;
    margin-top: 15px;
    border-radius: 20px;
    font-size: 16px;
    transition: 0.3s;
    cursor: pointer;

    &--default {
        background-color: var(--app-primary);
        color: var(--app-bg-default);

        &:hover {
            transition: 0.3s;
            background-color: var(--app-primary-light);
        }
    }

    &--primary {
        width: 10rem;
        background-color: var(--app-primary);
        font-weight: 700;
        margin-left: 10px;
        margin-bottom: 20px;
        color: var(--app-bg-default);

        &:hover {
            background-color: var(--app-primary-light);
        }
    }

    &--secondary {
        background: none;
        border: none;
        width: 40px;
        color: var(--app-text-default);
        margin-top: 0;
        padding: 0;
        cursor: pointer;
        transition: 0.3s;
        
        &:hover {
            transition: 0.3s;
            color: var(--app-text-secondary);
            background-color: transparent;
        }
    }

    &--close-light {
        background: none;
        border: none;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        color: var(--app-color-danger);
        cursor: pointer;
        transition: color 0.3s;
        margin-top: 0;

        &:hover {
            transition: 0.3s;
            color: var(--app-color-danger-light);
            background-color: transparent;
        }
    }

    &--close-dark {
        background: none;
        border: none;
        font-size: 1.6rem;
        color: var(--app-color-close-icon);
        cursor: pointer;
        transition: color 0.3s;
        position: absolute;
        top: 0;
        right: 10px;
        width: auto;

        &:hover {
            transition: 0.3s;
            color: var(--app-text-primary);
            background-color: transparent;
        }
    }

    &--plus {
        height: 50px;
        width: 50px;
        border: 3px solid var(--app-primary);
        border-radius: 100px;
        font-size: 30px;
        transition: 0.3s;
        position: fixed;
        bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 20px;
        background-color: var(--app-primary);
        color: white;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        &:hover {
            border: 3px solid var(--app-primary-light);
            background-color: var(--app-primary-light);
            transition: 0.3s;
        }
    }

    &--logout {
        background: none;
        border: none;
        font-size: 20px;
        display: inline-flex;
        color: var(--app-text-default);
        padding: 0;
        cursor: pointer;
        transition: 0.3s;
        
        &:hover {
            transition: 0.3s;
            color: var(--app-text-secondary);
            background-color: transparent;
        }
    }
}
</style>