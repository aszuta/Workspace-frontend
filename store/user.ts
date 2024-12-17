import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            isLoggedIn: false as Boolean,
            userData: {} as Object,
        };
    },

    actions: {
        setUser(user: Object) {
            this.userData = user;
        },

        clearUser() {
            this.isLoggedIn = false;
            this.userData = [];
        }
    },
})