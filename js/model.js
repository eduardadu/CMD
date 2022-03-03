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


let lastKnownScrollPosition = 0;
let ticking = false;
let cellList = [];
let groupList = [];

class Cell{
  constructor(e){
    this.ref=e;
    this.scale=this.ref.attr("width");
    this.addX= parseFloat((Math.random()*3)-1.5);
    this.addY= parseFloat((Math.random()*3)-1.5);
  }

  update(e){
    var a= this.addX * e;
    var b= this.addY * e;
    this.ref.attr("transform","translate("+ a +", " + b + ")");
  }
  updateVertical(e){
    var a=0;
    var b= this.addY * e;
    this.ref.attr("transform","translate("+ a +", " + b + ")");
  }
  reduce(){
    this.scale = 0.5;
    this.ref.attr("width", this.scale);
    this.ref.attr("height", this.scale);
  }

}

function svgReduce(){
  cellList.forEach(function(element){
    element.reduce();
    element.update(1000);
    }
  );
  groupList.forEach(function(element){
    element.updateVertical(3000);
    }
  );
}

function initSVG(){
 $( "#cmd > g > circle" ).each(function(e){
   let g= $( this);
   cellList.push(new Cell(g));
 });
 $( "#cmd > g" ).each(function(e){
   let g= $( this);
   groupList.push(new Cell(g));
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
        element.reduce(lastKnownScrollPosition);
        }
      );

      ticking = false;
    });
    ticking = true;
  }
});
