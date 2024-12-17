<template>
    <div class="Error">
        <Nav />
        <main class="Error__error-container">
            <p class="Error__status-code">{{ error.statusCode }}</p>
            <h1 v-if="error.statusCode === 404" class="Error__title">Strona nie została znaleziona</h1>
            <h1 v-else class="Error__title">Wystąpił błąd</h1>
            <nuxt-link to="/" class="Error__button">Wróć na stronę główną</nuxt-link>
        </main>
    </div>
</template>

<script setup>
defineProps({
    error: Object,
});
</script>

<style lang="scss">
.Error {
    width: 100%;
    min-height: 100vh;
    background-color: var(--app-bg-primary);

    &__error-container {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        flex-direction: column;
        height: 100vh;
    }

    &__status-code {
        color: var(--app-primary);
        font-weight: 900;
        font-size: 30px;
    }

    &__title {
        font-size: 50px;
        margin-bottom: 1rem;
    }

    &__button {
        font-size: 18px;
        font-weight: 500;
        color: var(--app-primary);

        &:hover {
            color: var(--app-primary-light);
        }
    }
}
</style>