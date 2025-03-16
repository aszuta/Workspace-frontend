<template>
     <AppPage name="home">
        <div class="AppPage__workspace-container">
            <div class="AppPage_workspace_header">
                <h1 class="AppPage__title">Twoje workspace</h1>
                <div class="AppPage__button-container">
                    <AppButton class="AppPage__button" @click="openModal()" name="plus">
                        <font-awesome :icon="['fas', 'plus']" />
                    </AppButton>
                </div>
            </div>
            <div class="AppPage__boards">
                <AppBoard v-for="(workspace, index ) in workspaces" :key="index" :workspaceId="workspace.id" :text="workspace.title"/>
            </div>
        </div>
        <AppWorkspaceForm v-if="isModalActive" @close="isModalActive = false" />
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
    return await api(`/api/workspace/user/${userStore.$state.userData.email || userStore.$state.userData}`);
});;

function openModal() {
    if(userStore.$state.isLoggedIn) isModalActive.value = !isModalActive.value;
};

if(userStore.isLoggedIn) reloadNuxtApp();
</script>
s
<style lang="scss">
.AppPage {

    &__workspace-container {
        width: 100%;
        margin: 0 1rem 2rem;
    }

    &__workspace-header {
        display: flex;
        justify-content: space-between;
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
}

@media screen and (min-width: 1024px) {
    .AppPage {

        &__workspace-container {
            max-width: 1440px;
        }
    }
}
</style>