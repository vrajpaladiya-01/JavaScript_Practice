/* =====================================
        SELECT HTML ELEMENTS
===================================== */
const userImage = document.getElementById("userImage");
const userId = document.getElementById("userId");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const userAddress = document.getElementById("userAddress");

// Profile container select karyo (hide/show karva mate)
const profileContainer = document.getElementById("profileContainer");

/* =====================================
        FETCH USER DATA
===================================== */
async function fetchUserData() {
    try {
        const response = await fetch("https://dummyjson.com/users/1");
        const data = await response.json();
        
        console.log("Data Fetched Successfully:", data);

        /* =========================
            SHOW USER DATA
        ========================= */
        userImage.src = data.image;
        userId.innerText = data.id;
        userName.innerText = data.firstName + " " + data.lastName;
        userEmail.innerText = data.email;
        userPhone.innerText = data.phone;
        userAddress.innerText = 
            data.address.address + ", " + 
            data.address.city + ", " + 
            data.address.state;

        /* =========================
            SHOW CONTAINER
        ========================= */
        // Data aavi jaay pachi aapo-aap container ne show kari do (d-none remove kari ne)
        profileContainer.classList.remove("d-none");

    } catch (error) {
        console.log(error);
        alert("Data Not Found. Please check your internet connection.");
    }
}

/* =====================================
        INITIAL LOAD
===================================== */
// Je vu API_profile.html page khulse (nav.html mathi aavya pachi),
// tarat j aapo-aap aa function call thai jase ane data show thase.
fetchUserData();