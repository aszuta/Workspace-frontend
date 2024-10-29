<template>
    <dialog class="Modal" @keydown.esc="$emit('close')">
        <div class="Modal__container">
            <h2 class="Modal__title">Stwórz workspace</h2>
            <form @submit.prevent="submit()" enctype="multipart/form-data" class="Modal__form">
                <Input v-model="form.title" type="text" placeholder="Title" name="title" label="Title" />
                <button class="Modal__form-button" type="submit">Wyślij</button>
            </form>
            <div class="Modal__close-button" @click="$emit('close')" @keydown.esc="$emit('close')" >
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </div>
        </div>
    </dialog>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const api = useApi();
const userStore = useUserStore();
const form = {
    title: '',
    owner: userStore.$state.userData[0].id,
    email: userStore.$state.userData[0].email,
};

async function submit() {
    try {
        await api('api/workspace', {
            method: 'post',
            body: form
        }).then(() => reloadNuxtApp());
    } catch (error) {
        console.log(error);
    }
}
</script>