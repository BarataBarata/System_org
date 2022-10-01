// app.js
const video = document.getElementById('video');
const button = document.getElementById('button');

button.addEventListener('click', event => {
    const constraints = {
        video: true,
        audio: false
    };
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(error => {
            console.error(error);
        });
});

const select = document.getElementById('select');

function gotDevices(mediaDevices) {
    select.innerHTML = '';
    select.appendChild(document.createElement('option'));
    let count = 1;
    mediaDevices.forEach(mediaDevice => {
        if (mediaDevice.kind === 'videoinput') {
            const option = document.createElement('option');
            option.value = mediaDevice.deviceId;
            const label = mediaDevice.label || `Camera ${count++}`;
            const textNode = document.createTextNode(label);
            option.appendChild(textNode);
            select.appendChild(option);
        }
    });
}

navigator.mediaDevices.enumerateDevices().then(gotDevices);

button.addEventListener('click', event => {
            const videoConstraints = {
                facingMode: 'user'
            };
            const constraints = {
                video: videoConstraints,
                audio: false
            };












            // (function() {
            //     if (!"mediaDevices" in navigator ||
            //         !"getUserMedia" in navigator.mediaDevices
            //     ) {
            //         alert("Camera API is not available in your browser");
            //         return;
            //     }

            //     // get page elements
            //     const video = document.querySelector("#video");
            //     const btnPlay = document.querySelector("#btnPlay");
            //     const btnPause = document.querySelector("#btnPause");
            //     const btnScreenshot = document.querySelector("#btnScreenshot");
            //     const btnChangeCamera = document.querySelector("#btnChangeCamera");
            //     const screenshotsContainer = document.querySelector("#screenshots");
            //     const canvas = document.querySelector("#canvas");
            //     const devicesSelect = document.querySelector("#devicesSelect");

            //     // video constraints
            //     const constraints = {
            //         video: {
            //             width: {
            //                 min: 1280,
            //                 ideal: 1920,
            //                 max: 2560,
            //             },
            //             height: {
            //                 min: 720,
            //                 ideal: 1080,
            //                 max: 1440,
            //             },
            //         },
            //     };

            //     // use front face camera
            //     let useFrontCamera = true;

            //     // current video stream
            //     let videoStream;

            //     // handle events
            //     // play
            //     btnPlay.addEventListener("click", function() {
            //         video.play();
            //         btnPlay.classList.add("is-hidden");
            //         btnPause.classList.remove("is-hidden");
            //     });

            //     // pause
            //     btnPause.addEventListener("click", function() {
            //         video.pause();
            //         btnPause.classList.add("is-hidden");
            //         btnPlay.classList.remove("is-hidden");
            //     });

            //     // take screenshot
            //     btnScreenshot.addEventListener("click", function() {
            //         const img = document.createElement("img");
            //         canvas.width = video.videoWidth;
            //         canvas.height = video.videoHeight;
            //         canvas.getContext("2d").drawImage(video, 0, 0);
            //         img.src = canvas.toDataURL("image/png");
            //         screenshotsContainer.prepend(img);
            //     });

            //     // switch camera
            //     btnChangeCamera.addEventListener("click", function() {
            //         useFrontCamera = !useFrontCamera;

            //         initializeCamera();
            //     });

            //     // stop video stream
            //     function stopVideoStream() {
            //         if (videoStream) {
            //             videoStream.getTracks().forEach((track) => {
            //                 track.stop();
            //             });
            //         }
            //     }

            //     // initialize
            //     async function initializeCamera() {
            //         stopVideoStream();
            //         constraints.video.facingMode = useFrontCamera ? "user" : "environment";

            //         try {
            //             videoStream = await navigator.mediaDevices.getUserMedia(constraints);
            //             video.srcObject = videoStream;
            //         } catch (err) {
            //             alert("Could not access the camera");
            //         }
            //     }

            //     initializeCamera();
            // })();