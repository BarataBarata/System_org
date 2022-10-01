function loadCamera() {

    const nameImage = "";
    //Captura elemento de vídeo
    var video = document.querySelector("#webCamera");
    //As opções abaixo são necessárias para o funcionamento correto no iOS
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    //--

    //Verifica se o navegador pode capturar mídia
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: false, video: { facingMode: 'user' } })
            .then(function(stream) {
                //Definir o elemento víde a carregar o capturado pela webcam
                video.srcObject = stream;
            })
            .catch(function(error) {
                alert("Oooopps... Falhou :'(");
            });
    }
}

function takeSnapShot() {
    //Captura elemento de vídeo
    var video = document.querySelector("#webCamera");

    //Criando um canvas que vai guardar a imagem temporariamente
    var canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    var ctx = canvas.getContext('2d');

    //Desnehando e convertendo as minensões
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    //Criando o JPG
    var dataURI = canvas.toDataURL('image/jpeg'); //O resultado é um BASE64 de uma imagem.
    document.querySelector("#base_img").value = dataURI;

    sendSnapShot(dataURI); //Gerar Imagem e Salvar Caminho no Banco


    document.getElementById("webCamera").style.display = "none";
    document.getElementById("btnTirarFoto").style.display = "none";
    document.getElementById("repetirfoto").style.display = "block";
    document.getElementById("imagemConvertida").style.display = "block";
}

function vidOff() {
    const video = document.querySelector('video');

    // A video's MediaStream object is available through its srcObject attribute
    const mediaStream = video.srcObject;

    // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
    const tracks = mediaStream.getTracks();

    // Tracks are returned as an array, so if you know you only have one, you can stop it with: 
    tracks[0].stop();

    // Or stop all like so:
    tracks.forEach(track => track.stop())
}

function repetirfoto() {

    document.getElementById("webCamera").style.display = "block";
    document.getElementById("btnTirarFoto").style.display = "block";
    document.getElementById("repetirfoto").style.display = "none";
    document.getElementById("imagemConvertida").style.display = "none";



}

function sendSnapShot(base64) {
    var request = new XMLHttpRequest();
    request.open('POST', 'SRC/USUARIO/SCRIPTS/COMUM/webcam-snapshot-master/save_photos.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    request.onload = function() {
        console.log(request);
        if (request.status >= 200 && request.status < 400) {
            //Colocar o caminho da imagem no SRC
            var data = JSON.parse(request.responseText);
            nameImage = data.name;

            //verificar se houve erro
            if (data.error) {
                alert(data.error);
                return false;
            }

            //Mostrar informações
            document.querySelector("#imagemConvertida").setAttribute("src", "SRC/USUARIO/SCRIPTS/COMUM/webcam-snapshot-master/" + data.img);
            document.querySelector("#caminhoImagem a").setAttribute("href", data.img);
            document.querySelector("#caminhoImagem a").innerHTML = data.img.split("/")[1];
        } else {
            alert("Erro ao salvar. Tipo:" + request.status);
        }
    };

    request.onerror = function() {
        alert("Erro ao salvar. Back-End inacessível.");
    }

    request.send("base_img=" + base64); // Enviar dados
}


loadCamera();