<template>
    <AppPage name="register">
        <AppForm @submit="submit()" name="primary">
            <h1 class="AppPage__form-title">Register</h1>
            {{ error.name }}
            <AppInput v-model="form.name" type="text" placeholder="Name" name="name" label="Name "/>
            {{ error.email }}
            <AppInput v-model="form.email" type="text" placeholder="Email" name="email" label="Email "/>
            {{ error.password }}
            <AppInput v-model="form.password" type="password" placeholder="Password" name="password" label="Password "/>
            <AppButton name="default">Zarejestruj się</AppButton>
            <div class="AppPage__info">
                Masz konto?
                <NuxtLink to="/login" class="AppPage__info-link">Zaloguj się</NuxtLink>
            </div>
        </AppForm>
    </AppPage>
</template>

<script setup>
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
    password: ''
});

function submit() {
    const result = validateRegister(form.value.name, form.value.email, form.value.password);
    
    if(result === true) {
        register();
    } else {
        error.value = {
            name: errors.value.name,
            email: errors.value.email,
            password: errors.value.password
        }
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
        console.log(error);
    }
};
</script>