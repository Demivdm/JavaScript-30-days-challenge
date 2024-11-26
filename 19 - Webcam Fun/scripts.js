const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
    //user webcam ophalen
    navigator.mediaDevices.getUserMedia({
        //hier komt een promise uit
        video:true,
        audio: false
    })
    .then(localMediaStream => {
        console.log(localMediaStream)
        //video moet in een url veranderd worden om de live updates te zien
        // anders is localmediastream alleen een object
        video.srcObject = localMediaStream
        video.play()
    })
    //fallback voor als de webcam er niet is of er geen toestemming wordt gegeven
    .catch(error =>{
        console.error(`ERR NEWWR, did you deny the cam??`, err)
    })
}

//Webcam moet naar canvas worden verplaatst zodat we er meer mee kunnen doen
function paintToCanvas(){
    const width = video.videoWidth;
    const height = video.videoHeight;
    //canvas moet even groot zijn als de webcam
    canvas.width = width
    canvas.height = height

    //maak foto van de webcam en stop het in het canvas
    //voeg return toe zodat je meer toegang krijgt tot de interval voor het geval deze gestopt moet worden
   return setInterval(()=>{
        //0,0 is de startpositie
        ctx.drawImage(video, 0, 0, width,height)
        // om filters te maken haal je de pixels op van het canvas
        let pixels = ctx.getImageData(0, 0, width, height);
        // je voegt het effect toe
        // pixels = redEffect(pixels)
        // pixels = rgbSplit(pixels)
        //  pixels = greenScreen(pixels)


        //stackt de kleuren met een delay
        ctx.globalAlpha = 0.1

        //en je zet de pixels terug op het canvas
        ctx.putImageData(pixels,0,0)

    },16)

}

function takePhoto(){
    //geluid afspelen
    snap.currentTime = 0
    snap.play()
    //data uit canvas ophalen
    //uit data komt de foto in tekst vorm
    const data = canvas.toDataURL('img/jpeg')
    //creeer een link
    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download', 'cutie')
    link.innerHTML = `<img src="${data}" alt="Cutie">`
    // wat doet dit??
    strip.insertBefore(link, strip.firstChild)
 
}
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
         //+ 4 voor de 4 verschillende waardes uit rgba
    // met deze loop krijgen we toegang tot iedere groep met pixels
      pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
      pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
      pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
  }

  function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i - 150] = pixels.data[i + 0]; // RED
      pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
      pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
  }
//met de greenscreen functie wil je alle kleuren hebben tussen de rgb kleuren
  function greenScreen(pixels) {
    //object met levels
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
      // als het tussen de kleuren in zit, haal het er dan uit
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }}

getVideo()

video.addEventListener('canplay',paintToCanvas )