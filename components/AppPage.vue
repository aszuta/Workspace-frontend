<template>
    <main class="AppPage">
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
}
</style>