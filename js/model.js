class Drawer{
  constructor(){
    this.cellList = [];
    this.size=40;
    //this.initDrawer();
    this.image= loadImage('assets/img.jpg');
    this.image.loadPixels();
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
