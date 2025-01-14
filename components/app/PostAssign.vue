<template>
    <AppModal title="Dodaj użytkownika">
        <AppForm @send="submit()" enctype="multipart/form-data">
            <AppInput v-model="form.email" type="text" placeholder="Email" name="email" label="Email " :error="error"/>
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
let error = ref('');

function submit() {
    const result = validateWorkspaceEmail(form.value.email);

    if(result === true) {
        assign();
    } else {
        error.value = errors.value.email;
    }
}

async function assign() {
    try {
        await api(`/api/post/${props.postId}/assign`, {
        method: 'post',
        body: form.value,
    });
    } catch (error) {
        console.log(error);
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

    // &__close-button {
    //     position: absolute;
    //     color: var(--app-color-close-icon);
    //     font-size: 1.6rem;
    //     transition: 0.3s;
    //     cursor: pointer;
    
    //     &:hover {
    //         color: var(--app-color-close-icon);
    //         transition: 0.3s;
    //     }
    // }
}
</style>