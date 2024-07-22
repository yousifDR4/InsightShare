import axios from "axios";
axios.defaults.withCredentials=true;
axios.defaults.withXSRFToken=true;
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export const login = async (v) => {
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
            return await login_user(v, decoded);
        } else {
            console.error("Failed to set CSRF cookie");
            return 404
         
        }
    } catch (error) {
        console.error("Error:", error);
    }
};

async function login_user(v, token) {
    try {
        const response = await axios.post("http://localhost:8000/login", {
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
       console.log(response);
        if (response.status === 200) {
            console.log("Login successful");
            return 200;
        } else if (response.status === 422) {
            return 422;
        } else {
            console.log(response);
            throw new Error('already login');
        }
    } catch (error) {
        console.error("Error:", error);
    }
}
