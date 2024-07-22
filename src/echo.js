import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from "axios";
axios.defaults.withCredentials=true;
axios.defaults.withXSRFToken=true;
// Function to get the CSRF token from cookies

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

const csrfToken = getCookie('XSRF-TOKEN');
const decoded = csrfToken ? decodeURIComponent(csrfToken) : null;

if (decoded) {
    console.log('CSRF Token:', decoded);

    // Assuming `reverb` uses Pusher
    window.Pusher = Pusher;

    // Configure Echo to use the `reverb` broadcaster
    window.Echo = new Echo({
        broadcaster: 'reverb',
        key: import.meta.env.VITE_REVERB_APP_KEY,
        wsHost: import.meta.env.VITE_REVERB_HOST,
        wsPort: import.meta.env.VITE_REVERB_PORT,
        forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
        enabledTransports: ['ws', 'wss'],
        authEndpoint: 'http://localhost:8000/api/broadcasting/auth',
        authorizer: (channel, options) => {
            return {
                authorize: (socketId, callback) => {
                    axios.post('http://localhost:8000/api/broadcasting/auth', {
                        socket_id: socketId,
                        channel_name: channel.name
                    })
                    .then(response => {
                        callback(false, response.data);
                    })
                    .catch(error => {
                        callback(true, error);
                    });
                }
            };
        }
        // userAuthentication:{
        //     headers: {
        //         'X-XSRF-TOKEN': decoded,
           
             
        //     }

        // }

    });
} else {
    console.error('CSRF Token not found.');
}
