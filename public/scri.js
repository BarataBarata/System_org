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