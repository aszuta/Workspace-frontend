<template>
    <AppPage name="register">
        <AppForm @send="submit()" name="primary">
            <h1 class="AppPage__form-title">Register</h1>
            <div v-if="errorMessage" class="AppPage__form-error">{{ errorMessage }}</div>
            <AppInput v-model="form.name" type="text" placeholder="Name" name="name" label="Name " :error="error.name"/>
            <AppInput v-model="form.email" type="text" placeholder="Email" name="email" label="Email " :error="error.email"/>
            <AppInput v-model="form.password" type="password" placeholder="Password" name="password" label="Password " :error="error.password"/>
            <AppButton name="default">Zarejestruj się</AppButton>
            <div class="AppPage__info">
                Masz konto?
                <NuxtLink to="/login" class="AppPage__info-link">Zaloguj się</NuxtLink>
            </div>
        </AppForm>
    </AppPage>
</template>

<script setup>
import { useUserStore } from '~/store/user'; 

const api = useApi();
const { errors, validateRegister } = useRegisterValidation();
const form = ref({
    name: '',
    email: '',
    password: '',
});
let error = ref({
    name: '',
    email: '',
    password: '',
    message: ''
});
let errorMessage = ref('');

function submit() {
    const result = validateRegister(form.value.name, form.value.email, form.value.password);
    
    if(result === true) {
        register();
    } else {
        error.value = {
            name: errors.value.name,
            email: errors.value.email,
            password: errors.value.password
        };
    }
};

async function register() {
    try {
        await api('/api/register', {
            method: 'post',
            body: form.value,
        }).then(() => {
            useUserStore().isLoggedIn = true;
            navigateTo('/');
        });
    } catch (error) {
        if(error.response && error.response.status === 409) {
            errorMessage.value = error.response._data.message;
        }
    }
};
</script>