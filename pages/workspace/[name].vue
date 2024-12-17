<template>
  <AppPage name="workspace">
    <div class="AppPage__posts">
      <AppButton @click="openUsers()" name="primary">Członkowie</AppButton>
      <AppPost 
        v-for="(post, index) in data?.posts" 
        :key="index" 
        :post="post"
      />
      <div class="AppPage__button-container">
        <AppButton class="AppPage__button" @click="openModal()" name="plus">
          <font-awesome :icon="['fas', 'plus']" />
        </AppButton>
      </div>
    </div>
    <AppPostForm v-if="isModalActive" @close="isModalActive = false" :workspaceId="data?.workspace.id"/>
    <AppWorkspaceUsers v-if="isUsersActive" @close="isUsersActive = false" :workspaceId="data?.workspace.id"/>
  </AppPage>
</template>

<script setup>
import { useUserStore } from '~/store/user';

definePageMeta({
    middleware:['auth'],
});

const userStore = useUserStore();
const api = useApi();
const route = encodeURIComponent(useRoute().params.name);
const isModalActive = ref(false);
const isUsersActive = ref(false);

const { data } = await useAsyncData('posts', async () => {
  const workspace = await api(`/api/workspace/${route}`);
  const posts = await api(`/api/post/${workspace.id}/${userStore.$state.userData.email}`);
  return {
    workspace,
    posts
  };
});

function openModal() {
  if(userStore.$state.isLoggedIn) isModalActive.value = !isModalActive.value;
}

function openUsers() {
    if(userStore.$state.isLoggedIn) isUsersActive.value = !isUsersActive.value;
}
</script>

<style lang="scss">
.AppPage {

  &__posts {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0 0 2rem;
    padding-bottom: 3rem;
  }

  &__button-container {
    display: flex;
    justify-content: center;
    position: sticky;
  }
}
</style>