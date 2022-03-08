//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


let lastKnownScrollPosition = 0;
let ticking = false;
let cellList = [];
let floatersList = [];
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

    this.rangeBig= 20;

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


  floating(){
    var t=this;
    var move=true;
    function moveIt(){
      var time= Math.random()*6000 + 6000;
      var aux = setInterval( function(){
        var a= Math.random()* t.rangeBig + t.rangeBig/2;//- t.rangeBig/2;
        var b= Math.random()* t.rangeBig + t.rangeBig/2;//- t.rangeBig/2;
        if(Math.random()<0.5){ a=-a; }  if(Math.random()<0.5){ b=-b;}
        //t.ref[0].style.transition ="width 4s, height 4s, opacity 2.5s, translate "+ String(parseInt(time/1000))  + "s";
        t.ref.attr("transform","translate("+ a +", " + b + ")");

        if(move==true){
          moveIt();
        }
      }, time);
    }
    moveIt();
  }



  svgMouse(ex, ey){
      var vecx = (this.x  - ex);
      var vecx = (this.y  - ex);
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



/* ----------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------*/



function svgReduce(){
  cellList.forEach(function(element){
    element.noise();
    var take= setTimeout(function(){
      element.takeTransition();
    }, 2500);
    }
  );
  groupList.forEach(function(element){
    element.noise();
    }
  );

  floatersList.forEach(function(element){
    element.floating();
    }
  );
}


/* ----------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------*/
/* ----------------------------------------------------------------------------*/


function initSVG(){
 $( "#cmd > g > circle" ).each(function(e){
   let c= $( this);
   var newG = document.createElementNS("http://www.w3.org/2000/svg", "g")
   var parent = c[0].closest("g");
   newG.classList.add("floaters");
   parent.appendChild(newG);
   newG.appendChild(c[0]);
   cellList.push(new Cell(c));

 });

 $( "#cmd > g" ).each(function(e){
   let g= $( this);
   groupList.push(new Cell(g));
 });

 $( ".floaters" ).each(function(e){
   let g= $( this);
   floatersList.push( new Cell(g));
 });
}
