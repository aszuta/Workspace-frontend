<template>
    <AppModal title="Dodaj post">
        <AppForm @submit="submit()" enctype="multipart/form-data">
            <AppInput v-model="form.title" type="text" placeholder="Title" name="title" label="Tytuł "/>
            <AppInputArea v-model="form.description" type="text" placeholder="Description" name="description" label="Opis "/>
            Zdjęcie (opcjonalne)
            <div class="Modal__drop-zone">
                <font-awesome :icon="['fas', 'upload']" class="Modal__form-icon"/>
                <AppFileInput name="file" label="Dodaj zdjęcie lub przeciągnij i upuść" @uploaded-file="upload"/>
            </div>
            <AppButton type="submit">Wyślij</AppButton>
        </AppForm>
        <AppButton @click="$emit('close')" @keydown.esc="$emit('close')" name="close-dark">
            <font-awesome :icon="['fas', 'xmark']" />
        </AppButton>
    </AppModal>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const props = defineProps({
    post: {
        type: Object,
        default: () => ({}),
    },
    workspaceId: Number,
});

const api = useApi();
const route = useRoute().params.name;
const form = {
    title: props.post.title || '',
    description: props.post.description || '',
};
let file = ref('');
const url = ref('');

const upload = (data) => {
    url.value = URL.createObjectURL(data);
    file.value = data;
};

const submit = async () => {
  try {
    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('createdBy', useUserStore().userData.id);
    formData.append('email', useUserStore().userData.email);
    formData.append('picture', file.value);
    formData.append('workspaceId', props.workspaceId);

    await api('/api/post', {
        method: 'post',
        body: formData
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss">
.Modal {

    &__drop-zone {
        height: 150px;
        width: 100%;
        margin: 0.3rem 0;
        border: 1px dashed var(--app-border-primary);
        border-radius: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        position: relative;
    }

    &__form-icon {
        font-size: 2rem;
        margin-bottom: 0.7rem;
    }

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

    &__close-button {
        position: absolute;
        color: var(--app-color-close-icon);
        top: 1rem;
        right: 1rem;
        font-size: 1.6rem;
        transition: 0.3s;
        z-index: 1;
        cursor: pointer;
    
        &:hover {
            color: var(--app-color-close-icon);
            transition: 0.3s;
        }
    }
}
</style>