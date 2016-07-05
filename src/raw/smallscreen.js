/* jshint esversion:6 */

function checkLine() {
  // Find the width of any text content sibbling to a line
  var line = document.getElementsByClassName('line')[0];

  if(line) {
    var boxWidth = line
      .parentNode
      .getElementsByClassName('text-content')[0]
      .offsetWidth;

    // If it's the size of the window minus the padding
    if(boxWidth > window.innerWidth - 220) {
      if(!document.getElementById("line-hider")) {
        let lineHider = document.createElement("style");
        lineHider.setAttribute("id", "line-hider");
        lineHider.innerHTML = "div.line{visibility:hidden;}";
        document.getElementsByTagName("head")[0].appendChild(lineHider);
      }
    } else {
      let lineHider = document.getElementById("line-hider");
      if(lineHider) document.getElementsByTagName("head")[0].removeChild(lineHider);
    }
  }
}

// This removes the blue lines when the text content is wrapped
window.addEventListener("resize", checkLine);

window.onload = checkLine;
