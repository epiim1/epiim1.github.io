function stopLoading(elm) {
  elm.getElementsByClassName("loading-animation")[0].addEventListener("animationiteration", function() {
    setTimeout(function() {
      Array.from(elm.getElementsByClassName("loading-animation")[0].children[0].children).forEach(child => {
      child.style.animation = "stopped";
    });
    }, 15);
    setTimeout(function() {
      elm.style.animation = "loading-out-barrier 1.5s forwards";
      elm.getElementsByClassName("loading-animation")[0].style.animation = "loading-out-text 1.5s forwards";
    }, 1000);
    setTimeout(function() {
      elm.style.display = "none";
  }, 2500);
  });
}
