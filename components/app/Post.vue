<template>
    <div class="AppPage__post-container">
        <div class="AppPage__post-header">
            <div class="AppPage__post-info">
                <div class="AppPage__post-author">{{ props.post.createdBy }}</div>
                <div class="AppPage__post-date">{{ formatDate(props.post.createdAt) }}</div>
            </div>
            <div class="AppPage__post-buttons">
                <AppButton @click="openModal()" name="secondary">
                    <font-awesome :icon="['fas', 'plus']" />
                </AppButton>
                <AppButton @click="openEdit()" name="secondary">
                    <font-awesome :icon="['fas', 'pen-to-square']" />
                </AppButton>
                <AppButton @click="openUsers()" name="secondary">
                    <font-awesome :icon="['fas', 'users']" />
                </AppButton>
                <AppButton @click="deletePost()" name="close-light">
                    <font-awesome :icon="['fas', 'xmark']" />
                </AppButton>
            </div>
        </div>
        <h2 class="AppPage__post-title">{{ props.post.title }}</h2>
        <div class="AppPage__post-description">{{ props.post.description }}</div>
        <AppPostAssign v-if="isModalActive" @close="isModalActive = false" :postId="props.post.id"/>
        <AppPostForm v-if="isEditActive" @close="isEditActive = false" :post="post"/>
        <AppPostUsers v-if="isUsersActive" @close="isUsersActive = false" :postId="props.post.id"/>
    </div>
</template>

<script setup>
const props = defineProps({
    post: Object,
});

import { useUserStore } from '~/store/user';

const post = {
    title: props.post.title,
    description: props.post.description,
};
const userStore = useUserStore();
const isModalActive = ref(false);
const isEditActive = ref(false);
const isUsersActive = ref(false);
const api = useApi();

function formatDate(data) {
    const date = new Date(data);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

function openModal() {
    if(userStore.$state.isLoggedIn) isModalActive.value = !isModalActive.value;
}

function openEdit() {
    if(userStore.$state.isLoggedIn) isEditActive.value = !isEditActive.value;
}

function openUsers() {
    if(userStore.$state.isLoggedIn) isUsersActive.value = !isUsersActive.value;
}

function deletePost() {
    try {
        api(`/api/post/${props.post.id}`, {
            method: 'delete',
        }).then(() => reloadNuxtApp());
    } catch (error) {
        console.log(error);
    }
}
</script>

<style lang="scss">
.AppPage {

    &__post-container {
        background-color: var(--app-bg-default);
        max-width: 1024px;
        width: 100%;
        padding: 10px;
    }

    &__post-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }

    &__post-info {
        display: inline-flex;
        gap: 10px;
    }

    &__post-author {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;
        background-color: gray;
        border-radius: 100px;
        color: white;
    }

    &__post-date {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: var(--app-text-primaryt);
    }

    &__post-buttons {
        display: flex;
        gap: 2px;
    }

    &__post-title {
        box-shadow: 0 1px var(--app-color-underline);
        margin-bottom: 15px;
    }

    &__post-description {
        margin-bottom: 10px;
    }
}

@media screen and (min-width: 768px) {
    .AppPage {

        &__post-container {
            width: 768px;
            border-radius: 15px;
            border: none;
        }
    }
}
</style>
