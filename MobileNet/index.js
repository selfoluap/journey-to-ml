let mobilenet;
let img;
let canvas;
let label;
let prob;

function modelReady() {
    console.log("Model is ready.");
}

//error first pattern
function gotResults(err, data){
    if(err){
        console.error(err);
    }
    else {
        console.log(data);
        label = data[0].label;
        prob = data[0].confidence;
    }
}

function predictAnimal(){
    mobilenet.predict(img, gotResults);
}

function receivedImage(file) {
    img = createImg(file.data, "", "", predictAnimal).hide();
}

function setup(){
    canvas = createCanvas(1080, 720);
    background(0);
    mobilenet = ml5.imageClassifier('MobileNet', modelReady);
    canvas.drop(receivedImage);
}

function draw() {
    if(img) {
        image(img, 0, 0, width, height);
        fill(0);
        textSize(50);
        text(label, 0, height-100);
        text(prob, 0, height-50);
    }
}