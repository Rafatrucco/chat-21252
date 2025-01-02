// import Swal from "sweetalert2" No hace falta importarlo

const socket = io()
let user; 
let chatBox = document.getElementById("chatBox") 

Swal.fire({
    title: "Identificate con tu nombre de usuario",
    input:"text",
    text:"Tu nombre",
    inputValidator:(value)=>{
        return !value && "Necesitas identificarte para continuar"
    },
    allowOutsideClick: false
}).then(result=>{
    user = result.value
    console.log(user)
})

chatBox.addEventListener("keyup", evt => {
    if(evt.key === "Enter"){
        if(chatBox.value.trim().length > 0){
            socket.emit("message",{user:user, message:chatBox.value})
            console.log(chatBox.value)
            chatBox.value = ""
        }
    }
})

socket.on("messageLogs",data=>{
    let log = document.getElementById("messageLogs")
    let messages = ""

    data.forEach(message =>{
        messages = messages+`${message.user} dice: ${message.message}</br>`

    })
    log.innerHTML = messages
})