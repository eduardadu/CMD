//const $bigBall = document.querySelector('#cursorBig');
const $smallBall = document.querySelector('#cursorSmall');
const $hoverables = document.querySelectorAll('.hoverable');

// Listeners
document.body.addEventListener('mousemove', onMouseMove);
for (let i = 0; i < $hoverables.length; i++) {
  $hoverables[i].addEventListener('mouseenter', onMouseHover);
  $hoverables[i].addEventListener('mouseleave', onMouseHoverOut);
}

// Move the cursor
function onMouseMove(e) {
  TweenMax.to($smallBall, .1, {
    x: e.pageX - 15,
    y: e.pageY -window.scrollY - 15
  })
}
// Hover an element
function onMouseHover() {
  TweenMax.to($smallBall, .3, {
    scale: 4
  })
}
function onMouseHoverOut() {
  TweenMax.to($smallBall, .3, {
    scale: 4
  })
}
