document.getElementById("createUser").addEventListener("click", function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            if(request.responseText == "Email already used!"){
                document.getElementById("signInError").innerHTML = "Email already used!";
            } else if (request.responseText == "User already exists!"){
                document.getElementById("logInError").innerHTML = "User already exists!";
            } else {
                chrome.storage.local.set({user: request.response})
                logedIn();
            }
        }
    }
    request.open("POST", "http://localhost:5000/auth/createUser", true);
    request.setRequestHeader('Content-Type', 'application/json');
    
    request.send(JSON.stringify({
        "user": document.getElementsByName("username-signIn")[0].value,
        "password": document.getElementsByName("password-signIn")[0].value,
        "email": document.getElementsByName("email")[0].value
    }));
})

document.getElementById("logInButton").addEventListener("click", function(){
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4 && request.status == 200){
            if(request.responseText == "Failed"){
                document.getElementById("logInError").innerHTML = "Invalid username or password!"
            } else {
                chrome.storage.local.set({user: request.response})
                logedIn();
            }
        }
    }
    request.open("POST", "http://localhost:5000/auth/login", true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.send(JSON.stringify({
        "user": document.getElementsByName("username")[0].value,
        "password": document.getElementsByName("password")[0].value,
    }));
})