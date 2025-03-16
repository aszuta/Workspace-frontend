<template>
    <div class="Board">
        <div class="Board__container">
            <NuxtLink :to="`/workspace/${text}`" class="Board__title">{{ text }}</NuxtLink>
            <div class="AppPage__post-buttons">
                <AppButton @click="deleteWorkspace()" name="close-light">
                    <font-awesome :icon="['fas', 'xmark']" />
                </AppButton>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    workspaceId: Number,
    text: String,
});

const api = useApi();

function deleteWorkspace() {
    try {
        api(`api/workspace/${props.workspaceId}`, {
            method: 'delete',
        }).then(() => reloadNuxtApp());
    } catch (error) {
        console.log(error);
    }
};
</script>

<style lang="scss">
.Board {
    height: 75px;
    display: inline-flex;

    &__container {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 3px solid var(--app-bg-default);
        border-radius: 10px;
        background-color: var(--app-bg-default);
        padding: 10px;
        width: 100%;
        height: 100%;
        transition: 0.3s ease-in-out;
    }

    &__title {
        font-size: 16px;
        font-weight: 600;
        color: inherit;
        width: 100%;
        height: 100%;
    }
}

@media screen and (min-width: 1024px) {
    .Board {

        &__container {

            &:hover {
                box-shadow: 3px 3px 6px var(--app-border-light);
                cursor: pointer;
            }
        }
    }
}
</style>