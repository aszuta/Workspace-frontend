<template>
    <dialog class="Modal" @keydown.esc="$emit('close')">
        <div class="Modal__container">
            <h2 class="Modal__title">Przypisani użytkownicy</h2>
            <User v-for="(user, index) in assignedUsers" 
                :key="index" 
                :id="user.id" 
                :name="user.name" 
                :email="user.email"
                :postId="props.postId"
            />
            <div class="Modal__close-button" @click="$emit('close')" @keydown.esc="$emit('close')" >
                <font-awesome-icon :icon="['fas', 'xmark']" />
            </div>
        </div>
    </dialog>
</template>

<script setup>
const props = defineProps({
    workspaceId: Number,
});

const api = useApi();
let assignedUsers = ref('');

onMounted(async () => {
    const users = await api(`/api/workspace/users/${props.workspaceId}`);
    assignedUsers.value = users;
});
</script>