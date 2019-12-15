// create checkbox filters for version releases

function majorFilter() {
    // Get the checkbox
    var filter = document.querySelector("#major");

    // Get the output div
    var version = document.querySelectorAll(".");
  
    if (filter.checked == true){
      version[i].style.display = "block";
    } else {
      version[i].style.display = "none";
    }
  } document.addEventListener("click", majorFilter());

  function minorFilter() {
    // Get the checkbox
    var filter = document.querySelector("#minor");

    // Get the output div
    var version = document.querySelectorAll(".minor");
  
    if (filter.checked == true){
      version[i].style.display = "block";
    } else {
      version[i].style.display = "none";
    }
  } document.addEventListener("click", minorFilter);

  function patchFilter() {
    // Get the checkbox
    var filter = document.querySelector("#patch");

    // Get the output div
    var version = document.querySelectorAll(".");
  
    if (filter.checked == true){
      version[i].style.display = "block";
    } else {
      version[i].style.display = "none";
    }
  } document.addEventListener("click", patchFilter());