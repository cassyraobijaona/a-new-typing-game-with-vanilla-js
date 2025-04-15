const playNow = document.querySelector(".play")
const Login = document.querySelector(".login_btn")

playNow.addEventListener("click", function(){
    playNow.value = "..."
    setTimeout(function(){
        playNow.value = "Play Now"
    }, 1400)
    setTimeout(function(){
        window.location.href = "assets/html/page_test.html"
    },1400)
})

Login.addEventListener("click", function(){
    Login.value = "..."
    setTimeout(function(){
        playNow.value = "Login"
    }, 1400)
    setTimeout(function(){
        window.location.href = "assets/html/login.html"
    },1400)
})
