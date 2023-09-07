function setupSketch() {
    var sketch = function(p) {
      var r;
      var factor = 2;
      var startInc = 0.01;
      var inc = startInc;
      var maxFactor = 10;
      var minFactor = 1;
      var strokeW = 1;
      var startStrokeInc = 0.01;
      var strokeInc = startStrokeInc;
      var maxstrokeW = 2;
      var minstrokeW = 1;
      var factorIncrease = true;
      var strokeIncrease = true;
      var curves = [];
      var curveIncrease = true;
      var minCurvesLim = 3;
      var total = minCurvesLim;
      var maxCurvesLim = 300;
      var lastCurveTime = 0;
      var addCurveTime = 300;
      var addCurveProb = 0.7;
      var addCurveAcc = 0.01;
      var minAddCurveTime = 70;
      var maxAddCurveTime = 500;
      var bezierTime=false;
      var bezierStart=0;
      var bezierEnd=0;
      var bezierDuration=2000;
      var bezierCheck=3000;
      var minCurves, maxCurves;
      var originalAddCurveTime = addCurveTime;
      var bezierProb = 0.2;
      var mainColor;

      let canvasWidth;
      let canvasHeight;

      function getVector(index, total) {
        const angle = p.map(index % total, 0, total, 0, p.TWO_PI);
        const v = p5.Vector.fromAngle(angle + p.PI);
        v.mult(r);
        return v;
    }
      
      function addCurve() {
          total = curves.length + 1;
          const curve = {
              a: getVector(curves.length-1, total),
              b: getVector(curves.length-1 + 16, total),
              c: getVector((curves.length-1 + 8) * factor, total),
              d: getVector((curves.length-1 + 1) * factor, total)
          };
          curves.push(curve);
      }
      
      function removeCurve() {
          curves.pop();
          total = curves.length;
        }
      
        function windowResized(){
          canvas.parent("home__img");
          clear();
          canvasWidth = document.getElementById("home__img").offsetWidth;
          canvasHeight = document.getElementById("home__img").offsetHeight;
          resetVariables();
          
          r = (canvasWidth / 2) - 16;
      
          
      }
      
      function resetVariables() {
          factor = 2;
          startInc = 0.01;
          inc = startInc;
          maxFactor = 10;
          minFactor = 1;
          strokeW = 1;
          startStrokeInc = 0.01;
          strokeInc = startStrokeInc;
          maxstrokeW = 2;
          minstrokeW = 1;
          factorIncrease = true;
          strokeIncrease = true;
          curves = [];
          curveIncrease = true;
          minCurvesLim = 3;
          total = minCurvesLim;
          maxCurvesLim = 300;
          lastCurveTime = 0;
          addCurveTime = 300;
          addCurveProb = 0.7;
          addCurveAcc = 0.01;
          minAddCurveTime = 70;
          maxAddCurveTime = 500;
          bezierTime=false;
          bezierStart=0;
          bezierEnd=0;
          bezierDuration=2000;
          bezierCheck=3000;
          minCurves = minCurvesLim;
          maxCurves = maxCurvesLim;
          originalAddCurveTime = addCurveTime;
          bezierProb = 0.2;
        }
      

      p.setup = function() {
        let sketchHolder = document.getElementById("home__img");
        if (sketchHolder.firstChild) {
          sketchHolder.removeChild(sketchHolder.firstChild);
        }
        
        canvasWidth = document.getElementById("home__img").offsetWidth;
        canvas = p.createCanvas(canvasWidth, canvasWidth, p.SVG);
        canvas.parent("home__img");

        
        r = (p.height / 2) - 16;
        
        lastCurveTime = p.millis();
        bezierEnd = p.millis();
        bezierStart = p.millis();
        minCurves = p.random(minCurvesLim, p.floor(maxCurvesLim/4));
        maxCurves = p.random(p.ceil(maxCurvesLim/4), maxCurvesLim);
        
        const tempElement = document.createElement('div');
        tempElement.style.display = 'none';
        document.body.appendChild(tempElement);
        
        tempElement.className = "main-color";
        const computedStyle = getComputedStyle(tempElement);
        mainColor = computedStyle.color;
        document.body.removeChild(tempElement);
      };

      p.draw = function() {
        document.addEventListener("resize", windowResized);

        p.background(255, 255, 255, 0);
        factor += inc;
        strokeW += strokeInc
    
        p.translate(p.width / 2, p.height / 2);
    
        p.noFill();
        
        if ((curves.length <= minCurves) && (p.millis() - lastCurveTime > addCurveTime)){
            curveIncrease = true;
            addCurve();
            lastCurveTime = p.millis();
            minCurves = p.random(minCurvesLim, p.floor(maxCurvesLim/4));
    
        }
        if ((curves.length >= maxCurves) && (p.millis() - lastCurveTime > addCurveTime)){
            curveIncrease = false;
            removeCurve();
            lastCurveTime = p.millis();
            maxCurves = p.random(p.ceil(maxCurvesLim/4), maxCurvesLim);
        }
        if (p.millis() - lastCurveTime > addCurveTime) {
            lastCurveTime = p.millis();
            if (!bezierTime) {
                if (curveIncrease) {
                    if (p.random(0, 1) < addCurveProb) {
                        addCurve();
                    } else {
                        removeCurve();
                    }
    
                } else {
                      if (p.random(0, 1) < addCurveProb) {
                          removeCurve();
                      } else {
                          addCurve();
                      }
                }
            } else {
                if (p.millis() - bezierStart > bezierDuration) {
                    addCurveTime = originalAddCurveTime
                    addCurveAcc = 0.01
                    bezierEnd = p.millis();
                    bezierTime = false;
                }
                if ((!(curves.length > maxCurves)) && (p.random(0,1) < bezierProb)){
                    removeCurve();
                } else if (!(curves.length > maxCurves)){
                    removeCurve();
                }
                if (curveIncrease) addCurve();
            }
        }
        if ((!bezierTime) && (p.millis() - bezierEnd > bezierCheck)) {
          bezierEnd = p.millis();
          bezierStart=p.millis();
          maxCurves = maxCurvesLim;
          addCurveTime = originalAddCurveTime * 0.5;
          bezierTime=true;
        }
    
        addCurveTime *= (1+addCurveAcc);
    
        if (addCurveTime <= minAddCurveTime) {
            addCurveAcc *= -1;
            addCurveTime *= (1 + addCurveAcc);
        }
        if (addCurveTime >= maxAddCurveTime) {
            addCurveAcc *= -1;
            addCurveTime *= (1 + addCurveAcc);
    
        }
        
        let diffFactor = maxFactor - minFactor;
        let diffFactorPoint = (p.random(0, diffFactor) / 2) + minstrokeW;
    
        if (factor > maxFactor) {
            factorIncrease = false;
            inc = -startInc * p.random(1, 3)
            addCurve();
        }
        if (factor < minFactor) {
            factorIncrease = true;
            inc = startInc * p.random(1, 3)
            removeCurve();
        }
        if ((factor > maxFactor - diffFactorPoint) && (factorIncrease)){
            if (p.millis() - lastCurveTime > addCurveTime) {
                inc -= startInc * p.random(0.001, 0.01)
            }
        }
    
        if ((factor < minFactor + diffFactorPoint) && (!factorIncrease)){
            if (p.millis() - lastCurveTime > addCurveTime) {
                inc += startInc * p.random(0.001, 0.01)
            }
        }
    
        let diffStroke = maxstrokeW - minstrokeW;
        let diffStrokePoint = (p.random(0, diffStroke) / 2) + minstrokeW;
        
        if (strokeW > maxstrokeW) {
            strokeIncrease = false;
            strokeInc = -startStrokeInc * p.random(0.01, 1);
        }
        
        if (strokeW < minstrokeW) {
            strokeIncrease = true;
            strokeInc = startStrokeInc * p.random(0.01, 1);
        }
    
        if ((strokeW > maxstrokeW - diffStrokePoint) && (strokeIncrease)){
            if (p.millis() - lastCurveTime > addCurveTime) {
                strokeInc -= startInc * p.map(curves.length, minCurves, maxCurves, 0.1, 0.01)
            }
        }
    
        if ((strokeW < minstrokeW + diffStrokePoint) && (!strokeIncrease)){
            if (p.millis() - lastCurveTime > addCurveTime) {
                strokeInc += startInc * p.map(curves.length, minCurves, maxCurves, 0.1, 0.01)
            }
        }
    
    
        let col = p.color(mainColor);
        // let col = color(82, 119, 122);
        let hueValue = p.floor( p.hue(col) );
        let saturationValue = p.saturation(col);
        let lightnessValue = p.lightness(col);
    
        p.stroke(`hsl(${ hueValue }, ${ saturationValue }%, ${ lightnessValue }%)`);
        
        for (let i = 0; i < curves.length; i++) {
            if (!bezierTime) p.strokeWeight(strokeW/(total-i))
            else{
                let strokeFactor;
                if (p.millis()-bezierEnd < (bezierDuration / 2)) {
                  if (p.millis()-bezierEnd < (bezierDuration / 4)) strokeFactor = p.map(p.millis()-bezierEnd, 0, bezierDuration/4, 1, 5/2)
                  else strokeFactor = p.map(p.millis()-bezierEnd, bezierDuration/4, bezierDuration/2, 5/2, 1)
                }
                else {
                  if (p.millis()-bezierEnd < ((3*bezierDuration) / 4)) strokeFactor = p.map(p.millis()-bezierEnd, bezierDuration/2,((3*bezierDuration) / 4), 1, 5/2)
                  else strokeFactor = p.map(p.millis()-bezierEnd, ((3*bezierDuration) / 4), bezierDuration, 5/2, 1)
                }
                let denominator = total-i;
    
                p.strokeWeight(strokeW/denominator)
            }
            let col = p.color(mainColor);
            let hueValue = p.floor( p.hue(col) );
            let saturationValue = p.saturation(col);
            let lightnessValue = p.lightness(col);
            
            if (i % 1 == 0) {
                saturationValue = 10
                lightnessValue = 30
            }
    
            if (i % 2 == 0) {
                saturationValue += p.random(-10, 20)
            }
            
            if (i % 3 == 0) {
                lightnessValue += p.random(-5, 15)
            }
            
            
            p.stroke(`hsl(${ hueValue }, ${ saturationValue }%, ${ lightnessValue }%)`);
            
            const crv = curves[i];
    
            p.bezier(crv.a.x, crv.a.y, crv.b.x, crv.b.y, crv.c.x, crv.c.y, crv.d.x, crv.d.y);
            
            if (factor > maxFactor) {
                factorIncrease = false;
                inc = -startInc * p.random(1, 3)
            }
            if (factor < minFactor) {
                factorIncrease = true;
                inc = startInc * p.random(1, 3)
            }
        }
        p.strokeWeight(strokeW);
        p.ellipse(0, 0, r * 2);
      };
    };

    var sketchInstance = new p5(sketch);
    return sketchInstance;
  }

  var currentSketch;

  function resizeSketch() {
    if (currentSketch) {
      currentSketch.remove();
    }
    currentSketch = setupSketch();
  }

  window.addEventListener('resize', function() {
    resizeSketch();
  });

  // Run the setup function when the document has loaded
  window.addEventListener('load', function() {
    currentSketch = setupSketch();
  });