// async function getData() {
//     const url = "https://jsonplaceholder.typicode.com/users";
    
//     try{
//         const response = await fetch(url);
//         const data = await response.json();
//         console.log(data);
//     }
//     catch (error){
//         console.error("Fail to fetch user");
//     }
// }

// getData();




// script.js

// Global array to store fetched users
let usersData = [];

// DOM Element for Output
const outputScreen = document.getElementById("outputScreen");

// Helper function to print to the screen
function printToScreen(htmlContent) {
    outputScreen.innerHTML = htmlContent;
}

// ==========================================
// 1 & 2. Fetch Users & Error Handling
// ==========================================
async function getUsers() {
    printToScreen("Fetching data... ⏳");
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        usersData = await response.json();
        printToScreen("<strong>Users Fetched Successfully ✅</strong>\n\n(Click 'View All Users' to see them)");
    } catch (error) {
        // Error Handling
        printToScreen("<span class='text-danger'>Failed to fetch users ❌</span>");
        console.error(error);
    }
}

// ==========================================
// 3. Display Users
// ==========================================
function displayUsers(usersArray) {
    if (usersArray.length === 0) {
        printToScreen("No users found. Please fetch users first or try a different search.");
        return;
    }

    let output = "";
    usersArray.forEach(user => {
        output += `
<div class="user-card">
ID: ${user.id}
Name: ${user.name}
Email: <a href="mailto:${user.email}">${user.email}</a>
City: ${user.address.city}
</div>`;
    });
    printToScreen(output);
}

// ==========================================
// 4. Search User (Case-insensitive)
// ==========================================
function searchUser(name) {
    if (!name.trim()) return printToScreen("Please enter a name to search.");
    
    const filteredUsers = usersData.filter(user => 
        user.name.toLowerCase().includes(name.toLowerCase())
    );
    
    printToScreen(`<strong>Search Result for "${name}":</strong>\n`);
    displayUsers(filteredUsers);
}

// ==========================================
// 5. Find User by ID
// ==========================================
function findUser(id) {
    if (!id) return printToScreen("Please enter an ID.");
    
    const user = usersData.find(u => u.id === parseInt(id));
    
    if (user) {
        printToScreen(`<strong>User Found (ID: ${id}):</strong>\n`);
        displayUsers([user]); // Pass as array to reuse displayUsers function
    } else {
        printToScreen(`No user found with ID: ${id}`);
    }
}

// ==========================================
// 6. Create Username List (Uppercase)
// ==========================================
function showUppercaseUsernames() {
    if (usersData.length === 0) return printToScreen("Please fetch users first.");

    const uppercaseNames = usersData.map(user => `"${user.name.toUpperCase()}"`);
    
    printToScreen(`<strong>Uppercase Usernames:</strong>\n\n[ ${uppercaseNames.join(", \n  ")} ]`);
}

// ==========================================
// 7. Total Users
// ==========================================
function showTotalUsers() {
    if (usersData.length === 0) return printToScreen("Please fetch users first.");
    
    printToScreen(`<strong>Total Users:</strong> ${usersData.length}`);
}

// ==========================================
// 8. Filter Users by City
// ==========================================
function filterByCity(city) {
    if (!city.trim()) return printToScreen("Please enter a city name.");

    const cityUsers = usersData.filter(user => 
        user.address.city.toLowerCase() === city.toLowerCase()
    );

    printToScreen(`<strong>Users in City "${city}":</strong>\n`);
    displayUsers(cityUsers);
}


// ==========================================
// 9. Main Menu Button Event Listeners
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("btnFetch").addEventListener("click", getUsers);
    
    document.getElementById("btnView").addEventListener("click", () => displayUsers(usersData));
    
    document.getElementById("btnSearch").addEventListener("click", () => {
        const name = document.getElementById("inputSearch").value;
        searchUser(name);
    });
    
    document.getElementById("btnFindId").addEventListener("click", () => {
        const id = document.getElementById("inputId").value;
        findUser(id);
    });
    
    document.getElementById("btnUppercase").addEventListener("click", showUppercaseUsernames);
    
    document.getElementById("btnFilterCity").addEventListener("click", () => {
        const city = document.getElementById("inputCity").value;
        filterByCity(city);
    });
    
    document.getElementById("btnTotal").addEventListener("click", showTotalUsers);
    
    document.getElementById("btnClear").addEventListener("click", () => {
        printToScreen("Screen Cleared. Waiting for action...");
        document.getElementById("inputSearch").value = "";
        document.getElementById("inputId").value = "";
        document.getElementById("inputCity").value = "";
    });
});