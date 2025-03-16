<template>
    <AppModal title="Dodaj użytkownika">
        <AppForm @send="submit()" enctype="multipart/form-data">
            <AppInput v-model="form.email" type="text" placeholder="Email" name="email" label="Email " :error="errorMessage"/>
            <AppButton name="default">Wyślij</AppButton>
        </AppForm>
        <AppButton @click="$emit('close')" @keydown.esc="$emit('close')" name="close-dark">
            <font-awesome :icon="['fas', 'xmark']" />
        </AppButton>
    </AppModal>
</template>

<script setup>
const props = defineProps({
    postId: Number,
});

const api = useApi();
const { errors, validateWorkspaceEmail } = useWorkspaceValidation();
const form = ref({
    email: '',
});
let errorMessage = ref('');

function submit() {
    const result = validateWorkspaceEmail(form.value.email);

    if(result === true) {
        assign();
    } else {
        errorMessage.value = errors.value.email;
    }
}

async function assign() {
    try {
        await api(`/api/post/${props.postId}/assign`, {
        method: 'post',
        body: form.value,
    });
    } catch (error) {
        if(error.response && error.response.status === 409) {
            errorMessage.value = error.response._data.message;
        }
    }
};
</script>

<style lang="scss">
.Modal {

    &__form-button {
        width: 100%;
        min-height: 40px;
        padding: 0.5rem 1rem;
        background-color: var(--app-primary);
        border-radius: 20px;
        color: var(--app-bg-default);
        font-size: 16px;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
            transition: 0.3s;
            background-color: var(--app-primary-light);
        }
    }
}
</style>