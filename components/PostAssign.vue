<template>
    <dialog class="Modal" @keydown.esc="$emit('close')">
        <div class="Modal__container">
            <h2 class="Modal__title">Dodaj użytkownika</h2>
            <form @submit.prevent="submit()" enctype="multipart/form-data" class="Modal__form">
                <Input v-model="form.email" type="text" placeholder="Email" name="email" label="Email "/>
                <button class="Modal__form-button" type="submit">Wyślij</button>
            </form>
            <div class="Modal__close-button" @click="$emit('close')" @keydown.esc="$emit('close')" >
                <font-awesome :icon="['fas', 'xmark']" />
            </div>
        </div>
    </dialog>
</template>

<script setup>
const props = defineProps({
    postId: Number,
});

const api = useApi();
const form = ref({
    email: '',
});

async function submit() {
    try {
        await api(`/api/post/${props.postId}/assign`, {
        method: 'post',
        body: form.value,
    });
    } catch (error) {
        console.log(error);
    }
};
</script>

<style lang="scss">
.Modal {
    z-index: 10;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    top: 0;
    left: 0;
    display: block;
    opacity: 1;

    &__container {
        background-color: #fff;
        border-radius: 10px;
        margin: 50px auto;
        padding: 20px;
        width: inherit;
        height: inherit;
    }

    &__title {
        margin: 1rem 0;
    }

    &__form-button {
        width: 100%;
        min-height: 40px;
        padding: 0.5rem 1rem;
        background-color: #a33e8c;
        border-radius: 20px;
        color: white;
        font-size: 16px;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
            transition: 0.3s;
            background-color: #ba49a1;
        }
    }

    &__close-button {
        position: absolute;
        color: #414040;
        font-size: 1.6rem;
        transition: 0.3s;
        cursor: pointer;
    
        &:hover {
            color: #414040;
            transition: 0.3s;
        }
    }
}
</style>