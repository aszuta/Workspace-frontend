import { useUserStore } from '~/store/user';
import { jwtDecode, JwtPayload } from 'jwt-decode';

export default defineNuxtPlugin(() => {
    const user = useUserStore();

    if(user.isLoggedIn) {
        setInterval(async () => {
            const cookie = useCookie('authcookie')?.value;
            if(!cookie) {
                return await $fetch('/api/auth/refresh', {
                    credentials: 'include',
                });
            }

            const decodedCookie: JwtPayload = jwtDecode(cookie);
            const exp = decodedCookie.exp - 30;
            const currentDate = Date.now() / 1000;

            if(currentDate > exp) {
                await $fetch('/api/auth/refresh', {
                    credentials: 'include',
                });
            }
        }, 30000);
    }
});