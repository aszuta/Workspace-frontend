<template>
    <header class="AppHeader">
        <div class="AppHeader__container">
            <NuxtLink v-if="userStore.$state.isLoggedIn" to="/" class="AppHeader__logo">
                <font-awesome :icon="['fas', 'house-chimney']" />
            </NuxtLink>
            <nav class="AppHeader__navigation">
                <ul class="AppHeader__navigation-list">
                    <li v-if="userStore.$state.isLoggedIn" class="AppHeader__navigation-item">{{ userStore.userData.name }}</li>
                    <li class="AppHeader__navigation-item">
                        <AppButton v-if="userStore.$state.isLoggedIn" @click.prevent="logout()" name="logout">
                            <font-awesome :icon="['fas', 'arrow-right-from-bracket']" />
                        </AppButton>
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
const router = useRouter();

async function logout() {
    await api('/api/auth/logout', {
        method: 'post',
        credentials: 'include'
    });
    const cookie = useCookie('authcookie');
    cookie.value = null;
    userStore.clearUser();
    router.push('/login');
};
</script>

<style lang="scss">
.AppHeader {
    display: flex;
    justify-content: center;
    background-color: var(--app-bg-primary);
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
        color: var(--app-text-default);
        
        &:hover {
            transition: 0.3s;
            color: var(--app-text-secondary);
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
}
</style>