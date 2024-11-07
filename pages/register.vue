<template>
    <AppPage name="register">
        <div class="AppPage__register-container">
            <form class="AppPage__register-form" method="post" @submit.prevent="submit()">
                <h1 class="AppPage__form-title">Register</h1>
                {{ error.name }}
                <Input v-model="form.name" type="text" placeholder="Name" name="name" label="Name "/>
                {{ error.email }}
                <Input v-model="form.email" type="text" placeholder="Email" name="email" label="Email "/>
                {{ error.password }}
                <Input v-model="form.password" type="password" placeholder="Password" name="password" label="Password "/>
                <button class="AppPage__form-button">Zarejestruj się</button>
            </form>
            <div class="AppPage__info">
                Masz konto?
                <NuxtLink to="/login" class="AppPage__info-link">Zaloguj się</NuxtLink>
            </div>
        </div>
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
        console.log(form.value);
        await api('/api/user', {
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

<style lang="scss">
.AppPage {

    &__register-container {
        display: inherit;
        flex-direction: column;
        width: 100%;
    }

    &__register-form {
        margin-top: 2rem;
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

@media screen and (min-width: 768px) {
    .AppPage {

        &__register-container {
            max-width: 600px;
            border: 2px solid #a33e8c;
            box-shadow: 0 0 10px #ba49a1;
            border-radius: 20px;
            padding: 40px;
        }
    }
}
</style>