<template>
    <main :class="`AppPage AppPage--${name}`">
        <slot></slot>
    </main>
</template>

<script setup>
defineProps({
    name: String
});
</script>

<style lang="scss">
.AppPage {
    display: flex;
    justify-content: center;

    &--login {
        align-items: center;
        height: 100vh;
    }

    &--register {
        align-items: center;
        height: 100vh;
    }

    &--home {
        padding-top: 3rem;
    }

    &--workspace {
        padding-top: 5rem;
    }
}
</style>