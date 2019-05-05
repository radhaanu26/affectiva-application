const app = document.querySelector("#app");

const startBtn = document.querySelector("#start-button");

const stopBtn = document.querySelector("#stop-button");

// const results = document.querySelector("#results");

 

let started = false;

 

// The captured frame's width in pixels

const width = 640;

 

// The captured frame's height in pixels

const height = 480;

 

/*

   Face detector configuration - If not specified, defaults to

   affdex.FaceDetectorMode.LARGE_FACES

   affdex.FaceDetectorMode.LARGE_FACES=Faces occupying large portions of the frame

   affdex.FaceDetectorMode.SMALL_FACES=Faces occupying small portions of the frame

*/

const faceMode = affdex.FaceDetectorMode.LARGE_FACES;

 

//Construct a CameraDetector and specify the image width / height and face detector mode.

const detector = new affdex.CameraDetector(app, width, height, faceMode);

// Track smiles

detector.detectExpressions.smile = true;

 

// Track joy emotion

detector.detectEmotions.joy = true;

 

// Detect person's gender

detector.detectAppearance.gender = true;

detector.detectAllEmotions();

detector.detectAllExpressions();

 

startBtn.addEventListener("click", function () {

    if (!started) {

        started = true;

        detector.start();

    }

});

 

stopBtn.addEventListener("click", function () {

    if (started) {

        started = false;

        detector.stop();

        // download file

 

        const headers = {

            time: 'Time',

            gender: 'Gender',

            anger: 'Anger',

            disgust: 'Disgust',

            fear: 'Fear',

            joy: 'Joy',

            sadness: 'Sadness',

            surprise: 'Surprise',

            attention: 'Attention',

            browFurrow: 'BrowFurrow',

            browRaise: 'BrowRaise',

            cheekRaise: 'CheekRaise',

            chinRaise: 'ChinRaise',

            dimpler: 'Dimpler',

            eyeClosure: 'EyeClosure',

            eyeWiden: 'EyeWiden',

            innerBrowRaise: 'InnerBrowRaise',

            jawDrop: 'jawDrop',

            lidTighten: 'LidTighten',

            lipCornerDepressor: 'LipCornerDepressor',

            lipPress: 'LipPress',

            lipPucker: 'LipPucker',

            lipStretch: 'LipStretch',

            lipSuck: 'LipSuck',

            mouthOpen: 'MouthOpen',

            noseWrinkle: 'NoseWrinkle',

            smile: 'Smile',

            smirk: 'Smirk',

            upperLipRaise: 'UpperLipRaise'

           

        }

 

         exportCSVFile(headers, data, 'abc');

    }

});

 

detector.addEventListener("onInitializeSuccess", function() {

    console.log('initialized successfully');

});

detector.addEventListener("onInitializeFailure", function() {

    console.log('initialize failed');

});

 

detector.addEventListener("onWebcamConnectSuccess", function() {

    console.log("I was able to connect to the camera successfully.");

});

 

detector.addEventListener("onWebcamConnectFailure", function() {

    console.log("I've failed to connect to the camera :(");

});

 

/*

  onImageResults success is called when a frame is processed successfully and receives 3 parameters:

  - Faces: Dictionary of faces in the frame keyed by the face id.

           For each face id, the values of detected emotions, expressions, appearane metrics

           and coordinates of the feature points

  - image: An imageData object containing the pixel values for the processed frame.

  - timestamp: The timestamp of the captured image in seconds.

*/

const data = [];

detector.addEventListener("onImageResultsSuccess", function (faces, image, timestamp) {

    if (faces.length) {

        const face = faces[0];

        console.log(face);

        // results.innerHTML = `

        //     <p>Gender : ${face.appearance.gender}</p>

        //     <p>Joy : ${face.emotions.joy}</p>

        //     <p>Smile : ${face.expressions.smile}</p>

        // `;

        myChart.data.datasets.forEach((dataset) => {

            dataset.data = [

                face.emotions.anger,

                face.emotions.disgust,

                face.emotions.fear,

                face.emotions.joy,

                face.emotions.sadness,

                face.emotions.surprise

            ];

        });

        myChart.update();

        const now = new Date();

        data.push({

            time: now.getTime(),

            gender: face.appearance.gender,

            anger: face.emotions.anger,

            disgust: face.emotions.disgust,

            fear: face.emotions.fear,

            joy: face.emotions.joy,

            sadness: face.emotions.sadness,

            surprise: face.emotions.surprise,          

            attention: face.expressions.attention,

            browFurrow: face.expressions.browFurrow,

            browRaise: face.expressions.browRaise,

            cheekRaise: face.expressions.cheekRaise,

            chinRaise: face.expressions.chinRaise,

            dimpler: face.expressions.dimpler,

            eyeClosure: face.expressions.eyeClosure,

            eyeWiden: face.expressions.eyeWiden,

            innerBrowRaise: face.expressions.innerBrowRaise,

            jawDrop: face.expressions.jawDrop,

            lidTighten: face.expressions.lidTighten,

            lipCornerDepressor: face.expressions.lipCornerDepressor,

            lipPress: face.expressions.lipPress,

            lipPucker: face.expressions.lipPucker,

            lipStretch: face.expressions.lipStretch,

            lipSuck: face.expressions.lipSuck,

            mouthOpen: face.expressions.mouthOpen,

            noseWrinkle: face.expressions.noseWrinkle,

            smile: face.expressions.smile,

            smirk: face.expressions.smirk,

            upperLipRaise: face.expressions.upperLipRaise     

           

        });

    }

});

 

/*

  onImageResults success receives 3 parameters:

  - image: An imageData object containing the pixel values for the processed frame.

  - timestamp: An imageData object contain the pixel values for the processed frame.

  - err_detail: A string contains the encountered exception.

*/

detector.addEventListener("onImageResultsFailure", function (image, timestamp, err_detail) {});

 

function convertToCSV(objArray) {

    var array = objArray;

    var str = '';

 

    for (var i = 0; i < array.length; i++) {

        var line = '';

        for (var index in array[i]) {

            if (line != '') {

                line += ',';

            }

            line += array[i][index];

        }

 

        str += line + '\r\n';

    }

 

    return str;
