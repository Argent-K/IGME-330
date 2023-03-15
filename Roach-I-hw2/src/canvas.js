/*
	The purpose of this file is to take in the analyser node and a <canvas> element:
	  - the module will create a drawing context that points at the <canvas>
	  - it will store the reference to the analyser node
	  - in draw(), it will loop through the data in the analyser node
	  - and then draw something representative on the canvas
	  - maybe a better name for this file/module would be *visualizer.js* ?
*/
class DurationTrack {

    // using current time / duration to get % of song time
    // then width * % = location of sprite
    constructor(x, y, radius=5, color="white", duration)
    {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.duration = duration;
    }

    draw(ctx)
    {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = `rgba(${Math.sin(this.x) * 255},${Math.cos(this.x) * 255},${Math.tan(this.x) * 255},1)`;
        //ctx.fillStyle = `rgb(${},${-128},${255-})`;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    update()
    {

        if(audio.audioCtx.state != "suspended")
        this.x = (canvasWidth * ((audio.audioCtx.currentTime  + 1) / this.duration));



    }
}

class PhylloFLower {
    constructor(centerX, centerY, divergence, c)
    {
        this.n = 0;
        this.centerX = centerX;
        this.centerY = centerY;
        this.divergence = divergence;
        this.c = c;
    }

    update()
    {
        if(audio.audioCtx.state != "suspended")
        this.n++;
        if(audio.audioCtx.currentTime % 10 == 0)
        this.n = 0;
    }

    draw(ctx)
    {
            let a = this.n * this.dtr(this.divergence);
		    let r = this.c * Math.sqrt(this.n);
		    let x = r * Math.cos(a) + this.centerX;
		    let y = r * Math.sin(a) + this.centerY;
		    let color = `hsl(${audio.audioCtx.currentTime % 361},100%,50%)`;
            this.drawCircle(ctx, x, y, 2, color);
    }

    dtr(degrees) {
        return degrees * (Math.PI/180);
    }

    drawCircle(ctx,x,y,radius,color){
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x,y,radius,0,Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

}

import * as audio from './audio.js';
//import { audioCtx } from './audio.js';
import * as utils from './utils.js';

let ctx,canvasWidth,canvasHeight,gradient,analyserNode,audioData;
let toggleDataType = false;
let pauseSprites = true;
let background;
let imgLoaded = false;

let sprites = [];

const setupCanvas = (canvasElement,analyserNodeRef) => {
	// create drawing context
	ctx = canvasElement.getContext("2d");
	canvasWidth = canvasElement.width;
	canvasHeight = canvasElement.height;
	// create a gradient that runs top to bottom
	gradient = utils.getLinearGradient(ctx,0,0,0,canvasHeight,[{percent:0,color:"AliceBlue"},{percent:.25,color:"Aqua"},{percent:.5,color:"CornflowerBlue"},{percent:.75,color:"blue"},{percent:1,color:"black"}]);
	// keep a reference to the analyser node
	analyserNode = analyserNodeRef;
	// this is the array where the analyser data will be stored
	audioData = new Uint8Array(analyserNode.fftSize/2);


    background = new Image();
    background.src = "media/grovyle.png";
    background.onload = () => {
        // 3.125
        ctx.drawImage(background, 0,0, background.width * 3.125, background.height * 3.125);
        console.log(background.width, background.height);
        imgLoaded = true;
    }

    sprites.push(new DurationTrack(0, 250, 5, "red", 249));
    sprites.push(new PhylloFLower(167, 64, 137.7, 1));

}

const draw = (params={}) => {
  // 1 - populate the audioData array with the frequency data from the analyserNode
	// notice these arrays are passed "by reference"
    if(toggleDataType == false)
    {
        analyserNode.getByteFrequencyData(audioData);
    }
	else {
        analyserNode.getByteTimeDomainData(audioData);
    }
	// OR
	//analyserNode.getByteTimeDomainData(audioData); // waveform data

	// 2 - draw background
	ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    //ctx.fillRect(0,0,canvasWidth,canvasHeight);
    if (imgLoaded == true)
    ctx.drawImage(background, 0, 0, background.width * 3.125, background.height * 3.125);
    ctx.restore();

    sprites.forEach(s => {
        s.update();
        s.draw(ctx);
    });


	// 3 - draw gradient
	if(params.showGradient) {
        ctx.save();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = .3;
        ctx.fillRect(0,0,canvasWidth,canvasHeight);


        ctx.restore();
    }
	// 4 - draw bars
	if(params.showBars) {
        let barSpacing = 4;
        let margin = 5;
        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2;
        let barWidth = screenWidthForBars / audioData.length;
        let barHeight = 200;
        let topSpacing = 100;

        // ctx.save();
        // ctx.fillStyle = 'rgba(255,255,255,0.50)';
        // ctx.strokeStyle = 'rgba(0,0,0,0.50)';
        // // loop through the data and draw!
        // for (let i = 0; i < audioData.length; i++)
        // {
        //     ctx.fillRect(margin + i * (barWidth + barSpacing), topSpacing + 256-audioData[i],barWidth,barHeight);
        //     ctx.strokeRect(margin + i * (barWidth + barSpacing),topSpacing + 256-audioData[i],barWidth,barHeight);
        // }
        // ctx.restore();


        ctx.save();
        ctx.fillStyle = "red";
        ctx.translate(-10,250);
        for(let b of audioData)
        {
            let percent = b/255;
            if(percent <.02) percent =.15;
            ctx.translate(10, 0);
            //ctx.save();
            ctx.scale(1, -1);
            ctx.fillStyle = `rgb(${b}, ${b-128}, ${255-b})`;
            ctx.fillRect(0, 5, 10, 100 * percent);
            //ctx.restore();

            ctx.translate(0, 0);
        }
        ctx.restore();
    }


	// 5 - draw circles
    if (params.showCircles) {
        let maxRadius = canvasHeight/4;
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < audioData.length; i++)
        {
            // red-ish circles
            let percent = audioData[i] / 255;

            let circleRadius = percent * maxRadius;
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, 111, 111, .34 - percent/3.0);
            ctx.arc(canvasWidth/2, canvasHeight/2, circleRadius, 0, 2* Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // blue-ish circles, bigger, more transparent
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(0, 0, 255, .10 - percent/10.0);
            ctx.arc(canvasWidth/2, canvasHeight/2, circleRadius * 1.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // yellow-ish circles, smaller
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(200, 200, 0, 0.5 - percent/5.0);
            ctx.arc(canvasWidth/2, canvasHeight/2, circleRadius * .50, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.restore();

        }
        ctx.restore();
    }


    // 6 - bitmap manipulation
	// TODO: right now. we are looping though every pixel of the canvas (320,000 of them!),
	// regardless of whether or not we are applying a pixel effect
	// At some point, refactor this code so that we are looping though the image data only if
	// it is necessary

	// A) grab all of the pixels on the canvas and put them in the `data` array
	// `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
	// the variable `data` below is a reference to that array
    let imageData = ctx.getImageData(0,0, canvasWidth,canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width; // not using here

	// B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel)
    for (let i = 0; i < length; i += 4) {
		// C) randomly change every 20th pixel to red
        if (params.showNoise && Math.random() < .05) {
			// data[i] is the red channel
			// data[i+1] is the green channel
			// data[i+2] is the blue channel
			// data[i+3] is the alpha channel
			data[i] = data[i + 1] = data[i + 2] = 0; // zero out the red and green and blue channels
			data[i] = 255; // make the red channel 100% red
            data[i + 1] = 255;
            data[i + 2] = 255;
	    } // end if

        if (params.showInvert) {
            let red = data[i], green = data[i+1], blue = data[i+2];
            data[i] = 255 - red;
            data[i + 1] = 255 - green;
            data[i + 2] = 255 - blue;
            // data[i+3] is the alpha, but we're leaving that alone
        }


	}// end for

    if(params.showEmboss)
    {
        for(let i = 0; i < length; i++) {
            if (i%4 == 3) continue; // skip alpha channel
            data[i] = 127 + 2*data[i] - data[i+4] - data[i + width * 4];
        }
    }



	// D) copy image data back to canvas
    ctx.putImageData(imageData, 0, 0);
}

const ToggleDataType = () =>
{
    toggleDataType = !toggleDataType;
}

const PauseSprites = () =>
{
    pauseSprites = !pauseSprites;
}


export {setupCanvas,draw, ToggleDataType};