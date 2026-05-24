import constFlaskURL from "./constFlaskURL";

export const handleLogout = async (id) => {
    const users = { id };

    try {
        await constFlaskURL.post('/logout', users);
        localStorage.setItem('id', '');
        localStorage.setItem('login', '');
    } catch (error) {
        console.error('Logout error:', error);
    }    
};