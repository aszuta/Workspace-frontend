export const useLoginValidation = () => {
    const errors = ref<{ loginError?: string }>({});

    const validateLogin = (email: string, password: string) => {
        const emailRegExp: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(email === '' || email === undefined || !emailRegExp.test(email)) {
            errors.value.loginError = 'Niepoprawny adres e-mail lub hasło.';
        }
    
        if(password === '' || email === undefined) {
            errors.value.loginError = 'Niepoprawny adres e-mail lub hasło.';
        }
    
        if(Object.keys(errors.value).length === 0) {
            return true;
        }
    };

    return {
        errors,
        validateLogin
    };
};
