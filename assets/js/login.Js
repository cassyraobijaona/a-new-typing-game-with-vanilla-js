const button = document.querySelector('.button')
button.addEventListener("click", function(){
    const username = document.querySelector('.username')
    const password = document.querySelector('.password')
    const alert = document.querySelector(".alert")

    if(username.value === "Vanilla_type" && password.value === "12345678"){
        button.value = "..."
        setTimeout(function(){
            button.value = "Login"
        }, 2000)
        setTimeout(function(){
            window.location.href = "../html/page.html"
        },2000)
    }else{
        button.value = "..."
        setTimeout(function(){
            button.value = "Login"
        }, 2000)
        setTimeout(function(){
            alert.style.animation = 'alertAnimation 3s';
            setTimeout(() => {
                alert.style.animation = ''; 
            }, 2000);
        }, 2000)
    }
})