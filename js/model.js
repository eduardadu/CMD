class Drawer{
  constructor(){
    this.cellList = [];
    this.size=40;
    //this.initDrawer();
    this.image= loadImage('assets/img.jpg');
    this.image.loadPixels();
  }



  initDrawer(){                                                                 //inicializar o canvas
    var x = document.body.clientWidth;                                          //window width
    var y= $(window).height();                                                  //window height
    var s= this.size;                                                           //circle size

    createCanvas(x,y);
    background(246, 246, 240);
    noStroke();

    fill(colorCircles);
    var main = document.querySelectorAll("main")[0];
    var contentor = document.querySelector("#backgroundCanvas");
    contentor.append(main);

    for(var h=0; h < (int(y/s)+1) ; h++){
      for(var w=0; w < (int(x/s)+1) ; w++){


        let aux= new Spot(w*s, h*s)
        this.cellList.push(aux);
        aux.draw(40);
      }
    }
    console.log(int(y/s) * int(x/s));
    filter(BLUR, 1);
  }


  updateList(){
    for(var i=0; i < this.cellList.size; i++){

    }
  }

  analyseImg(){
    //analisar cada pixel da imagem
  }
  analyseEnd(){
    //quando acabar a analise da imagem, começar a desenhar
  }

  startDrawing(){
    //ate acabar as bolinhas...
  }
}



class Spot{
  constructor(x, y, o){
    this.increment = 0.005;
    this.x = x;
    this.y = y;
    this.noise = noise(x * this.increment, y * this.increment);
    this.opacity=1;

    this.drag = createVector(random(-10,10), random(-10,10));
    this.update();
  }
  update(){
    this.opacity = map( this.noise , 0 , 1  , 250 , 0 );
  }
  draw(s){
    let o = this.opacity;
    fill(134, 200, 205, o);
    circle(this.x + this.drag.x, this.y + this.drag.y, s ,s);
  }
}




//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


$( "#cmd > rect" ).css( "border", "3px double red" );
let lastKnownScrollPosition = 0;
let ticking = false;
let cellList = [];

class Cell{
  constructor(e){
    this.ref=e;
    this.addX= parseFloat((Math.random()*3)-1.5);
    this.addY= parseFloat((Math.random()*3)-1.5);
  }

  update(e){
    var a= this.addX * e;
    var b= this.addY * e;
    this.ref.attr("transform","translate("+ a +", " + b + ")");
  }
}



function initSVG(){
 $( "#cmd > g >rect" ).each(function(e){
   let g= $( this);
   cellList.push(new Cell(g));
 });
}
initSVG();


document.addEventListener('scroll', function(e) {
  lastKnownScrollPosition = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      //doSomething(lastKnownScrollPosition);
      cellList.forEach(function(element){
        element.update(lastKnownScrollPosition);
        }
      );

      ticking = false;
    });
    ticking = true;
  }
});
