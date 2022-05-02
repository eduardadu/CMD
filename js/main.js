let view;
let connector;
let drawer;

let floaters = [];
let groupFloaters;

function transformToCanvas(){
  for(var i=0 ; i < cellList.length ; i++){
    floaters.push( new Floater( cellList[i].x, cellList[i].y ) );
  }
    groupFloaters = new FloatersGroup(floaters);
}



function setup(){
  connector= new PageConnect();


  let cnv = createCanvas((windowWidth), (windowHeight ));
  cnv.id("canvasP5");
}

function draw(){
  clear();
  if(groupFloaters!= undefined){
    //groupFloaters.drawCircles();
  }

}

//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


class Floater{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.width;
    this.height;
    this.speed;
    this.radius = 20;
  }

  updateCircle(){
    fill(255);
    noStroke();
    var perX = this.winx * 0.8 ;
    ellipse(this.x, this.y, this.radius, this.radius);
  }
}


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


class FloatersGroup{
  constructor(aFloaters){
    this.floaters= aFloaters;
    var bBox = document.querySelector("#cmd").getBBox();                        //save initial proportions of svg
    this.ogX = bBox.width;
    this.ogY = bBox.height;
    this.updateSettings();

  }
  drawCircles(){
    push();
      translate(this.transX, this.transY);
      scale(this.scale, this.scale);
      for(var i=0; i<floaters.length ; i++){
        this.floaters[i].updateCircle();
      }
    pop();
  }

  updateSettings(){
    var w= this.ogX;
    var h= this.ogY;
    var fac = 1;
    var x = document.body.clientWidth;                                          //window width
    var y = $(window).height();

    var fac=1;
    var perc=0.8;
    var pretX= x * perc;
    var facX = this.ogX/pretX;
    var pretY= y * perc;
    var facY = this.ogY/pretY;

    if(x < y){
      fac=facX;
    }else{
      fac= facY;
    }
    this.scale = 1 / fac;

    this.marginX = (x - (this.ogX / fac))/2;
    this.marginY = (y - (this.ogY/ fac))/2;
    this.transX = this.marginX;
    this.transY = this.marginY;
  }


  scrollAnimation(sx, sy){
    this.addX = this.x + sx;
    this.addY = this.y + sy;
  }

}
