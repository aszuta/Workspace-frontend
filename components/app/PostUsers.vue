<template>
    <AppModal title="Przypisani użytkownicy">
        <AppUser v-for="(user, index) in assignedUsers" 
            :key="index" 
            :userData="user"
            @removeUser="remove"
        />
        <div class="Modal__close-button" @click="$emit('close')" @keydown.esc="$emit('close')" >
            <font-awesome :icon="['fas', 'xmark']" />
        </div>
    </AppModal>
</template>

<script setup>
const props = defineProps({
    postId: Number,
    workspaceId: Number,
});

const api = useApi();
let assignedUsers = ref('');

onMounted(async () => {
    const users = await api(`/api/post/${props.postId}`);
    assignedUsers.value = users;
});

function remove(userData) {
    try {
        api(`/api/post/${props.workspaceId}/${userData.email}`, {
            method: 'delete',
        });
    } catch (error) {
        console.log(error);
    }
}
</script>