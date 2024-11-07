<template>
    <dialog class="Modal" @keydown.esc="$emit('close')">
        <div class="Modal__container">
            <h2 class="Modal__title">Dodaj post</h2>
            <form @submit.prevent="submit()" enctype="multipart/form-data" class="Modal__form">
                <Input v-model="form.title" type="text" placeholder="Title" name="title" label="Title "/>
                <InputArea v-model="form.description" type="text" placeholder="Description" name="description" label="Description "/>
                <FileInput name="file" @uploaded-file="upload"/>
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

const props = defineProps({
    post: {
        type: Object,
        default: () => ({}),
    },
});

const api = useApi();
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
    formData.append('createdBy', useUserStore().userData[0].id);
    formData.append('email', useUserStore().userData[0].email);
    formData.append('picture', file.value);
    formData.append('workspace_id', 1);
    console.log(formData);

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
    z-index: 10;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    display: block;
    opacity: 1;

    &__container {
        background-color: #fff;
        border-radius: 3px;
        margin: 50px auto;
        padding: 20px;
        width: inherit;
        height: inherit;
    }

    &__title {
        margin: 1rem 0;
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

    &__close-button {
        position: absolute;
        color: #414040;
        top: 1rem;
        right: 1rem;
        font-size: 1.6rem;
        transition: 0.3s;
        z-index: 1;
        cursor: pointer;
    
        &:hover {
            color: #414040;
            transition: 0.3s;
        }
    }
}

@media screen and (min-width: 768px) {
    .Modal {
        background-color: #6b6b6b;

        &__container {
            max-width: 600px;
            height: auto;
            position: relative;
        }
    }
}
</style>