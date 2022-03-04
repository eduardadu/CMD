

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
