class PageConnect{
  constructor(){
    this.loadSeparator();
    this.loadNavbar();
    this.manageTabs(runView);


    function runView(){
      view= new View();
    }
  }

  manageTabs(e){
    var title= document.title;
    var t= this;
    switch(title){
      case "CMD":
        t.triggerSeparator();
        $('#content').load("content/home.html", function(){
          t.outSeparator();
          view= new View();
        });
        break;
      case "Info":
        $('#content').load("content/info.html", function(){
          t.outSeparator();
          view= new View();
        });
        break;
      case "Contacts":
        $('#content').load("content/info.html", function(){
          t.outSeparator();
          view= new View();
        });
        break;
    }

  }

  switchHome(){

  }
  switchInfo(){

  }
  switchContacts(){

  }



  loadSeparator(){

    var divAux = document.createElement("div");
    divAux.id="separator";
    document.body.appendChild(divAux);
    $('#separator').load("content/separator.html", function(){
    });
  }
  loadNavbar(){
    var t=this;
    var divAux = document.createElement("div");
    divAux.id="topbar";
    document.body.appendChild(divAux);
    $('#topbar').load("content/navbar.html", function(){
      t.addHyps();

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
      this.addHyper(homeHyp, 2, 'CMD', '/home.html', '/content/home.html');
      this.addHyper(aboutHyp, 3, 'Info', '/info.html', '/content/info.html');
      this.addHyper(contactHyp, 5, 'Contacts', '/contacts.html', '/content/contacts.html');
  }



  addHyper(clickables, pageNumber, pageName, pageURL, contentURL){
    var t= this;
    clickables.forEach(function(element){
      if (element.getAttribute('listener') !== 'true') {

        element.addEventListener("click", function(){
          //closemenu
          window.history.pushState('page' + pageNumber, pageName, pageURL);
          //window.history.replaceState('page' + pageNumber, pageName, pageURL);
          var vala= getBaseUrl();
          localStorage.setItem("response", vala + pageURL);

          t.triggerSeparator();
          document.title = pageName;
          setTimeout(function(){
            t.manageTabs();
          },400);

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
            t.manageTabs();
        });

        $(window).resize();

      }, 500);
    }
  }

}


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------


function getBaseUrl() {
            var re = new RegExp(/^.*\//);
            return re.exec(window.location.href);
        }


        //establish page connections with ajax calls
