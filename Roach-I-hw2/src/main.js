/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

const drawParams = {
  showGradient  : false,
  showBars      : true,
  showCircles   : false,
  showNoise     : false,
  showInvert    : false,
  showEmboss    : false
};

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/Dialga's Fight to the Finish.mp3"
});
let lowshelf = false;
let highshelf = false;


const init = () => {
  
  loadJsonXHR();

  audio.setupWebaudio(DEFAULTS.sound1);
  
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element

  



	setupUI(canvasElement);
  canvas.setupCanvas(canvasElement, audio.analyserNode);
  loop();
}

const loadJsonXHR = () =>
{
  const url = "data/av-data.json";
  const xhr = new XMLHttpRequest();
  xhr.onload = (e) => {
    console.log(`In onload - HTTP Status Code = ${e.target.status}`);
    const string = e.target.responseText;
    let json;
    try {
      json = JSON.parse(string);
    } catch (err) {
      console.log(`ERROR: ${err}`);
      document.querySelector("#output").innterHTML = "JSON ERROR";
      return;
    }

    // get values from json
    //document.querySelector("#cb-highshelf").checked = json.uiState.treble;
    drawParams.showBars = json.uiState.showBars

    if(json.uiState.treble)
    {
      highshelf = document.querySelector("#cb-highshelf").checked = json.uiState.treble;
      toggleHighshelf();
    }

    if(json.uiState.bass)
    {
      lowshelf = document.querySelector("#cb-lowshelf").checked = json.uiState.bass;
      toggleLowshelf();
    }

    if(json.uiState.domainData)
    {
      document.querySelector("#cb-timedomain").checked = json.uiState.domainData;
      canvas.ToggleDataType();
    }
    document.querySelector("#output").innerHTML = `Track: ${json.audio.name}`;

    document.querySelector("#title").innerHTML = `${json.Title}`;
  }
  xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
  xhr.open("GET", url);
  xhr.send();
}



const setupUI = (canvasElement) => {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#btn-fs");
  const playButton = document.querySelector("#btn-play");
  const barsCB = document.querySelector("#cb-bars");

  // Filters
  document.querySelector('#cb-highshelf').checked = highshelf; // `highshelf` is a boolean we will declare in a second
  document.querySelector('#cb-lowshelf').checked = lowshelf;

  document.querySelector('#cb-highshelf').onchange = e => {
    highshelf = e.target.checked;
    toggleHighshelf(); // turn on or turn off the filter, depending on the value of `highshelf`!
  };

  document.querySelector('#cb-lowshelf').onchange = e => {
    lowshelf = e.target.checked;
    toggleLowshelf(); // turn on or turn off the filter, depending on the value of `highshelf`!
  };

  toggleHighshelf();
  toggleLowshelf();

  // Time Domain Toggle
  document.querySelector('#cb-timedomain').onchange = e => {
    canvas.ToggleDataType();
  }

  barsCB.onchange = e => {
    drawParams.showBars = !drawParams.showBars;
  }

  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("init called");
    utils.goFullscreen(canvasElement);
  };

  playButton.onclick = e => {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    if (audio.audioCtx.state == "suspended")
    {
        audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if (e.target.dataset.playing == "no") {
        // if track is currently paused, play it
        audio.playCurrentSound();
        e.target.dataset.playing = "yes"; // our CSS will set the text to Pause
      

        // if track is playing, pause it
    } else {
        audio.pauseCurrentSound();
        e.target.dataset.playing = "no"; // our CSS will set the text to "play"
        audio.audioCtx.suspend();
    }
  };
	
  let volumeSlider = document.querySelector("#slider-volume");
  let volumeLabel = document.querySelector("#label-volume");

  // add .oninput event to slider
  volumeSlider.oninput = e => {
    // set the gain
    audio.setVolume(e.target.value);
    //update value of label to match value of slider
    volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
  };

  // set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  // D - hookup track <select>
  // let trackSelect = document.querySelector("#track-select");
  // // add.onchange event to <select>
  // trackSelect.onchange = e => {
  //   let file = e.target.value;
  //   audio.loadSoundFile(file);
  //   // pause the current track if it is playing
  //   if (playButton.dataset.playing == "yes") {
  //       playButton.dispatchEvent(new MouseEvent("click"));
  //   }
  // }

} // end setupUI

const loop = () => {
    // /* NOTE: This is temporary testing code that we will delete in Part II */
    // For drawing sprite across screen use (canvas width / duration of song / fps)
    setTimeout(loop, 1000/60);
    //requestAnimationFrame(loop);
    canvas.draw(drawParams);
    //     // 1) create a byte array (values of 0-255) to hold the audio data
    //     // normally, we do this once when the program starts up, NOT every frame
    //     let audioData = new Uint8Array(audio.analyserNode.fftSize/2);
        
    //     // 2) populate the array of audio data *by reference* (i.e. by its address)
    //     audio.analyserNode.getByteFrequencyData(audioData); //audio.analyserNode.getByteTimeDomainData(data); // waveform data
        
    //     // 3) log out the array and the average loudness (amplitude) of all of the frequency bins
    //         console.log(audioData);
            
    //         console.log("-----Audio Stats-----");
    //         let totalLoudness =  audioData.reduce((total,num) => total + num);
    //         let averageLoudness =  totalLoudness/(audio.analyserNode.fftSize/2);
    //         let minLoudness =  Math.min(...audioData); // ooh - the ES6 spread operator is handy!
    //         let maxLoudness =  Math.max(...audioData); // ditto!
    //         // Now look at loudness in a specific bin
    //         // 22050 kHz divided by 128 bins = 172.23 kHz per bin
    //         // the 12th element in array represents loudness at 2.067 kHz
    //         let loudnessAt2K = audioData[11]; 
    //         console.log(`averageLoudness = ${averageLoudness}`);
    //         console.log(`minLoudness = ${minLoudness}`);
    //         console.log(`maxLoudness = ${maxLoudness}`);
    //         console.log(`loudnessAt2K = ${loudnessAt2K}`);
    //         console.log("---------------------");
    }

    function toggleHighshelf(){
      if(highshelf){
          audio.biquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime); // we created the `biquadFilter` (i.e. "treble") node last time
          audio.biquadFilter.gain.setValueAtTime(10, audio.audioCtx.currentTime);
      }else{
          audio.biquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
      }   
  }

  function toggleLowshelf(){
      if(lowshelf){
          audio.lowShelfBiquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime);
          // gets current time of song audio.audioCtx.currentTime
          audio.lowShelfBiquadFilter.gain.setValueAtTime(10, audio.audioCtx.currentTime);
      }else{
          audio.lowShelfBiquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
      }
  }


export {init};