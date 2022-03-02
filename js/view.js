class View{
  constructor(){

    this.initSVG();
    this.expandInfo();
  }


  initSVG(){
    var bBox = document.querySelector("#cmd").getBBox();                        //save initial proportions of svg
    this.ogX = bBox.width;
    this.ogY = bBox.height;
    this.resizeSVG();
  //  this.resizeWindow();
  }

  resizeWindow(){
    var t=this;
    window.onresize = function(event) {
      t.resizeSVG();
    };

  }


  resizeSVG(){
    //widthAtual/original = 0.9  que queremos transformar em 0.8
    //original*0.8 /original = width pretendida
    //widthatual / widthpretendida = factor de multiplicaçao
    var percentage=0.8;
    var wP= this.ogX / this.ogX;

    var x = document.body.clientWidth;                                          //window width
    var y= $(window).height();                                                  //window height

    var newW = this.ogX;
    var marginX= 0;                                                             //margin for svg
    var marginY= 0;                                                             //margin for svg
    var proportionX= x/this.ogX;                                                //proportion of the reduced svg

    marginX = parseFloat( - (x -  newW) / 2);                               //deslocation that viewbox must suffer to fake margins
    marginY = -y/3;


    if(x>y){
      $( "svg " ).attr("viewBox", marginX + " " + marginY + " "+ (x)+ " " + (y*1));
    }else{
      $( "svg " ).attr("viewBox", marginX + " " + marginY + " "+ (x)+ " " + (y*1));
    }
    $( "svg " ).attr("width",  x);
    $( "svg " ).attr("height", y);
  }





  expandInfo(){
    var list = document.querySelectorAll(".infoS");

    list.forEach((item, index) => {
      item.addEventListener("click",function(){

        var exp= item.nextElementSibling;

        if(exp.style.maxHeight == "0px" || exp.style.maxHeight ==""){
          exp.style.maxHeight= "100vh";
        }else{
          exp.style.maxHeight= "0px";
        }
      });
    });

  }

}
