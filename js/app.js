var app;
var content;

function startVue(){

  app = Vue.createApp({
     data() {
       return {
         language: 'EN',
         currentPage: 'home'
       }
     }
   });


  //----------------------------------------------------------------------------------------------- INSTITUTE NAME
  //-----------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------------

  app.component('institute', {
    template: `
      <a href="https://www.uc.pt/en/iii" id="institute">{{name}}</a>`,
    data(){
      return{
        name: "Institute for Interdisciplinary Research"
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
            name: 'Home',
            url: 'home.html',
            class: 'homeHyp'
          },
          {
            name: 'Admission',
            url: 'admission.html',
            class: 'admissionHyp'
          },
          {
            name: `Info`,
            url: '',
            class: 'infoHyp'
          },
          {
            name: 'Events',
            url: 'events.html',
            class: 'contactHyp'
          }
        ],
        info: [
          {
            name: 'Goals',
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
      connector.addHyps();
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
            name: 'Admission',
            url: 'admission.html',
            class: 'admissionHyp'
          },
          {
            name: `Goals`,
            url: 'goals.html',
            class: 'goalsHyp'
          },
          {
            name: `Curricular Plan`,
            url: 'plan.html',
            class: 'planHyp'
          },
          {
            name: `Model`,
            url: 'model.html',
            class: 'modelHyp'
          },
          {
            name: 'Events',
            url: 'events.html',
            class: 'contactHyp'
          }
        ]
     }
    },
    methods: {},
    mounted(){
      connector.addHyps();
      view.expandMenu();
    }
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
    :textVal="input.text"
    :number="i+1">{{input.name}}</home-section-item>`,

    props: ['label', 'url', 'childClass' , 'modelValue', 'textVal'],
    data(){
      return{
        inputs: [
          {
            name: 'Objectives of the Program',
            url: 'home.html',
            text: `  The PhD in Computational Media Design aims to provide advanced scientific training at the confluence of Design and Computational Media, and respective research methods. Through an immersive program of learning in the context of laboratory projects and design practice, it aims to enable new researchers to understand and contribute to the advancement of the object and practice of design.

              A distinctive aspect of this program is the exploration of computational methods and techniques in Design, in dialectics with the innovation of computational media and their literacies, for the innovation of interaction models and technologies, the study of the dynamics of collaboration, in interdisciplinary synergy with the study of human perception and cognition and artistic practices.

              The new PhD graduates will develop capacities for:
              the autonomous conduct of high quality interdisciplinary scientific research;
              to carry out research projects of high scientific potential, providing integration in international knowledge networks in the area;
              contribute to the development of critical and complex thinking in Computational Design and Media;
              to understand and exercise Computational Media Design as a tool for social innovation and for the transition to sustainable development.`
          },
          {
            name: 'Admission',
            url: 'admission.html',
            text: `  1- Podem candidatar-se ao ciclo de estudos conducentes ao grau de doutor:
              a) Os titulares do grau de mestre ou equivalente legal em diferentes áreas e afins, relacionadas com o ciclo de estudos, nomeadamente Ciências e Informática, Design, Audiovisuais e produção dos media, Arquitetura, Belas-Artes;
              b) Os titulares do grau de licenciado, detentores de um currículo escolar ou científico especialmente relevante que seja reconhecido como atestando capacidade para a realização deste ciclo de estudos pelo Conselho Científico do Instituto de Investigação Interdisciplinar da Universidade de Coimbra;
              c) Os detentores de um currículo escolar, científico ou profissional que seja reconhecido como atestando capacidade para a realização deste ciclo de estudos pelo Conselho Científico do Instituto de Investigação Interdisciplinar da Universidade de Coimbra.
`
          },
          {
            name: 'Curricular Plan',
            url: 'plan.html',
            text: `  The Research Methodologies in Computational Media Design aims for the student to:
              - Acquire a broad view of the interdisciplinary research domain of Computational Media Design.
              - Develop specific knowledge of the research challenges and main applicable methodologies, of the new objects of design, of the evolution of design practices, of organizing research processes, and of advanced forms of interdisciplinary reflection in Design.
              - Improve competencies of critical analysis of scientific works, synthesis, scientific writing, verbal and written communication, critical reasoning, autonomous learning, research and collaborative work.     

        `
          },
          {
            name: 'Functioning Model',
            url: 'model.html',

            text: `  The Research Methodologies in Computational Media Design aims for the student to:
              - Acquire a broad view of the interdisciplinary research domain of Computational Media Design.
              - Develop specific knowledge of the research challenges and main applicable methodologies, of the new objects of design, of the evolution of design practices, of organizing research processes, and of advanced forms of interdisciplinary reflection in Design.
              - Improve competencies of critical analysis of scientific works, synthesis, scientific writing, verbal and written communication, critical reasoning, autonomous learning, research and collaborative work.     

        `
          }
        ]
     }
    },
    methods: {},
    mounted(){
      connector.addHyps();
      view.expandInfo();
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
                {{textVal}}
              </span>
            </div>
          </div>
      </div>
    `,
    props: ['label', 'url', 'number' , 'modelValue', 'textVal'],
    data(){
      return{
      }
    },
    methods: {},
    mounted(){

    }
  });




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
        :textVal="input.text"
        :placeHour = "input.placeHour"
        :number="i+1">{{input.name}}</home-event-item>`,

        props: ['label', 'url', 'childClass' , 'modelValue', "textVal", 'placeHour'],
        data(){
          return{
            inputs: [
              {
                type: 'Workshop',
                name: 'Moving Type',
                date: '31 Abr',
                placeHour: '10:00 Sala E4.5',
                tags: 'p5.s',
                authors: 'John Doe',
                url: 'home.html',
                text: 'John Doe comes to preswent his work on Advanced TYpography'
              },
              {
                type: 'Workshop',
                name: 'Moving Type',
                date: '31 Abr',
                placeHour: '10:00 Sala E4.5',
                tags: 'p5.s',
                authors: 'John Doe',
                url: 'home.html',
                text: ''
              },
              {
                type: 'Workshop',
                name: 'Moving Type',
                date: '31 Abr',
                placeHour: '10:00 Sala E4.5',
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
                <div class="placeHour">{{placeHour}}</div>
              </div>

              <div class="infoDesc">
                <div class="infoDescBorder" style="background-color:#65C1CC">
                  <span class="desc">
                    {{textVal}}
                  </span>
                </div>
              </div>
          </div>
        `,
        props: ['label', 'url', 'number' , 'modelValue', 'date', 'textVal', 'placeHour'],
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
