

function startVuePT(){

  app = Vue.createApp({
     data() {
       return {
         language: 'PT',
         currentPage: 'home'
       }
     }
   });


  //----------------------------------------------------------------------------------------------- INSTITUTE NAME
  //-----------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------

  app.component('institute', {
    template: `
      <span>{{name}}</span>`,
    data(){
      return{
        name: "Instituto de Investigação Interdisciplinar"
      }
    }
  });


  //----------------------------------------------------------------------------------------------- MENUS
  //-----------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------

  app.component('menu-box',{
    template: `
      <menu-item v-for="(input, i) in inputs"
      :key="i"
      v-model="input.name"
      :label= "input.name"
      :href=" input.url"
      :childClass="input.class"></menu-item>`,
    data(){
      return{
        inputs: [
          {
            name: 'Início',
            url: 'home.html',
            class: 'homeHyp'
          },
          {
            name: 'Admissão',
            url: 'admission.html',
            class: 'admissionHyp'
          },
          {
            name: `Info`,
            url: '',
            class: 'infoHyp'
          },
          {
            name: 'Eventos',
            url: 'events.html',
            class: 'contactHyp'
          }
        ],
        info: [
          {
            name: 'Objectivos',
            url: 'goals.html',
            class: 'goalsHyp'
          },
          {

          },
        ]
     }
    },
    methods: {},
    mounted(){
      document.querySelector(".infoHyp").addEventListener("mouseover", function(){
        var objectives;
      });
    }
  });




  app.component('menu-item',{
    template:`<a href="{{url}}" :class="[childClass , 'topItem']" @click.prevent>{{modelValue}}</a>`,
    props: ['label', 'url', 'childClass' , 'modelValue'],
    data(){
      return{
      }
    },
    methods: {},
    mounted(){
      connector.addHyps();
    }
  });


  //----------------------------------------------------------------------------------------------- MENUS MOBILE
  //-----------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------
  app.component('menu-box-mobile',{
    template: `
      <div class="topMobCont" >
        <menu-item-mobile v-for="(input, i) in inputs"
        :key="i"
        v-model="input.name"
        :label= "input.name"
        :href=" input.url"
        :childClass="input.class"></menu-item-mobile>
      </div>`,
    data(){
      return{
        inputs: [
          {
            name: 'Home',
            url: 'home.html',
            class: 'homeHyp'
          },
          {
            name: 'Admissão',
            url: 'admission.html',
            class: 'admissionHyp'
          },
          {
            name: `Objectivos`,
            url: 'goals.html',
            class: 'goalsHyp'
          },
          {
            name: `Plano Curricular`,
            url: 'plan.html',
            class: 'planHyp'
          },
          {
            name: `Modelo de Funcionamento`,
            url: 'model.html',
            class: 'modelHyp'
          },
          {
            name: 'Eventos',
            url: 'events.html',
            class: 'contactHyp'
          }
        ]
     }
    },
    methods: {},
    mounted(){}
  });





  app.component('menu-item-mobile',{
    template:`<a href="{{url}}" :class="[childClass , 'topMobItem']" @click.prevent>{{modelValue}}</a>`,
    props: ['label', 'url', 'childClass' , 'modelValue'],
    data(){
      return{
      }
    },
    methods: {},
    mounted(){
      connector.addHyps();

      view.expandMenu();
    }
  });


//----------------------------------------------------------------------------------------------- HOME ITENS
//-----------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

  app.component('home-sections',{
    template:`
    <home-section-item v-for="(input, i) in inputs"
    :key="i"
    v-model="input.name"
    :label= "input.name"
    :href=" input.url"
    :number="i+1">{{input.name}}</home-section-item>`,

    props: ['label', 'url', 'childClass' , 'modelValue'],
    data(){
      return{
        inputs: [
          {
            name: 'Objectivos',
            url: 'home.html',
            text: ''
          },
          {
            name: 'Admissão',
            url: 'admission.html',
            text: ''
          },
          {
            name: 'Plano Curricular',
            url: 'events.html',
            text: ''
          },
          {
            name: 'Modelo de Funcionamento',
            url: 'events.html',
            text: ''
          }
        ]
     }
    },
    methods: {},
    mounted(){
      connector.addHyps();

    }
  });


  app.component('home-section-item',{ //#9FCAEA
    template:`
      <div class="infoCont">
        <div class="infoS">
            <div class="number">{{number}}</div>
            <div class="titleNumber">{{modelValue}}</div>
          </div>
          <div class="infoDesc">
            <div class="infoDescBorder" style="background-color:#65C1CC">
              <span class="desc">
                The doctoral program aims to offer national and international students advanced scientific training at the confluence of Design and Computational Media, and associated research methods, with the following goals:
                <ul>
                  <li>Train researchers to understand and contribute to the advancement of Design object and practices, as well as computational methods and techniques in Design, in dialectics with the innovation of computational media and its literacies, with the models of interaction and collaboration, with the human perception and cognition, and with artistic practices;</li>
                  <li>Empower towards autonomous high-quality interdisciplinary scientific research;</li>
                  <li>Enable students to develop high-potential scientific projects, integrated in international knowledge networks;</li>
                  <li>Contribute to the development of critical and complex thinking, to the understanding and exercise of Computational Media Design, as an instrument of social innovation and transition to sustainable development.</li>
                </ul>
              </span>
            </div>
          </div>
      </div>
    `,
    props: ['label', 'url', 'number' , 'modelValue'],
    data(){
      return{
      }
    },
    methods: {},
    mounted(){
      view.expandInfo();
    }
  });





  //----------------------------------------------------------------------------------------------- EVENTS
  //-----------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------



  //----------------------------------------------------------------------------------------------- HOME ITENS
  //-----------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------

    app.component('home-events',{
      template:`
      <home-event-item v-for="(input, i) in inputs"
      :key="i"
      v-model="input.name"
      :date= "input.date"
      :label= "input.name"
      :href=" input.url"
      :number="i+1">{{input.name}}</home-event-item>`,

      props: ['label', 'url', 'childClass' , 'modelValue'],
      data(){
        return{
          inputs: [
            {
              type: 'Workshop',
              name: 'Moving Type',
              date: '31 Abr',
              tags: 'p5.s',
              authors: 'John Doe',
              url: 'home.html',
              text: ''
            },
            {
              type: 'Workshop',
              name: 'Moving Type',
              date: '31 Abr',
              tags: 'p5.s',
              authors: 'John Doe',
              url: 'home.html',
              text: ''
            },
            {
              type: 'Workshop',
              name: 'Moving Type',
              date: '31 Abr',
              tags: 'p5.s',
              authors: 'John Doe',
              url: 'home.html',
              text: ''
            }

          ]
       }
      },
      methods: {},
      mounted(){
        connector.addHyps();

      }
    });


    app.component('home-event-item',{ //#9FCAEA
      template:`
        <div class="infoCont">
          <div class="infoS">
              <div class="eventDate">{{date}}</div>
              <div class="titleNumber">{{modelValue}}</div>
            </div>

            <div class="infoDesc">
              <div class="infoDescBorder" style="background-color:#65C1CC">
                <span class="desc">
                  The doctoral program aims to offer national and international students advanced scientific training at the confluence of Design and Computational Media, and associated research methods, with the following goals:
                  <ul>
                    <li>Train researchers to understand and contribute to the advancement of Design object and practices, as well as computational methods and techniques in Design, in dialectics with the innovation of computational media and its literacies, with the models of interaction and collaboration, with the human perception and cognition, and with artistic practices;</li>
                    <li>Empower towards autonomous high-quality interdisciplinary scientific research;</li>
                    <li>Enable students to develop high-potential scientific projects, integrated in international knowledge networks;</li>
                    <li>Contribute to the development of critical and complex thinking, to the understanding and exercise of Computational Media Design, as an instrument of social innovation and transition to sustainable development.</li>
                  </ul>
                </span>
              </div>
            </div>
        </div>
      `,
      props: ['label', 'url', 'number' , 'modelValue', 'date'],
      data(){
        return{
        }
      },
      methods: {},
      mounted(){
        view.expandInfo();
      }
    });



    //----------------------------------------------------------------------------------------------- EVENTS
    //-----------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------

  app.mount("#app");
}