<template>
    <div class="AppPage__post-container">
        <div class="AppPage__post-header">
            <div class="AppPage__post-info">
                <div class="AppPage__post-author">{{ createdBy }}</div>
                <div class="AppPage__post-date">{{ formatDate(createdAt) }}</div>
            </div>
            <div class="AppPage__post-buttons">
                <button class="AppPage__post-button" @click="openModal()">
                    <font-awesome-icon :icon="['fas', 'plus']" />
                </button>
                <button class="AppPage__post-button" @click="openEdit()">
                    <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                </button>
                <button class="AppPage__post-button" @click="openUsers()">
                    <font-awesome-icon :icon="['fas', 'users']" />
                </button>
                <button class="AppPage__post-button AppPage__post-button--delete" @click="deletePost()">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
        </div>
        <h2 class="AppPage__post-title">{{ title }}</h2>
        <div class="AppPage__post-description">{{ description }}</div>
        <PostAssign v-if="isModalActive" @close="isModalActive = false" :postId="id"/>
        <PostForm v-if="isEditActive" @close="isEditActive = false" :post="post"/>
        <PostUsers v-if="isUsersActive" @close="isUsersActive = false" :postId="id"/>
    </div>
</template>

<script setup>
const props = defineProps({
    id: Number,
    title: String,
    description: String,
    createdBy: Number,
    createdAt: String
});

import { useUserStore } from '~/store/user';

const post = {
    title: props.title,
    description: props.description,
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
        api(`/api/post/${props.id}`, {
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
        border: 1px solid #e6e4e4;
        background-color: #ffffff;
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
        color: #969494;
    }

    &__post-buttons {
        display: flex;
        gap: 2px;
    }

    &__post-button {
        background: none;
        width: 40px;
        cursor: pointer;
        transition: 0.3s;
        font-size: 16px;

        &:hover {
            transition: 0.3s;
            color: #5f5f5f;
        }

        &--delete {
            color: #ed0e0e;

            &:hover {
                transition: 0.3s;
                color: #f75959;
            }
        }
    }

    &__post-title {
        box-shadow: 0 1px #e6e4e4;
        margin-bottom: 15px;
    }

    &__post-description {
        margin-bottom: 10px;
    }
}

@media screen and (min-width: 768px) {
    .AppPage {

        &__post-container {
            max-width: 768px;
        }
    }
}
</style>
