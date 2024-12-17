<template>
    <AppPage name="login">
        <AppForm @submit="submit()" name="primary">
            <h1 class="AppPage__form-title">Login</h1>
            <AppInput v-model="form.email" type="text" name="email" label="Email "/>
            <AppInput v-model="form.password" type="password" name="password" label="Password "/>
            <AppButton name="default">Zaloguj się</AppButton>
            {{ error }}
            <div class="AppPage__info">
            Nie masz konta?
            <NuxtLink to="/register" class="AppPage__info-link">Zarejestruj się</NuxtLink>
        </div>
        </AppForm>
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

    &__form-title {
        text-align: center;
        font-size: 30px;
        margin-bottom: 1rem;
    }

    &__info {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 1rem;
    }

    &__info-link {
        text-decoration: none;
        color: var(--app-primary);
    }
}
</style>