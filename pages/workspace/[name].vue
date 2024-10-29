<template>
  <AppPage name="workspace">
    <div class="AppPage__posts">
      <Post 
        v-for="(post, index) in data?.posts" 
        :key="index" 
        :id="post.id"
        :title="post.title"
        :description="post.description"
        :createdBy="post.createdBy"
        :createdAt="post.createdAt"
      />
      <div class="AppPage__button-container">
        <button class="AppPage__button" @click="openModal()">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
      </div>
    </div>
    <PostForm v-if="isModalActive" @close="isModalActive = false" />
  </AppPage>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const api = useApi();
const route = encodeURIComponent(useRoute().params.name);
const isModalActive = ref(false);

const { data } = await useAsyncData('posts', async () => {
  const workspace = await api(`/api/workspace/${route}`);
  const posts = await api(`/api/post/${workspace.id}/${userStore.$state.userData[0].email}`);
  posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return {
    workspace,
    posts
  };
});

function openModal() {
  if(userStore.$state.isLoggedIn) isModalActive.value = !isModalActive.value;
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

  &__button {
    height: 50px;
    width: 50px;
    border: 3px solid purple;
    border-radius: 100px;
    font-size: 30px;
    transition: 0.3s;
    position: fixed;
    bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 20px;
    background-color: purple;
    color: white;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    &:hover {
      border: 3px solid #a802a8;
      background-color: #a802a8;
      transition: 0.3s;
    }
  }
}
</style>