prediction_1 = "";

Webcam.set({
    width:350,
    height:300,
    image_format:"png",
    png_quality:90
});

webcam = document.getElementById("camera");

Webcam.attach("#camera");

function TakeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='snapshot' src='" + data_uri + "'>";
    });
};

console.log('ml5.version', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/sKR2S36ri/model.json", modelReady);

function modelReady() {
    console.log("Model Ready!");
};

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The Prediction is " +prediction_1;
    var utterThis = new SpeechSynthesisUtterance (speak_data_1);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("snapshot");
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);

        document.getElementById("result_emotion_name").innerHTML = results[0].label;
       

        prediction_1 = results[0].label;
        console.log(prediction_1);
        speak();
        
        if (results[0].label = "Thumbs Up") {
            document.getElementById("emoji").innerHTML ="&#128076;";
            }
        if (results[0].label = "Thumbs Down") {
         document.getElementById("emoji").innerHTML ="&#128077;";
            }
        if (results[0].label = "Victory") {
            document.getElementById("emoji").innerHTML ="&#128078;";
                }
    }
}