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


function setup() {
    canvasWidth = document.getElementById("home__img").offsetWidth;
    var canvas = createCanvas(canvasWidth, canvasWidth, SVG);
    canvas.parent("home__img");

    r = height / 2 - 16;

    lastCurveTime = millis();
    bezierEnd = millis();
    bezierStart = millis();
    minCurves = random(minCurvesLim, floor(maxCurvesLim/4));
    maxCurves = random(ceil(maxCurvesLim/4), maxCurvesLim);

    const tempElement = document.createElement('div');
    tempElement.style.display = 'none';
    document.body.appendChild(tempElement);

    tempElement.className = "main-color";
    const computedStyle = getComputedStyle(tempElement);
    mainColor = computedStyle.color;
    document.body.removeChild(tempElement);
}



function getVector(index, total) {
    const angle = map(index % total, 0, total, 0, TWO_PI);
    const v = p5.Vector.fromAngle(angle + PI);
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

function draw() {

    background(255, 255, 255, 0);
    factor += inc;
    strokeW += strokeInc

    translate(width / 2, height / 2);

    noFill();
    
    if ((curves.length <= minCurves) && (millis() - lastCurveTime > addCurveTime)){
        curveIncrease = true;
        addCurve();
        lastCurveTime = millis();
        minCurves = random(minCurvesLim, floor(maxCurvesLim/4));

    }
    if ((curves.length >= maxCurves) && (millis() - lastCurveTime > addCurveTime)){
        curveIncrease = false;
        removeCurve();
        lastCurveTime = millis();
        maxCurves = random(ceil(maxCurvesLim/4), maxCurvesLim);
    }
    if (millis() - lastCurveTime > addCurveTime) {
        lastCurveTime = millis();
        if (!bezierTime) {
            if (curveIncrease) {
                if (random(0, 1) < addCurveProb) {
                    addCurve();
                } else {
                    removeCurve();
                }

            } else {
                  if (random(0, 1) < addCurveProb) {
                      removeCurve();
                  } else {
                      addCurve();
                  }
            }
        } else {
            if (millis() - bezierStart > bezierDuration) {
                addCurveTime = originalAddCurveTime
                addCurveAcc = 0.01
                bezierEnd = millis();
                bezierTime = false;
            }
            if ((!(curves.length > maxCurves)) && (random(0,1) < bezierProb)){
                removeCurve();
            } else if (!(curves.length > maxCurves)){
                removeCurve();
            }
            if (curveIncrease) addCurve();
        }
    }
    if ((!bezierTime) && (millis() - bezierEnd > bezierCheck)) {
      bezierEnd = millis();
      bezierStart=millis();
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
    let diffFactorPoint = (random(0, diffFactor) / 2) + minstrokeW;

    if (factor > maxFactor) {
        factorIncrease = false;
        inc = -startInc * random(1, 3)
        addCurve();
    }
    if (factor < minFactor) {
        factorIncrease = true;
        inc = startInc * random(1, 3)
        removeCurve();
    }
    if ((factor > maxFactor - diffFactorPoint) && (factorIncrease)){
        if (millis() - lastCurveTime > addCurveTime) {
            inc -= startInc * random(0.001, 0.01)
        }
    }

    if ((factor < minFactor + diffFactorPoint) && (!factorIncrease)){
        if (millis() - lastCurveTime > addCurveTime) {
            inc += startInc * random(0.001, 0.01)
        }
    }

    let diffStroke = maxstrokeW - minstrokeW;
    let diffStrokePoint = (random(0, diffStroke) / 2) + minstrokeW;
    
    if (strokeW > maxstrokeW) {
        strokeIncrease = false;
        strokeInc = -startStrokeInc * random(0.01, 1);
    }
    
    if (strokeW < minstrokeW) {
        strokeIncrease = true;
        strokeInc = startStrokeInc * random(0.01, 1);
    }

    if ((strokeW > maxstrokeW - diffStrokePoint) && (strokeIncrease)){
        if (millis() - lastCurveTime > addCurveTime) {
            strokeInc -= startInc * map(curves.length, minCurves, maxCurves, 0.1, 0.01)
        }
    }

    if ((strokeW < minstrokeW + diffStrokePoint) && (!strokeIncrease)){
        if (millis() - lastCurveTime > addCurveTime) {
            strokeInc += startInc * map(curves.length, minCurves, maxCurves, 0.1, 0.01)
        }
    }


    let col = color(mainColor);
    // let col = color(82, 119, 122);
    let hueValue = floor( hue(col) );
    let saturationValue = saturation(col);
    let lightnessValue = lightness(col);

    stroke(`hsl(${ hueValue }, ${ saturationValue }%, ${ lightnessValue }%)`);
    
    for (let i = 0; i < curves.length; i++) {
        if (!bezierTime) strokeWeight(strokeW/(total-i))
        else{
            let strokeFactor;
            if (millis()-bezierEnd < (bezierDuration / 2)) {
              if (millis()-bezierEnd < (bezierDuration / 4)) strokeFactor = map(millis()-bezierEnd, 0, bezierDuration/4, 1, 5/2)
              else strokeFactor = map(millis()-bezierEnd, bezierDuration/4, bezierDuration/2, 5/2, 1)
            }
            else {
              if (millis()-bezierEnd < ((3*bezierDuration) / 4)) strokeFactor = map(millis()-bezierEnd, bezierDuration/2,((3*bezierDuration) / 4), 1, 5/2)
              else strokeFactor = map(millis()-bezierEnd, ((3*bezierDuration) / 4), bezierDuration, 5/2, 1)
            }
            let denominator = total-i;

            strokeWeight(strokeW/denominator)
        }
        let col = color(mainColor);
        let hueValue = floor( hue(col) );
        let saturationValue = saturation(col);
        let lightnessValue = lightness(col);
        
        if (i % 1 == 0) {
            saturationValue = 10
            lightnessValue = 30
        }

        if (i % 2 == 0) {
            saturationValue += random(-10, 20)
        }
        
        if (i % 3 == 0) {
            lightnessValue += random(-5, 15)
        }
        
        
        stroke(`hsl(${ hueValue }, ${ saturationValue }%, ${ lightnessValue }%)`);
        
        const crv = curves[i];

        bezier(crv.a.x, crv.a.y, crv.b.x, crv.b.y, crv.c.x, crv.c.y, crv.d.x, crv.d.y);
        
        if (factor > maxFactor) {
            factorIncrease = false;
            inc = -startInc * random(1, 3)
        }
        if (factor < minFactor) {
            factorIncrease = true;
            inc = startInc * random(1, 3)
        }
    }
    strokeWeight(strokeW);
    ellipse(0, 0, r * 2);
}

function resetSketch() {
    window.location.reload();
}

function windowResized(){
    resetSketch();
}