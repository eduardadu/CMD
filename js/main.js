let view;
let connector;
let drawer;

let floaters = [];

function transformToCanvas(){
  for(var i=0 ; i < cellList.length ; i++){
    floaters.push( new Floater( cellList[i].x, cellList[i].y ) );
  }
}

function setup(){
  let cnv = createCanvas((windowWidth), (windowHeight ));
  cnv.id("canvasP5");



  connector= new PageConnect();

}

function draw(){
  /*for(var i=0; i<floaters.length ; i++){
    floaters[i].updateCircle();
  }*/
}



class Floater{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.speed;
    this.radius = 20;
  }

  updateCircle(){
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.radius, this.radius);
  }


  scrollAnimation(){
    var t = this;
    document.addEventListener('scroll', function(e) {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        window.requestAnimationFrame(function() {
          cellList.forEach(function(element){
            element.updateSmooth(lastKnownScrollPosition);
            }
          );
          ticking = false;
        });
        ticking = true;
      }
    });
  }
}
