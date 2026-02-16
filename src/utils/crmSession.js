export const getSession = () => {
    try {
        const token = localStorage.getItem("crm_token") || "demo-token";
        const userStr = localStorage.getItem("crm_user");
        const user = userStr ? JSON.parse(userStr) : null;

        return { token, user };
    } catch (e) {
        console.error("Session parse error", e);
        return { token: "demo-token", user: null };
    }
};
