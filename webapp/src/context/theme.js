export const applyTheme = (userType) => {
    const root = document.documentElement;
    const user = JSON.parse(localStorage.getItem('user'));
    const role = user ? user.role : 'USER';

    switch (role) {
        case 'ADMIN':
            root.classList.add("admin-theme");
            root.classList.remove("user-theme", "company-theme");
            break;
        case 'USER':
            root.classList.add("user-theme");
            root.classList.remove("admin-theme", "company-theme");
            break;
        case 'COMPANY':
            root.classList.add("company-theme");
            root.classList.remove("admin-theme", "user-theme");
            break;
        default:
            root.classList.add("user-theme");
            root.classList.remove("admin-theme", "company-theme");
    }
};