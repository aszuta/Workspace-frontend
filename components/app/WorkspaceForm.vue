<template>
    <AppModal title="Stwórz przestrzeń roboczą">
        <AppForm @submit.prevent="submit()" enctype="multipart/form-data" class="Modal__form">
            <AppInput v-model="form.title" type="text" placeholder="Title" name="title" label="Title" />
            <button class="Modal__form-button" type="submit">Wyślij</button>
        </AppForm>
        <AppButton @click="$emit('close')" @keydown.esc="$emit('close')" name="close-dark">
            <font-awesome :icon="['fas', 'xmark']" />
        </AppButton>
    </AppModal>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const api = useApi();
const userStore = useUserStore();
const form = {
    title: '',
    owner: userStore.$state.userData.id,
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