<template>
    <dialog class="Modal" @click.self="$emit('close')">
        <div class="Modal__container">
            <h2 class="Modal__title">{{ title }}</h2>
            <slot></slot>
        </div>
    </dialog>
</template>

<script setup>
defineProps({
    title: String,
});
</script>

<style lang="scss">
.Modal {
    z-index: 10;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    display: block;
    opacity: 1;

    &__container {
        background-color: var(--app-bg-default);
        border-radius: 10px;
        margin: 50px auto;
        padding: 20px;
        width: inherit;
        height: inherit;
    }

    &__title {
        margin: 1rem 0;
    }
}

@media screen and (min-width: 768px) {
    .Modal {
        background-color: var(--app-bg-modal);

        &__container {
            max-width: 600px;
            height: auto;
            position: relative;
        }
    }
}
</style>