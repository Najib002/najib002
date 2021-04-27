var prevScroll = window.pageYOffset;

window.onscroll = function() {
  var currentScroll = window.pageYOffset;
  if (prevScroll > currentScroll) {
    document.getElementById("nav").style.top = "0";
  } else {
    document.getElementById("nav").style.top = "-50px";
  }
  prevScroll = currentScroll;
}