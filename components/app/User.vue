<template>
    <div class="User">
        <div class="User__container">
            <div class="User__avatar">{{ userData.id }}</div>
            <div class="User__name">{{ userData.name }}</div>
            <div class="User__email">{{ userData.email }}</div>
        </div>
        <div class="AppPage__post-buttons">
            <AppButton @click="$emit('removeUser', userData)" name="close-light">
                <font-awesome :icon="['fas', 'xmark']" />
            </AppButton>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    userData: Object
});
</script>

<style lang="scss">
.User {
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px var(--app-color-underline);
    padding: 7px;

    &__container {
        display: inline-flex;
        align-items: center;
        gap: 10px;
    }

    &__avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 40px;
        width: 40px;
        background-color: gray;
        border-radius: 100px;
        color: white;
    }
}
</style>