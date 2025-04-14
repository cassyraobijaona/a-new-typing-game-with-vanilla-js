const playNow = document.querySelector(".play")

playNow.addEventListener("click", function(){
    playNow.value = "..."
    setTimeout(function(){
        playNow.value = "Login"
    }, 1400)
    setTimeout(function(){
        window.location.href = "assets/html/page_test.html"
    },1400)
})