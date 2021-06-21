let user = JSON.parse(result.user).id;
            let request = new XMLHttpRequest();
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    let data = JSON.parse(request.response).annotations;
                    let elem = document.getElementsByClassName("list-annotations")[0]
                    elem.innerHTML = "";
                    for(let i = 0; i < data.length; i++){
                        elem.innerHTML += `
                            <div style="display:flex;width:100%"><div style="border-radius:50%;background:hsl(236, 50%, 52%);color:white;width:25px;height:25px;display:flex;justify-content:center;margin-right:7px">${i+1}</div><a href="${data[i]["link"]}" class="list-annotations-links">${data[i]["link"].substr(0,30)}</a>
                        </div>`;
                    }
                    for(let a of document.getElementsByClassName('list-annotations-links')){
                        a.addEventListener("click", function(event){
                            window.open(event.target.innerHTML);
                        })
                    }
                }
            }

function logedIn(){
    chrome.storage.local.get(["user"], function(result){
        if(result.user == undefined){
            document.getElementById("notlogedin").style.display = "initial";
        } else {
            let user = JSON.parse(result.user).id;
            let request = new XMLHttpRequest();
            request.onreadystatechange = function(){
                if(request.readyState == 4 && request.status == 200){
                    let data = JSON.parse(request.response).annotations;
                    let elem = document.getElementsByClassName("list-annotations")[0]
                    elem.innerHTML = "";
                    for(let i = 0; i < data.length; i++){
                        elem.innerHTML += `
                            <div style="display:flex;width:100%"><div style="border-radius:50%;background:hsl(236, 50%, 52%);color:white;width:25px;height:25px;display:flex;justify-content:center;margin-right:7px">${i+1}</div><a href="${data[i]["link"]}" class="list-annotations-links">${data[i]["link"].substr(0,30)}</a>
                        </div>`;
                    }
                    for(let a of document.getElementsByClassName('list-annotations-links')){
                        a.addEventListener("click", function(event){
                            window.open(event.target.innerHTML);
                        })
                    }
                }
            }
            request.open("GET", "http://localhost:5000/list-annotations", true);
            request.setRequestHeader("Content-Type", "application/json");
            request.setRequestHeader("Authorization", "Bearer " +user)

            request.send(null)
            chrome.tabs.query({active: false, currentWindow:true}, function(tabs){
                for(let i = 0; i < tabs.length; i++){
                    chrome.tabs.sendMessage(tabs[i].id, {reload: false})
                }
            })
            chrome.tabs.query({active: true, currentWindow:true}, function(tabs){
                    chrome.tabs.sendMessage(tabs[0].id, {reload: false})
            })
            document.getElementById("logedin").style.display = "flex";
            document.getElementById("notlogedin").style.display = "none";
        }
    })
}