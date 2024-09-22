<template>
    <AppPage name="home">
        <div class="AppPage__container">
            <h1 class="AppPage__title">Twoje workspace</h1>
            <div class="AppPage__boards">
                <Board v-for="(title, index ) in titles" :key="index" :text="title"/>
                <button class="AppPage__button">+</button>
            </div>
        </div>
    </AppPage>   
</template>

<script setup>
const titles = [
  "Marketing Team",
  "Development Hub",
  "Design Studio",
  "Sales Operations",
  "Product Management",
  "Support Center",
  "Finance",
  "HR Workspace"
];
</script>

<style lang="scss">
.AppPage {

    &__container {
        max-width: 1440px;
        width: 100%;
        margin: 0 1rem 2rem;
    }

    &__title {
        padding-top: 4rem;
    }

    &__boards {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 1rem;
    }

    &__button {
        height: 100px;
        border: 3px solid purple;
        border-radius: 10px;
        font-size: 30px;
        color: purple;
        background: none;
    }
}
</style>