class PageConnect{
  constructor(){
    this.loadSeparator();
    this.loadSVG(); //begin all loads

    var img = document.querySelector('#bgImage')
    function loaded() {
      alert('loaded')
    }
    if (img.complete) {
      document.querySelector("#cmd").style.display="block";
    } else {
      img.addEventListener('load', loaded)
      img.addEventListener('error', function() {
          alert('error')
      })
    }
  }



  manageTabs(){
    var title= document.title;
    var t= this;

    switch(title){
      case "CMD":
        t.triggerSeparator();
        $('#content').load("content/home.html", function(){
          t.outSeparator();
          t.checkView();

          view.startLogo("big");
        });
        break;
      case "Info":
        console.log("info");
        $('#content').load("content/info.html", function(){
          t.outSeparator();
          t.checkView();
          view.startLogo("little");
        });
        break;
      case "Contacts":
       console.log("contacts");
        $('#content').load("content/contacts.html", function(){

          t.outSeparator();
          t.checkView();
          view.startLogo("little");
        });
        break;
      case "Applications":
        console.log("applications");
        $('#content').load("content/applications.html", function(){
          t.outSeparator();
          t.checkView();
          view.startLogo("little");
        });
        break;
    }
  }

  manageTabsNoLoad(){
    var title= document.title;
    var t= this;

    switch(title){
      case "CMD":
          t.outSeparator();
          t.checkView();
          view.startLogo("big");

        break;
      case "Info":
          t.outSeparator();
          t.checkView();
          view.startLogo("little");

        break;
      case "Contacts":
          t.outSeparator();
          t.checkView();
          view.startLogo("little");
        break;
      case "Applications":
          t.outSeparator();
          t.checkView();
          view.startLogo("little");
        break;
    }
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
    document.body.appendChild(divAux);
    $('#topbar').load("content/navbar.html", function(){
      t.addHyps();
      t.manageTabs();

      document.querySelector("#content").style.opacity = 0;
      //document.querySelector("#topbar").style.opacity = 0;
      enterAnimation();

    });
  }

  triggerSeparator(){

  }
  outSeparator(){

  }



  clickOnHyps(){

  }


  addHyps(){
      var aboutHyp= document.querySelectorAll(".infoHyp");
      var homeHyp= document.querySelectorAll(".homeHyp");
      var contactHyp= document.querySelectorAll(".contactHyp");
      var admissionHyp= document.querySelectorAll(".admissionHyp");
      this.addHyper(homeHyp, 2, 'CMD', 'home.html', '/content/home.html');
      this.addHyper(aboutHyp, 3, 'Info', 'info.html', '/content/info.html');
      this.addHyper(contactHyp, 5, 'Contacts', 'contacts.html', '/content/contacts.html');
      this.addHyper(admissionHyp, 5, 'Applications', 'applications.html', '/content/applications.html');
  }



  addHyper(clickables, pageNumber, pageName, pageURL, contentURL){
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

          t.triggerSeparator();
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
      t.triggerSeparator();
      var s= setTimeout(function(){
        var pageName= "";
        var contentURL;


        contentURL= document.location.pathname.split("/").pop();
        if(contentURL.length==0){contentURL= "home.html"}
        contentURL = "/content/" + contentURL;


        $("#content").load(contentURL, function(){
                    t.manageTabsNoLoad();

        });

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
