const STORAGE_KEY = 'chat-room';

export const getUser = () => {
    const user = localStorage.getItem(STORAGE_KEY);
    if (!user) {
        return null
    }
    return user
};

export const setUser = (login) => {
    localStorage.setItem(STORAGE_KEY, login)
};

export const logOut = () => {
    localStorage.removeItem(STORAGE_KEY)
};
