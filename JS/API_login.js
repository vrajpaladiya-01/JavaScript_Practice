async function submit(){
    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const result = document.getElementById("ans");

    if(!user && !pass){
        result.innerHTML = "Please fill up the form";
        return;
    } else if (user === ""){
        result.innerHTML = "Please enter user id";
    } else if (pass === ""){
        result.innerHTML = "please enter password";
    } else {
        result.innerHTML = "login success ✅";
    }

    const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            username: user,
            password: pass,
            expiresInMins: 1, 
        }),
    })

    const data = await res.json();
    // console.log(data);
    localStorage.setItem('token', data.accessToken);
}