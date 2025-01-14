export const usePostValidation = () => {
    const errors = ref<{ title: string, description: string }>({
        title: '',
        description: ''
    });

    const validatePost = (title: string, description: string) => {
        errors.value = {
            title: '',
            description: ''
        };

        if(title === '' || undefined) {
            errors.value.title = 'Wymagany jest tytuł.';
        } else if(title.length < 3) {
            errors.value.title = 'Tytuł powinien zawierać przynajmniej 3 litery.';
        }

        if(description === '' || undefined) {
            errors.value.description = 'Wymagany jest krótki opis.';
        } else if(description.length < 20) {
            errors.value.description = 'Opis powinien zawierać przynajmniej 20 liter.';
        }

        return Object.values(errors.value).every((error) => error === '');
    };

    return {
        errors,
        validatePost
    };
};