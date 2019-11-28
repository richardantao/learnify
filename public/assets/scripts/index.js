var i = 0;    
var txt = "Are You Ready?";
var speed = 250; //ms

window.onload = function typeWriter() {
    if (i < txt.length) {
        document.querySelector("h2").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

