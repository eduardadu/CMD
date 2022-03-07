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
    this.range= 40;

    this.noiseX=  Math.random()* this.range - this.range/2;
    this.noiseY = Math.random()* this.range - this.range/2;
    this.addXS= this.addX ;
    this.addYS= this.addY ;

  }

  noise(){
    var a= Math.random()* this.range - this.range/2;
    var b= Math.random()* this.range - this.range/2;
    this.ref.attr("transform","translate("+ a +", " + b + ")");
    this.ref.attr("opacity","0.7");
  }
  update(e){
    var a= this.addX * e + Math.random()* this.range - this.range/2;;
    var b= this.addY * e + Math.random()* this.range - this.range/2;;
    this.ref.attr("transform","translate("+ a +", " + b + ")");
  }
  updateSmooth(e){
    var a= this.addXS * e + this.noiseX;
    var b= this.addYS *e + this.noiseY;
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


  addTransition(){
    var wid = 4;
    var hei = 4;
    var opa = 2.5;
    var trans = 2.5;
    this.ref.attr("transition"," width 4s, height 4s, opacity 2.5s, translate "+ trans  + "s");
  }
  takeTransition(){
    this.ref[0].style.transition ="width 4s, height 4s, opacity 2.5s, translate "+ String(0.2)  + "s";
  }
}



function svgReduce(){
  cellList.forEach(function(element){
    element.noise();
    var take= setTimeout(function(){
      element.takeTransition();
    }, 2500);
    }
  );
  groupList.forEach(function(element){
    //element.updateVertical(3000);
    element.noise();
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
