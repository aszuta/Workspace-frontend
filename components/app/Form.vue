<template>
    <div :class="`AppForm AppForm--${name}`">
        <form class="AppForm__container" method="post" @submit.prevent="$emit('send')" :enctype="enctype">
            <slot></slot>
        </form>
    </div>
</template>

<script setup>
defineProps({
    name: String,
    enctype: {
        type: String,
        default: 'application/x-www-form-urlencoded',
    },
});
</script>

<style lang="scss">
.AppForm {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__container {
        margin-top: 1rem;
    }

    &--primary {
        padding: 20px;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
}

@media screen and (min-width: 768px) {
    .AppForm {
        
        &--primary {
            max-width: 600px;
            border: 2px solid var(--app-primary);
            box-shadow: 0 0 10px var(--app-primary-light);
            border-radius: 20px;
            padding: 40px;
        }
    }
}
</style>