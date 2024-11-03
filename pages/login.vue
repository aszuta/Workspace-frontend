<template>
    <AppPage name="login">
        <div class="AppPage__login-container">
            <form class="AppPage__login-form" method="post" @submit.prevent="submit()">
                <h1 class="AppPage__form-title">Login</h1>
                <Input v-model="form.email" type="text" name="email" label="Email "/>
                <Input v-model="form.password" type="password" name="password" label="Password "/>
                <button class="AppPage__form-button">Zaloguj się</button>
                {{ error }}
            </form>
            <div class="AppPage__info">
                Nie masz konta?
                <NuxtLink to="/register" class="AppPage__info-link">Zarejestruj się</NuxtLink>
            </div>
        </div>
    </AppPage>
</template>

<script setup>
import { useUserStore } from '~/store/user'; 

const api = useApi();
const userStore = useUserStore();
const { errors, validateLogin } = useLoginValidation();
const form = ref({
    email: '',
    password: '',
});
let error = ref('');

function submit() {
    const result = validateLogin(form.value.email, form.value.password);
    
    if(result === true) {
        login();
    } else {
        error.value = errors.value.loginError;
    }
};

async function login() {
    try {
        console.log(form);
        await api('api/auth/login', {
            method: 'post',
            body: form.value
        }).then(() => {
            userStore.$state.isLoggedIn = true;
            navigateTo('/');
        });
    } catch (error) {
        console.log(error);
    }
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
        padding: 1rem 2rem;
    }

    &__form-title {
        text-align: center;
        font-size: 30px;
        margin-bottom: 1rem;
    }

    &__form-button {
        width: 100%;
        min-height: 40px;
        padding: 0.5rem 1rem;
        background-color: #a33e8c;
        border-radius: 20px;
        color: white;
        font-size: 16px;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
            transition: 0.3s;
            background-color: #ba49a1;
        }
    }

    &__info {
        display: inherit;
        flex-direction: inherit;
        align-items: center;
    }

    &__info-link {
        text-decoration: none;
        color: #a33e8c;
    }
}
</style>