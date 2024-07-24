import axios from "axios";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const register = async (v) => {
    try {
        const response = await axios.get("http://localhost:8000/sanctum/csrf-cookie", {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            withCredentials: true
        });

        if (response.status === 204) { // axios resolves for status 200-299, sanctum returns 204 No Content
            console.log("CSRF cookie set successfully");
            const csrfToken = getCookie('XSRF-TOKEN');
            const decoded = decodeURIComponent(csrfToken);
            console.log("CSRF Token:", decoded);
            await register_user(v, decoded);
        } else {
            console.error("Failed to set CSRF cookie");
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

async function register_user(v, token) {
    try {
        const response = await axios.post("http://localhost:8000/register", {
            "name": v.fullName,
            "password": v.password,
            "email": v.email,
            "password_confirmation": v.confirmPassword,
        }, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": token
            },
            withCredentials: true
        });

        if (response.status === 201) {
            console.log("Login successful");
            return 201;
        } else if (response.status === 422) {
            return 422;
        } else {
            throw new Error('already registered');
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
