class Pages{
  constructor(){

    this.pageRelation= {
      "home.html": "home.html",
      "goals.html": "objectivos.html",
      "events.html": "eventos.html",
      "model.html": "modelo.thml",
      "plan.html": "plano.html"
    };

    this.listEN = ["home", "goals", "model",  "plan",  "events", "admission"];    //map from pt pages to en
    this.listPT = ["home", "objectivos", "modelo", "plano", "eventos", "admissão"];
  }

  managePage(t){

    var actualPage= window.location.pathname.split("/").pop();
    actualPage= actualPage.split(".")[0];

    this.setLanguage(t,actualPage);

    switch(actualPage){
      case "home":
      case "":
        $('#content').load("content/home.html", function(){
          t.checkView();
          t.startVue();

          view.expandMenu();
          view.expandInfo();
          t.changeLanguage();
          view.startLogo("big");
        });
        break;
      case "goals":
      case "objetivos":
        $('#content').load("content/"+ "goals" + ".html", function(){
          t.checkView();
          view.startLogo("little");
          t.startVue();
        });
        break;
      case "admission":
      case "admissao":
        $('#content').load("content/"+ "admission" + ".html", function(){
          t.checkView();
          view.startLogo("little");
          t.startVue();
        });
          break;
      case "events":
      case "eventos":
      $('#content').load("content/"+ "events" + ".html", function(){
        t.checkView();
        view.startLogo("hide");
        t.startVue();
      });
        break;
      case "model":
      case "modelo":
        $('#content').load("content/"+ "model" + ".html", function(){
          t.checkView();
          view.startLogo("little");
          t.startVue();
        });
        break;
      case "plan":
      case "plano":
        $('#content').load("content/"+ "plan" + ".html", function(){
          t.checkView();
          view.startLogo("little");
          t.startVue();
        });
        break;
    }
  }


  checkLanguage(t, str){
    if(this.listEN.includes(str)){
      t.setLanguage("EN");
    }else{
      t.setLanguage("PT");
    }
  }


  setLanguage(t, str){
    if(str != "" && str!= "home"){
      if(this.listEN.includes(str)){
        t.setLanguage("EN");
      }else{
        t.setLanguage("PT");
      }
    }
  }
}
