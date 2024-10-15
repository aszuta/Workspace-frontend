export const useRegisterValidation = () => {
    const errors = ref<{ name: string, email: string, password: string }>({
        name: '',
        email: '',
        password: ''
    });

    const validateRegister = (name: string, email: string, password: string) => {
        const emailRegExp: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(name === '' || undefined) {
            errors.value.name = 'Wymagana jest nazwa użytkownika.';
        } else if(name.length < 3) {
            errors.value.name = 'Nazwa użytkownika powinna zawierać przynajmniej 3 litery.'
        }

        if(email === '' || undefined) {
            errors.value.email = 'Wymagany jest email.';
        } else if(!emailRegExp.test(email)) {
            errors.value.email = 'Niepoprawny adres e-mail.';
        }
    
        if(password === '' || undefined) {
            errors.value.password = 'Wymagane jest hasło.';
        } else if(password.length < 3) {
            errors.value.password = 'Hasło powinno zawierać przynajmniej 3 znaki.'
        }
    
        if(Object.keys(errors.value).length === 0) {
            return { success: true };
        }
    };

    return {
        errors,
        validateRegister
    };
};
