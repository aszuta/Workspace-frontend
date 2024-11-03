<template>
    <AppPage name="home">
        <div class="AppPage__workspace-container">
            <h1 class="AppPage__title">Twoje workspace</h1>
            <div class="AppPage__boards">
                <Board v-for="(workspace, index ) in workspaces" :key="index" :text="workspace.title"/>
                <div class="AppPage__button-container">
                    <button class="AppPage__button" @click="openModal()">
                        <font-awesome-icon :icon="['fas', 'plus']" />
                    </button>
                </div>
            </div>
        </div>
        <WorkspaceForm v-if="isModalActive" @close="isModalActive = false" />
    </AppPage>   
</template>

<script setup>
import { useUserStore } from '~/store/user';

definePageMeta({
    middleware:['auth'],
});

const api = useApi();
const userStore = useUserStore();
const isModalActive = ref(false);

const { data: workspaces } = useAsyncData('workspaces', async () => {
    return await api(`/api/workspace/user/${userStore.$state.userData[0].email}`);
});

function openModal() {
    if(userStore.$state.isLoggedIn) isModalActive.value = !isModalActive.value;
};
</script>

<style lang="scss">
.AppPage {

    &__workspace-container {
        max-width: 1440px;
        width: 100%;
        margin: 0 1rem 2rem;
    }

    &__title {
        padding-top: 4rem;
    }

    &__boards {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 1rem;
        margin-bottom: 3rem;
    }

    &__button-container {
        display: flex;
        justify-content: center;
        position: sticky;
    }

    &__button {
        height: 50px;
        width: 50px;
        border: 3px solid #a33e8c;
        border-radius: 100px;
        font-size: 30px;
        transition: 0.3s;
        position: fixed;
        bottom: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 20px;
        background-color: #a33e8c;
        color: white;
        cursor: pointer;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

        &:hover {
            border: 3px solid #ba49a1;
            background-color: #ba49a1;
            transition: 0.3s;
        }
    }
}
</style>