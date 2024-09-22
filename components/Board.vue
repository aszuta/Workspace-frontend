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
    height: 100px;
    display: inline-flex;

    &__container {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid black;
        border-radius: 10px;
        padding: 10px;
        width: 100%;
        height: 100%;
        transition: 0.3s ease-in-out;

        &:hover {
            border: 3px solid purple;
            background-color: rgb(185, 10, 185);
            color: white;
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