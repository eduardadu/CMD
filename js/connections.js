class PageConnect{
  constructor(){
    this.loadSeparator();
    this.loadSVG(); //begin all loads

    //this.checkCache();
    if(localStorage['language']!= null && localStorage['language']!= undefined ){
      this.language = localStorage['language'];
    }else{
      this.language='EN';
      localStorage['language']='EN';
    }
    this.vueInit=false;
    var img = document.querySelector('#bgImage');
    document.querySelector("#cmd").style.opacity="0";


    this.pg= new Pages();
  }



  manageTabs(){
    this.pg.managePage(this,view);
  }



  loadLogo(){
    view.setResponsiveLogo();
  }

  checkView(){  //create view if its not been created
    if(view == undefined || view== null){
      view= new View();
    }else{
        view.expandInfo();
        view.expandInfoPage();
    }
  }


    startVue(){
      if(this.vueInit==false){
        if(this.language=='EN'){
          startVue();
        }else{
          startVuePT();
        }
        this.vueInit=true;
      }else{

      }
    }



  changeLanguage(){
    var t=this;
    document.getElementById("en").addEventListener("click", function(){
      var actPage= window.location.pathname.split("/").pop();
      actPage= actPage.split(".")[0];
      if(actPage==""){actPage="home"}
      if(t.language!="EN"){
        localStorage['language'] = 'EN';
        window.location.href = t.pg.pageRelation[actPage + ".html"] ;
      }
    });
    document.getElementById("pt").addEventListener("click", function(){
      var actPage= window.location.pathname.split("/").pop();
      actPage= actPage.split(".")[0];
      if(actPage==""){actPage="home"}

      if(t.language!="PT"){
        localStorage['language'] = 'PT';
        window.location.href = t.pg.pageRelation[actPage + ".html"] ;
      }
    });
  }



  setLanguage(str){
    this.language= str;
    localStorage["language"]= str;
  }

  loadSeparator(){
    var divAux = document.createElement("div");
    divAux.id="separator";
    document.body.appendChild(divAux);
    $('#separator').load("content/separator.html", function(){
    });
  }

  loadSVG(){
    var t=this;
    var divAux = document.createElement("div");
    document.body.appendChild(divAux);
    $('#cmd').load("content/svg.html", function(){
      t.loadNavbar();
    });
  }
  loadNavbar(){
    var t=this;
    var divAux = document.createElement("div");
    divAux.id="topbar";
    document.querySelector("#app").appendChild(divAux);

    $('#topbar').load("content/navbar.html", function(){
      t.addHyps();
      t.manageTabs();
      document.querySelector("#content").style.opacity = 0;
      enterAnimation();

    });
  }



  addHyps(){
      var homeHyp= document.querySelectorAll(".homeHyp");

      var contactHyp= document.querySelectorAll(".contactHyp");
      var aboutHyp= document.querySelectorAll(".infoHyp");

      var admissionHyp= document.querySelectorAll(".admissionHyp");
      var goalsHyp= document.querySelectorAll(".goalsHyp");

      var planHyp= document.querySelectorAll(".planHyp");
      var modelHyp= document.querySelectorAll(".modelHyp");

      var eventsHyp= document.querySelectorAll(".eventsHyp");

      this.addHyper(homeHyp, 2, 'PhD in Computational Media Design', 'Doutoramento em Computational Media Design', 'home.html', '/content/home.html');

      this.addHyper(goalsHyp, 3, 'Goals', 'Objectivos', 'goals.html',  'objectivos.html',  '/content/goals.html');
      this.addHyper(admissionHyp, 4, 'Admission', 'Admissão', 'admission.html', 'admissao.html',   '/content/admission.html');
      this.addHyper(planHyp, 5, 'Plan', 'Plano' , 'plan.html', 'plano.html' , '/content/plan.html');
      this.addHyper(modelHyp, 5, 'Model', 'Modelo','model.html', 'modelo.html' , '/content/model.html');
      this.addHyper(eventsHyp, 5, 'Events', 'Eventos','events.html', 'eventos.html' , '/content/events.html');
  }



  addHyper(clickables, pageNumber, pageName, pageNamept, pageURL, pageURLpt, contentURL){
    if(this.language=="PT"){
      pageName= pageNamept;
      pageURL= pageURLpt;
    }
    var t= this;
    clickables.forEach(function(element){
      if (element.getAttribute('listener') !== 'true') {

        element.addEventListener("click", function(){
          var vala= getBaseUrl();
          //closemenu
          view.closeMenu();
          window.history.pushState('page' + pageNumber, pageName, vala + pageURL);
          //window.history.replaceState('page' + pageNumber, pageName, pageURL);
          localStorage.setItem("response", vala + pageURL);
          document.title = pageName;
          t.manageTabs();
        });
        element.setAttribute('listener', 'true');
      }
    });


    window.onpopstate = function (event) {
      let state = event.state;
      if (state === null) {
          state = { value: 1 };
      }
      var s= setTimeout(function(){
        var pageName= "";
        var contentURL;


        contentURL= document.location.pathname.split("/").pop();
        if(contentURL.length==0){contentURL= "home.html"}
        contentURL = "/content/" + contentURL;

      /*  $("#content").load(contentURL, function(){
                    t.manageTabsNoLoad();
        });*/
          t.pg.managePage(t,view);

        $(window).resize();
      }, 500);
    }
  }

}


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


function getBaseUrl() { //get to the root url
            var re = new RegExp(/^.*\//);
            return re.exec(window.location.href);
        }
