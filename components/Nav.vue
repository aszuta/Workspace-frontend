<template>
    <header class="AppHeader">
        <div class="AppHeader__container">
            <NuxtLink v-if="userStore.$state.isLoggedIn" to="/" class="AppHeader__logo">
                <font-awesome :icon="['fas', 'house-chimney']" />
            </NuxtLink>
            <nav class="AppHeader__navigation">
                <ul class="AppHeader__navigation-list">
                    <!-- <li v-if="userStore.$state.isLoggedIn" class="AppHeader__navigation-item">{{ userStore.userData[0].name }}</li> -->
                    <li class="AppHeader__navigation-item">
                        <button v-if="userStore.$state.isLoggedIn" class="AppHeader__navigation-button" @click.prevent="logout()">
                            <font-awesome :icon="['fas', 'arrow-right-from-bracket']" />
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script setup>
import { useUserStore } from '~/store/user';

const userStore = useUserStore();
const api = useApi();

async function logout() {
    await api('/api/auth/logout', {
        method: 'post',
        credentials: 'include'
    });
    const cookie = useCookie('authcookie');
    cookie.value = null;
    reloadNuxtApp();
};
</script>

<style lang="scss">
.AppHeader {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 4rem;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;

    &__container {
        display: inherit;
        align-items: center;
        justify-content: space-between;
        max-width: 1020px;
        width: 100%;
        height: inherit;
    }

    &__logo {
        padding: 0 3vh;
        font-weight: 500;
        font-size: 20px;
        z-index: 5;
        transition: 0.3s;
        text-decoration: none;
        color: black;
        
        &:hover {
            transition: 0.3s;
            color: #5f5f5f;
        }
    }

    &__navigation {
        display: flex;
        align-items: center;
        flex-grow: 1;
        justify-content: flex-end;
    }

    &__navigation-list {
        display: inherit;
        height: 4rem;
        width: auto;
        position: fixed;
        list-style: none;
    }

    &__navigation-item {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        height: inherit;
        padding: 0 1rem;
    }

    &__navigation-button {
        background: none;
        font-size: 20px;
        cursor: pointer;
        transition: 0.3s;
        
        &:hover {
            transition: 0.3s;
            color: #5f5f5f;
        }
    }
}
</style>