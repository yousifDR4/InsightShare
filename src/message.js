async function getCSRFToken() {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; XSRF-TOKEN=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function message(data, id) {
    try {
        const csrfToken = await getCSRFToken();
        const decoded = decodeURIComponent(csrfToken);

        const response = await fetch("http://localhost:8000/api/message", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "X-XSRF-TOKEN": decoded,
                "X-Socket-Id": id,
               
            },
            body: JSON.stringify({
                "body": data.message,
                "sender_id": data.sender_id,
                "conversations_id": data.conversations_id
            }), credentials: "include"
        });

        if (response.status === 201) {
            console.log("Message sent successfully");
            return 201;
        } else if (response.status === 422) {
            return 422;
        } else {
            console.log(response);
            throw new Error('Error sending message');
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

export default message;
