// // Import p5.js library

// // Import your separate files
// import * as stage1 from './stage1.js';
// import * as stage2 from './stage2.js';
// import * as stage3 from './stage3.js';
// import * as movingPerformer from './movingPerformer.js';

// // Define your p5.js sketches for each stage
// const sketches = {
//     stage1: {
//         sketch: stage1
//     },
//     stage2: {
//         sketch: stage2
//     },
//     stage3: {
//         sketch: stage3
//     }
// };


// function setup() {
//     const canvas = createCanvas(windowWidth, windowHeight);
//     canvas.parent('p5sketch');
//     loadSketch(currentStage);
    
//     const stage1Button = document.getElementById('stage1Button');
//     const stage2Button = document.getElementById('stage2Button');
//     const stage3Button = document.getElementById('stage3Button');
//     const toggleMovingButton = document.getElementById('toggleMovingButton');
    
//     stage1Button.addEventListener('click', () => loadSketch('stage1'));
//     stage2Button.addEventListener('click', () => loadSketch('stage2'));
//     stage3Button.addEventListener('click', () => loadSketch('stage3'));
//     toggleMovingButton.addEventListener('click', toggleMovingPerformer);
// }

// let currentSketch = null;
// let currentStage = 'stage1';

// function draw() {
//     if (currentSketch) {
//         currentSketch.sketch();
//     }
// }

// function loadSketch(stage) {
//     if (currentSketch) {
//         currentSketch.moving = false;
//         currentSketch = null;
//     }

//     currentStage = stage;
//     currentSketch = sketches[stage];
//     resizeCanvas(windowWidth, windowHeight);
// }

// function toggleMovingPerformer() {
//     if (currentSketch) {
//         currentSketch.moving = !currentSketch.moving;
//     }
// }

const embedLinks = {
    stage1: 'https://editor.p5js.org/qcuincy/full/VoaIvusJL',
    stage2: 'https://editor.p5js.org/qcuincy/full/z2HWIQ_bK',
    stage3: 'https://editor.p5js.org/qcuincy/full/KFBZ3_xm-',
    movingstage1: 'https://editor.p5js.org/qcuincy/full/Zl6sxLj2f',
    movingstage2: 'https://editor.p5js.org/qcuincy/full/smYOhdTsi',
    movingstage3: 'https://editor.p5js.org/qcuincy/full/ITJUVLiOH'
};

let currentStage = 'stage1';
let currentPerformer = '';

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('p5sketchContainer');
    loadEmbed(currentStage);
    
    const stationaryButton = document.getElementById('stationaryButton');
    const movingButton = document.getElementById('movingButton');
    const stage1Button = document.getElementById('stage1Button');
    const stage2Button = document.getElementById('stage2Button');
    const stage3Button = document.getElementById('stage3Button');


    // Need to ensure that if the stationary performer button is active, the "stage1", "stage2", and "stage3" buttons load the stationary sketches
    stationaryButton.addEventListener('click', () => {
        loadEmbed(currentStage);
        updateActivePerfButton(stationaryButton);
    });

    // Likewise, if the moving performer button is active, the "stage1", "stage2", and "stage3" buttons load the moving sketches
    movingButton.addEventListener('click', () => {
        console.log(`moving${currentStage}`)
        loadEmbed(`moving${currentStage}`);
        updateActivePerfButton(movingButton);
    });
    

    stage1Button.addEventListener('click', () => {
        loadEmbed(`${currentPerformer}stage1`);
        updateActiveStageButton(stage1Button);
    });
    stage2Button.addEventListener('click', () => {
        loadEmbed(`${currentPerformer}stage2`);
        updateActiveStageButton(stage2Button);
    });
    stage3Button.addEventListener('click', () => {
        loadEmbed(`${currentPerformer}stage3`);
        updateActiveStageButton(stage3Button);
    });
    
}

function loadEmbed(stage) {
    const embedContainer = document.getElementById('p5sketchContainer');
    embedContainer.querySelectorAll('iframe').forEach(iframe => {
        iframe.style.display = 'none';
    });

    const embedLink = embedLinks[stage];
    console.log(stage.charAt(stage.length-1))
    const iframe = document.getElementById(`stage${stage.charAt(stage.length-1)}Embed`);
    iframe.src = embedLink;
    iframe.style.display = 'block';
    
}

function updateActiveStageButton(activeButton) {
    const buttons = document.querySelectorAll('.stage__button');
    buttons.forEach(button => {
        button.classList.remove('qualification__active');
    });
    activeButton.classList.add('qualification__active');
}

function updateActivePerfButton(activeButton) {
    const buttons = document.querySelectorAll('.perf__button');
    buttons.forEach(button => {
        button.classList.remove('qualification__active');
    });
    activeButton.classList.add('qualification__active');

    if (activeButton.id === 'stationaryButton') {
        currentPerformer = '';
    } else {
        currentPerformer = 'moving';
    }
}

