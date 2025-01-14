<template>
    <AppModal title="Stwórz przestrzeń roboczą">
        <AppForm @send="submit()" enctype="multipart/form-data" class="Modal__form">
            <AppInput v-model="form.title" type="text" placeholder="Title" name="title" label="Title" :error="error"/>
            <AppButton name="default">Wyślij</AppButton>
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
const { errors, validateWorkspaceTitle } = useWorkspaceValidation();
const form = ref({
    title: '',
    owner: userStore.$state.userData.id,
});
let error = ref('');

function submit() {
    const result = validateWorkspaceTitle(form.value.title);

    if(result === true) {
        create();
    } else {
        error.value = errors.value.title;
    }
};

async function create() {
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