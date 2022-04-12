class View{
  constructor(){
    this.mobileCursor();  //detect if its mobile and hide cursor if so
    this.initSVG();       //resize svg and initialize animations
    this.resizeWindow();  //resize svg when window resize
  }

  initSVG(){
    var bBox = document.querySelector("#cmd").getBBox();                        //save initial proportions of svg
    this.ogX = bBox.width;
    this.ogY = bBox.height;
    this.resizeSVG();
    initSVG();
    this.scrollAnimation();
  }

  resizeWindow(){
    var t=this;
    window.addEventListener('resize', reportWindowSize);
    function reportWindowSize(){
      t.resizeSVG();
      t.mobileCursor();
      if(document.documentElement.scrollHeight/document.documentElement.clientWidth > document.querySelector("#bgImage").height/document.querySelector("#bgImage").width){
        document.querySelector("#bgImage").style.height = document.querySelector("#content").scrollHeight;
        document.querySelector("#bgImage").style.width = "auto";
      }else{
        document.querySelector("#bgImage").style.width = "100%";
        document.querySelector("#bgImage").style.height = "auto";
      }
    }
  }


  resizeSVG(){
    var perc=0.8;                                                               //percentage of space that svg occupies (either in x or in y)
    var x = document.body.clientWidth;                                          //window width
    var y= $(window).height();                                                  //window height

    var newW = this.ogX;
    var marginX= 0;                                                             //margin for svg
    var marginY= 0;                                                             //margin for svg


    var pretX= x * perc;
    var facX = this.ogX/pretX;
    var pretY= y * perc;
    var facY = this.ogY/pretY;


    if(x>y){
      marginX = -((x*facY)-this.ogX)/2;
      marginY = -((y*facY)-this.ogY)/2;
      $( "#cmd " ).attr("viewBox", marginX + " " + marginY + " "+ (x*facY) + " " + (y*facY));
    }else{

      let aux2= (this.ogX*facX) * y /x;
      marginX = -((x*facX)-this.ogX)/2;
      marginY = -((y*facX)-this.ogY)/2;
      $( "#cmd " ).attr("viewBox", marginX + " " + marginY + " "+ (x*facX) + " " + (y*facX));
    }
    $( "#cmd " ).attr("width",  x);
    $( "#cmd " ).attr("height", y);

    //appear only after calcs done
    var enter= setTimeout(function(){
        document.querySelector("#cmd").style.opacity="1";
    },400);

  }




  mobileCursor(){
     let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    //return check;
    if(check==true){
      document.querySelector(".custom-cursor").style.display="none";
    }else{
      document.querySelector(".custom-cursor").style.display="block";
    }
  }



  expandInfo(){
    var list = document.querySelectorAll(".infoS");
    list.forEach((item, index) => {
      item.addEventListener("click",function(){
        var exp= item.nextElementSibling;
        if(exp.classList.contains("full")){   //check if its already open
          exp.classList.remove("full");
        }else{
          exp.classList.add("full");

          for(var i=0; i<list.length;i++){    //hide the rest when one is open
            if(i!= index){
              list[i].nextElementSibling.classList.remove("full");
            }
          }
        }
      });
    });
  }


  expandMenu(){
    document.querySelector("#burger").addEventListener("click",function(){
      var exp= document.querySelector("#webExtend");
      var exp2= document.querySelector("#mobileExtend2");
      if(exp.style.maxHeight == "3.4rem" || exp.style.maxHeight ==""){
        exp.style.maxHeight= "1000vh";
        exp2.style.maxHeight= "1000vh";
      }else{
        exp.style.maxHeight= "3.4rem";
        exp2.style.maxHeight= "3rem";
      }
    });
    document.querySelector("#burger2").addEventListener("click",function(){
      var exp= document.querySelector("#webExtend");
      var exp2= document.querySelector("#mobileExtend2");
      if(exp.style.maxHeight == "3.4rem" || exp.style.maxHeight ==""){
        exp.style.maxHeight= "1000vh";
        exp2.style.maxHeight= "1000vh";
      }else{
        exp.style.maxHeight= "3.4rem";
        exp2.style.maxHeight= "3rem";
      }
    });
  }



  closeMenu(){
    var exp= document.querySelector("#webExtend");
    var exp2= document.querySelector("#mobileExtend2");
      exp.style.maxHeight= "3.4rem";
      exp2.style.maxHeight= "3rem";
  }

  startLogo(e){
    var logoCont= document.querySelector("#titleCont");
    var logo= document.querySelector("#title");
    if(e=="little"){
    //  logo.style.maxWidth="6rem";
      logoCont.classList.remove("tcB");
      logoCont.classList.add("tcS");

      logo.classList.add("tS");
      logo.classList.remove("tB");
    }else if(e=="big"){
      logoCont.classList.add("tcB");
      logoCont.classList.remove("tcS");

      logo.classList.add("tB");
      logo.classList.remove("tS");
    }
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


  expandInfoPage(){
    var list = document.querySelectorAll(".infoPTitle");
    list.forEach((item, index) => {
      item.addEventListener("click",function(){



        var exp= item.nextElementSibling;
        if(exp.style.maxHeight == "0px" || exp.style.maxHeight ==""){
          exp.style.maxHeight= "100vh";
          item.style.textDecoration = "underline ";
        }else{
          exp.style.maxHeight= "0px";
            item.style.textDecoration = "none";
        }
      });
    });
  }

  changeLanguageStyle(state){
    if(state=="en"){
      document.querySelector("#en").style.textDecoration="underline";
      document.querySelector("#pt").style.textDecoration="none";
    }else{
      document.querySelector("#en").style.textDecoration="none";
      document.querySelector("#pt").style.textDecoration="underline";
    }
  }
}



function enterAnimation(){

    var reduce = setTimeout(function(){
      svgReduce();
    }, 2000);

    var enterThings = setTimeout(function(){
      document.querySelector("#content").style.opacity = 1 ;
      document.querySelector("#titleImg").style.display = "flex";
      document.querySelector("#titleImg").style.opacity = 1;
      document.querySelector("#topbar").style.display ="flex";
    }, 3000);

    var backgroundEnter = setTimeout(function(){
      enterAnim=true;
    }, 6000);
}
