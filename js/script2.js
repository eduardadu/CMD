var points;

var canvasAux = document.createElement('canvas');
var context = canvasAux.getContext('2d');

// Some constants to use
var MAX_WIDTH = document.body.clientWidth;
var MAX_HEIGHT = $(window).height();
var MAX_SPEED = 10;
var POINT_SIZE = 6;
var POINT_COUNT = 10000;

var IMG_WIDTH = document.body.clientWidth;
var IMG_HEIGHT = $(window).height();
var INCREMENT = 0.02;



var ENTER= false;

var MX=0;
var MY=0;
var OFFX=200;
var OFFY=200;
onmousemove = function(e){
  MX= (e.clientX - MAX_WIDTH/2)/10;
  MY= (e.clientY - MAX_HEIGHT/2)/10;
  //MX= MX+ (INCREMENT*10);
  //MX= MY+ (INCREMENT*10);
}



function initBackground(){

    var regl = createREGL({});
    var ctx= document.querySelectorAll("canvas")[1].id="myCanvas";
    document.querySelector("#myCanvas").style.position="fixed";

    // Helper function to generate some fake data.
    // Each data point has an x and y and a 'speed'
    // value that indicates how fast it travels

    function createData(dataCount, imgData) {
      var data = [];
      var x = document.body.clientWidth;                                          //window width
      var y= $(window).height();

      var xoff=0;

      for(var h=0; h< parseInt(y/POINT_SIZE)+1+OFFY;h++){

        xoff+= INCREMENT;
        var yoff=0;

        for(var w=0; w< parseInt(x/POINT_SIZE)+1+OFFX;w++){
          yoff+= INCREMENT;

          var alpha= imgData.data[((h * (imgData.width * 4)) + (w * 4)) + 2];;
          alpha= (alpha - 0)*(0-1)/(255-0) + 1;

          var randomX=0;
          var randomY=0;
          if(Math.random()<0.01){
            randomX= Math.random()*40 -20;
            randomY= Math.random()*40 -20;
          }
          var noisePosX= noise(xoff, yoff) *20;  //10
          var noisePosY= noise(xoff, yoff) *160; //80

          var datum = {
            id: (w*h)+h,
            ogy: h * POINT_SIZE + noisePosY - OFFY,  //+ randomX,
            ogx: w * POINT_SIZE + noisePosX -OFFX, // + randomY,
            y: h * POINT_SIZE + noisePosY - OFFY,  //+ randomX,
            x: w * POINT_SIZE + noisePosX - OFFX, // + randomY,
            size: POINT_SIZE,
            speed: randomFromInterval(1, MAX_SPEED),
            color: [0.396, 0.756, 0.8, alpha],
            noiseX: xoff,
            noiseY: xoff,
          };
          data.push(datum);
        }
      }
      return data;
    }


    function randomFromInterval(min, max) {
      return Math.random() * (max - min + 1) + min;
    }

    var _img = document.getElementById('id1');
    var newImg = new Image;
    newImg.src = 'assets/img.jpg';
    newImg.onload = function() {
        _img.src = this.src;

        canvasAux.width = IMG_WIDTH;
        canvasAux.height = IMG_HEIGHT;
        context.drawImage(newImg, 0, 0 , IMG_WIDTH, IMG_HEIGHT);
        var myData = context.getImageData(0, 0, IMG_WIDTH, IMG_HEIGHT);

        points = createData(POINT_COUNT, myData);

        //-----------------------------------------------------------------
       //-----------------------------------------------------------------
      //-----------------------------------------------------------------

        window.addEventListener('resize', reportWindowSize);

        function reportWindowSize(event) {
          MAX_WIDTH = document.body.clientWidth;
          MAX_HEIGHT = $(window).height();
          ctx = document.querySelector('#myCanvas');
          ctx.style.width  = document.body.clientWidth;
          ctx.style.height = $(window).height();

          regl.poll();
          regl._refresh();
          points = createData(POINT_COUNT,myData );
        };

        regl.frame(function(context) {
          // Each loop, update the data
          updateData(points);
          // And draw it!
          drawDots({
            pointWidth: POINT_SIZE,
            points: points
          });
        });
    }


  // In practice, you would probably import/require regl
  // const regl = require('regl')();

  // In this block, it is already loaded, so we just
  // initialize it. For more info, see:
  // https://github.com/regl-project/regl#standalone-script-tag



  var drawDots = regl({
    // circle code comes from:
    // https://www.desultoryquest.com/blog/drawing-anti-aliased-circular-points-using-opengl-slash-webgl/
    frag: `
    precision mediump float;
    varying vec4 v_vColour;

    void main () {
      float r = 0.0, delta = 0.0, alpha = 1.0;
      vec2 cxy = 2.0 * gl_PointCoord - 1.0;
      r = dot(cxy, cxy);
      if (r > 1.0) {
          discard;
      }
      gl_FragColor = v_vColour ;
    }`,

    vert: `
    precision mediump float;
    attribute vec2 position;
    attribute float pointWidth;
    uniform float stageWidth;
    uniform float stageHeight;

    attribute vec4 in_Colour;
    varying vec4 v_vColour;

    // helper function to transform from pixel space to normalized
    // device coordinates (NDC). In NDC (0,0) is the middle,
    // (-1, 1) is the top left and (1, -1) is the bottom right.
    // Stolen from Peter Beshai's great blog post:
    // http://peterbeshai.com/beautifully-animate-points-with-webgl-and-regl.html
    vec2 normalizeCoords(vec2 position) {
      // read in the positions into x and y vars
      float x = position[0];
      float y = position[1];
      return vec2(
        2.0 * ((x / stageWidth) - 0.5),
        // invert y to treat [0,0] as bottom left in pixel space
        -(2.0 * ((y / stageHeight) - 0.5)));
    }
    void main () {
      v_vColour = in_Colour;
      gl_PointSize = pointWidth;
      gl_Position = vec4(normalizeCoords(position), 0, 1);
    }`,



    attributes: {
      // There will be a position value for each point
      // we pass in
      position: function(context, props) {
        return props.points.map(function(point) {
          return [point.x, point.y]
        });
      },
      // Now pointWidth is an attribute, as each
      // point will have a different size.
      pointWidth: function(context, props) {
        return  props.points.map(function(point) {
          return point.size;
        });
      },
      in_Colour: function(context, props) {
        return  props.points.map(function(point) {
          return point.color;
        });
      },
    },

    uniforms: {
      color: function(context, props) {
        // just to be a bit strange, oscillate the color a bit.
        return [101/255, 193/255, 204/255, 1.00];
      },
      stageWidth: regl.context('drawingBufferWidth'),
      stageHeight: regl.context('drawingBufferHeight')
    },
    blend: {
      enable: true,
      func: {
        srcRGB: 'src alpha',
        srcAlpha: 1,
        dstRGB: 'one minus src alpha',
        dstAlpha: 1
      },
      equation: {
        rgb: 'add',
        alpha: 'add'
      },
    },
    depth: { enable: false },
    count: function(context, props) {
      // set the count based on the number of points we have
      return props.points.length
    },
    primitive: 'points',
  });


  // Helper function, goes through each
  // element in the fake data and updates
  // its x position.



  function updateData(data) {
    if(ENTER==false){

    }else{
      data.forEach(function(datum) {
        //datum.x += datum.speed
        datum.noiseX = datum.noiseX+ (INCREMENT/2);
        datum.noiseY = datum.noiseY+ (INCREMENT/2);
        // reset x if its gone past max width
        //datum.x = datum.x > MAX_WIDTH ? 0 : datum.x;
        var mouseX = MX/200;
        var mouseY = MY/200;
        var xoff= datum.noiseX + mouseX;
        var yoff= datum.noiseY + mouseY;
        var noisePosX= noise(xoff, yoff) *200;  //10
        var noisePosY= noise(xoff, yoff) *160; //80
        datum.y = datum.ogy - OFFY + noisePosY;
        datum.x = datum.ogx - OFFX + noisePosX;
      });
    }
  }
}




function enterAnimation(){
    var time = 4000;
    var logo = setTimeout(function(){
      document.querySelector("#content").style.display="flex";
    }, 0);

    var backgroundEnter = setTimeout(function(){
      ENTER=true;
    }, 2000);

}

enterAnimation();
