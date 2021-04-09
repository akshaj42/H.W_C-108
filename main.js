//https://teachablemachine.withgoogle.com/models/Q1HatMs3N/

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_Snapshot(){
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML="<img id='captured_image' src="+data_uri+">";
    });
}
console.log("ml5version:", ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Q1HatMs3N/model.json",ModelLoaded);

function ModelLoaded(){
    console.log("Model Loaded!!");
}

function check(){
    img=document.getElementById("captured_image");
    classifier.classify(img ,gotresult);
}

function gotresult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML=results[0].label;
        document.getElementById("result_gesture_name2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();

        if(results[0].label=="Amazing"){
            document.getElementById("update_gesture").innerHTML="&#128076;";
        }

        if(results[0].label=="Right"){
            document.getElementById("update_gesture").innerHTML="&#128073;";
        }

        if(results[0].label=="UP"){
            document.getElementById("update_gesture").innerHTML="&#128070;";
        }

        if(results[0].label=="Thumbs UP"){
            document.getElementById("update_gesture").innerHTML="&#128077;";
        }

        if(results[0].label=="Yo!"){
            document.getElementById("update_gesture").innerHTML="&#129304";
        }

        if(results[1].label=="Amazing"){
            document.getElementById("update_gesture_2").innerHTML="&#128076;";
        }

        if(results[1].label=="Right"){
            document.getElementById("update_gesture_2").innerHTML="&#128073;";
        }

        if(results[1].label=="UP"){
            document.getElementById("update_gesture_2").innerHTML="&#128070;";
        }

        if(results[1].label=="Thumbs Up"){
            document.getElementById("update_gesture_2").innerHTML="&#128077;";
        }

        if(results[1].label=="Yo!"){
            document.getElementById("update_gesture_2").innerHTML="&#129304";
        }

    }
}

function speak(){
        var synth=window.speechSynthesis;
        var speakdata1= "The first prediction is "+prediction1;
        var speakdata2= "And the second prediction is "+prediction2;
        var utterThis=new SpeechSynthesisUtterance(speakdata1+speakdata2);
        synth.speak(utterThis);
}