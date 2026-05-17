const uiElements = {
    userIdInput: document.getElementById("userid"),
    passInput: document.getElementById("pass"),
    resultBox: document.getElementById("ans"),
    loginPage: document.getElementById("loginPage"),
    detailedPage: document.getElementById("detailedPage"),
    profileDataBox: document.getElementById("profileData")
};

const showMessage = (msg, isError = false) => {
    uiElements.resultBox.innerHTML = `<span style="color: ${isError ? 'red' : 'green'}; font-weight: bold;">${msg}</span>`;
};

const toggleView = (showDashboard) => {
    uiElements.loginPage.style.display = showDashboard ? "none" : "block";
    uiElements.detailedPage.style.display = showDashboard ? "block" : "none";
    if (showDashboard) uiElements.resultBox.innerHTML = "";
};

async function handleLogin() {
    const username = uiElements.userIdInput.value.trim();
    const password = uiElements.passInput.value.trim();

    if (!username || !password) return showMessage("Please fill out both fields.", true);

    showMessage("Logging in... Please wait.");

    try {
        const response = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, expiresInMins: 30 })
        });

        if (!response.ok) throw new Error("Invalid username or password");

        const data = await response.json();

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        showMessage("Login Successful! Loading dashboard...");

        await fetchUserData();

    } catch (error) {
        showMessage(error.message, true);
    }
}

async function fetchUserData() {
    let token = localStorage.getItem("accessToken");

    if (!token) return toggleView(false);

    try {
        let response = await fetch("https://dummyjson.com/auth/me", {
            method: "GET",
            headers: { "Authorization": `Bearer ${token}` }
        });

        if (response.status === 401) {
            console.log("Access Token Expired. Refreshing...");

            token = await refreshAccessToken();
            if (!token) return;

            response = await fetch("https://dummyjson.com/auth/me", {
                method: "GET",
                headers: { "Authorization": `Bearer ${token}` }
            });
        }

        if (!response.ok) throw new Error("Failed to fetch user data.");

        const userData = await response.json();

        toggleView(true);

        uiElements.profileDataBox.innerHTML = `
            <div>
                <img src="${userData.image}">
                <h2>Welcome, ${userData.firstName} ${userData.lastName}</h2>
                <p>@${userData.username}</p>
            </div>
            <hr>
            <p><b>ID:</b> ${userData.id}</p>
            <p><b>Email:</b> ${userData.email}</p>
            <p><b>Gender:</b> ${userData.gender}</p>
        `;

    } catch (error) {
        console.error("Fetch Data Error:", error);
        showMessage(error.message, true);
        logout();
    }
}

async function refreshAccessToken() {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
        logout();
        return null;
    }

    try {
        const response = await fetch("https://dummyjson.com/auth/refresh", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken, expiresInMins: 30 })
        });

        if (!response.ok) throw new Error("Session expired. Please login again.");

        const data = await response.json();

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        return data.accessToken;

    } catch (error) {
        console.error("Token Refresh Error:", error);
        logout();
        return null;
    }
}

function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    location.reload();
}

window.onload = () => {
    uiElements.loginPage.style.display = "none";
    uiElements.detailedPage.style.display = "none";

    if (localStorage.getItem("accessToken")) {
        fetchUserData();
    } else {
        toggleView(false);
    }
};