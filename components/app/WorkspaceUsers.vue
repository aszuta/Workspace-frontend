<template>
    <AppModal title="Przypisani użytkownicy">
        <AppUser v-for="(user, index) in assignedUsers" 
            :key="index" 
            :userData="user"
            @removeUser="remove"
        />
        <AppButton @click="$emit('close')" @keydown.esc="$emit('close')" name="close-dark">
            <font-awesome :icon="['fas', 'xmark']" />
        </AppButton>
    </AppModal>
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

function remove(userData) {
    try {
        api(`/api/workspace/${props.workspaceId}/${userData.email}`, {
            method: 'delete',
        });
    } catch (error) {
        console.log(error);
    }
}
</script>