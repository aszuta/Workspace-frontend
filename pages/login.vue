<template>
    <AppPage>
        <div class="AppPage__login-container">
            <form class="AppPage__login-form" method="post" @submit.prevent="login()">
                <h1 class="AppPage__form-title">Login</h1>
                <Input v-model="form.email" type="text" placeholder="Email" name="email" label="Email "/>
                <Input v-model="form.password" type="password" placeholder="Password" name="password" label="Password "/>
                <button class="AppPage__form-button">Login</button>
            </form>
            <div class="AppPage__info">
                <div class="AppPage__info-message">Nie masz konta?</div>
                <NuxtLink to="/register" class="AppPage__info-link">Zarejestruj się</NuxtLink>
            </div>
        </div>
    </AppPage>
</template>

<script setup>
const form = {
    email: '',
    password: '',
};
</script>

<style lang="scss">
.AppPage {

    &__login-container {
        display: inherit;
        flex-direction: column;
        width: 100%;
    }

    &__login-form {
        margin-top: 2rem;
        padding: 1rem 2rem;
    }

    &__form-title {
        text-align: center;
        font-size: 30px;
    }

    &__form-button {
        width: 100%;
        min-height: 40px;
        padding: 0.5rem 1rem;
        background-color: #bfbfbf;
        border-radius: 10px;
        color: white;
        font-size: 16px;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
            transition: 0.3s;
            background-color: #969696;
        }
    }

    &__info {
        display: inherit;
        flex-direction: inherit;
        align-items: center;
    }
}
</style>