// render copyright statement inside footer after window loads 
window.onload = function copyrightYear() {
    let year = new Date().getFullYear();

    document.querySelector("#copyright p").innerHTML = "Copyright <i class='far fa-copyright'></i> " + year + " Learnify. All rights reserved.";
}