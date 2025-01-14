export const useWorkspaceValidation = () => {
    const errors = ref<{ email?: String, title?: String }>({});

    const validateWorkspaceEmail = (email?: string) => {
        errors.value = {};
        const emailRegExp: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(email === '' || email === undefined || !emailRegExp.test(email)) {
            errors.value.email = 'Niepoprawny adres e-mail.';
        }

        if(Object.keys(errors.value).length === 0) {
            return true;
        }

        return false;
    }

    const validateWorkspaceTitle = (title?: string) => {
        errors.value = {};
        if(title === '' || title === undefined) {
            errors.value.title = 'Wymagany jest tytuł.';
        } else if(title.length < 3) {
            errors.value.title = 'Tytuł powinien zawierać przynajmniej 3 litery.';
        }

        if(Object.keys(errors.value).length === 0) {
            return true;
        }

        return false;
    };

    return {
        errors,
        validateWorkspaceEmail,
        validateWorkspaceTitle
    };
};