<template>
    <AppModal title="Dodaj post">
        <AppForm @send="submit()" enctype="multipart/form-data">
            <AppInput v-model="form.title" type="text" placeholder="Title" name="title" label="Tytuł " :error="error.title"/>
            <AppInputArea v-model="form.description" type="text" placeholder="Description" name="description" label="Opis " :error="error.description"/>
            <span class="Modal__drop-zone-title">Zdjęcie (opcjonalne)</span>
            <div class="Modal__drop-zone" v-if="!file">
                <font-awesome :icon="['fas', 'upload']" class="Modal__form-icon"/>
                <AppFileInput name="file" label="Dodaj zdjęcie lub przeciągnij i upuść" @uploaded-file="upload"/>
            </div>
            <div class="Modal__picture-preview" v-if="file">
                    <img :src="url" class="Modal__preview-img" />
                </div>
            <div class="Modal__buttons">
                <AppButton name="default" @click="reset()" type="reset">Reset</AppButton>
                <AppButton name="default" type="submit">Wyślij</AppButton>
            </div>
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
const form = ref({
    title: props.post.title || '',
    description: props.post.description || '',
});
let file = ref('');
const url = ref('');
const { errors, validatePost } = usePostValidation();
const emit = defineEmits(['postAdded', 'close']);
const hasUnsavedChanges = ref(false);
let error = ref({
    title: '',
    description: ''
});

watch(form, (newValue) => {
    hasUnsavedChanges.value = true;
    if(newValue.title === '' && newValue.description === '') hasUnsavedChanges.value = false;
}, { deep: true });

onBeforeRouteLeave((to, from, next) => {
    if(hasUnsavedChanges.value) {
        const confirmLeave = window.confirm("Masz niezapisane zmiany. Czy na pewno chcesz opuścić stronę?");

        if(!confirmLeave) {
            next(false);
        } else {
            next();
        }
    } else {
        next();
    }
});

const beforeUnloadHandler = (event) => {
  if (hasUnsavedChanges.value) {
    event.preventDefault();
    event.returnValue = '';
  }
};

onMounted(() => {
  window.addEventListener("beforeunload", beforeUnloadHandler);
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", beforeUnloadHandler);
});

const isEdit = computed(() => {
    return !! props.post.id;
});

const currentWorkspaceId = computed(() => {
    return props.workspaceId || props.post.workspaceId || null;
});

const upload = (data) => {
    url.value = URL.createObjectURL(data);
    file.value = data;
};

const reset = () => {
    form.value.title = '';
    form.value.description = '';
    file.value = '';
};

const submit = () => {
    const result = validatePost(form.value.title, form.value.description);

    if(result === true) {
        isEdit.value === true ? editPost() : sendPost();
        hasUnsavedChanges.value = false;
        emit('postAdded');

    } else {
        error.value = {
            title: errors.value.title,
            description: errors.value.description
        };
    }
};

const sendPost = async () => {
    try {
        const formData = new FormData();
        formData.append('title', form.value.title);
        formData.append('description', form.value.description);
        formData.append('createdBy', useUserStore().userData.id);
        formData.append('email', useUserStore().userData.email);
        formData.append('picture', file.value);
        formData.append('workspaceId', currentWorkspaceId.value);

        await api('/api/post', {
            method: 'post',
            body: formData
        }).then(() => reloadNuxtApp());
    } catch (error) {
        console.log(error);
    }
};

const editPost = async () => {
    try {
        const formData = new FormData();
        formData.append('title', form.value.title);
        formData.append('description', form.value.description);
        formData.append('picture', file.value);
        formData.append('workspaceId', currentWorkspaceId.value);

        await api(`/api/post/${props.post.id}`, {
            method: 'patch',
            body: formData
        }).then(() => reloadNuxtApp());
    } catch (error) {
        console.log(error);
    }
};
</script>

<style lang="scss">
.Modal {

    &__drop-zone-title {
        font-size: 14px;
    }

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

    &__picture-preview {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 1.3rem 0;
        border: 2px solid #fff;
        transition: 0.3s;
    }

    &__preview-img {
        width: 100%;
    }

    &__buttons {
        display: flex;
        justify-content: space-between;
        gap: 10px;
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