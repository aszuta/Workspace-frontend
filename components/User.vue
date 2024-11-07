<template>
    <div class="User">
        <div class="User__container">
            <div class="User__avatar">{{ id }}</div>
            <div class="User__name">{{ name }}</div>
            <div class="User__email">{{ email }}</div>
        </div>
        <div class="AppPage__post-buttons">
            <button class="User__button User__button--delete" @click="removeUser()">
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    id: Number,
    name: String,
    email: String,
    postId: Number,
});

const api = useApi();

function removeUser() {
    try {
        api(`/api/post/${props.postId}/${props.email}`, {
            method: 'delete',
        });
    } catch (error) {
        console.log(error);
    }
}
</script>

<style lang="scss">
.User {
    display: flex;
    justify-content: space-between;
    box-shadow: 0 1px #e6e4e4;
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

    &__button {
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
}
</style>