<template>
    <div class="Board">
        <div class="Board__container">
            <NuxtLink :to="`/workspace/${text}`" class="Board__title">{{ text }}</NuxtLink>
        </div>
    </div>
</template>

<script setup>
defineProps({
    text: String,
});
</script>

<style lang="scss">
.Board {
    height: 75px;
    display: inline-flex;

    &__container {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid var(--app-bg-default);
        border-radius: 10px;
        background-color: var(--app-bg-default);
        padding: 10px;
        width: 100%;
        height: 100%;
        transition: 0.3s ease-in-out;

        &:hover {
            box-shadow: 3px 3px 6px var(--app-border-light);
            cursor: pointer;
        }
    }

    &__title {
        font-size: 16px;
        font-weight: 600;
        color: inherit;
        width: 100%;
        height: 100%;
    }
}
</style>