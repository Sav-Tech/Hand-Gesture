Webcam .set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach (camera)

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4bzleGiZV/model.json',modelLoaded)
function modelLoaded(){
    console.log('Model Loaded');
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data_1="The prediction is " + prediction_1;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1);
    synth.speak(utterThis);
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img,gotResults);
}

function gotResults(error,results) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(results);

        prediction_1 = results[0].label;
        prediction_2=results[1].label;
        document.getElementById("result_emotion_name").innerHTML= prediction_1;
        
    
        speak()

if(prediction_1 == "Ok"){
    document.getElementById("update_emoji").innerHTML = "&#128076;"
}

if(prediction_1 == "Good"){
    document.getElementById("update_emoji").innerHTML = "&#128077;"
}

if(prediction_1 == "Bad"){
    document.getElementById("update_emoji").innerHTML = "&#128078;"
}
}
}

