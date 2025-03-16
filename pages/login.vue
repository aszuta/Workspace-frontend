<template>
    <AppPage name="login">
        <AppForm @send="submit()" name="primary">
            <h1 class="AppPage__form-title">Login</h1>
            <div v-if="errorMessage" class="AppPage__form-error">{{ errorMessage }}</div>
            <AppInput v-model="form.email" type="text" name="email" label="Email "/>
            <AppInput v-model="form.password" type="password" name="password" label="Password "/>
            <AppButton name="default">Zaloguj się</AppButton>
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
const router = useRouter();
const { errors, validateLogin } = useLoginValidation();
const form = ref({
    email: '',
    password: '',
});
let errorMessage = ref('');

function submit() {
    const result = validateLogin(form.value.email, form.value.password);
    
    if(result === true) {
        login();
    } else {
        errorMessage.value = errors.value.loginError;
    }
};

async function login() {
    try {
        await api('api/auth/login', {
            method: 'post',
            credentials: 'include',
            body: form.value
        }).then(() => {
            userStore.$state.isLoggedIn = true;
            userStore.setUser(form.value.email);
            router.push('/');
        });
    } catch (error) {
        if(error.response && error.response.status === 401) {
            errorMessage.value = error.response._data.message;
        }
    }
};
</script>

<style lang="scss">
.AppPage {

    &__form-title {
        text-align: center;
        font-size: 30px;
    }

    &__form-error {
        background-color: rgba(var(--app-color-red) ,1);
        color: white;
        border: 1px solid;
        border-radius: 10px;
        padding: 1rem 2rem;
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