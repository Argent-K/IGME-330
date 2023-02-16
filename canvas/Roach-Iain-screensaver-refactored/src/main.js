		let ctx;
		let paused = false;
		let canvas;
		let createRectangles = true;
		let createArcs = true;
		let createLines = true;

        import { getRandomColor, getRandomInt } from "./utils.js";
        import { drawArc, drawLine, drawRectangle } from "./canvas-utils.js";


		const init = () => {
			console.log("page loaded!");

			
			canvas = document.querySelector("canvas");
			
			ctx = canvas.getContext("2d");

			ctx.fillStyle = "red"; 

			ctx.fillRect(20,20,600,440); 

			drawRectangle(ctx,120, 120, 400, 300, "yellow", 10, "magenta");

			drawLine(ctx, 20, 20, 620, 460, 5, "magenta");
			drawLine(ctx, 620, 20, 20, 460, 5, "magenta");

			drawArc(ctx,320,240,50,"green",5,"purple",0,Math.PI * 2);
			drawArc(ctx,320,240,20,"gray",5,"yellow",0,Math.PI);
			drawArc(ctx,300,220,10,"green",2,"purple",0,Math.PI*2);
			drawArc(ctx,340,220,10,"gray",2,"yellow",0,Math.PI*2);

			drawLine(ctx,20,320,620,320,20,"black");

			drawRectangle(ctx,30,30,100,100,"yellow",10,"magenta");
			drawRectangle(ctx,510,30,100,100,"blue",10,"magenta");

			setupUI();
			
			update();
		}

		
		const update = () =>
		{
			if(paused) return;
			requestAnimationFrame(update);
			if(createRectangles)
			{
				drawRandomRect(ctx);
			}
			if(createArcs)
			{
				drawRandomArc(ctx);
			}
			if(createLines)
			{
				drawRandomLine(ctx);
			}

		}

		const drawRandomRect = (ctx) =>
		{
			drawRectangle(ctx,getRandomInt(0, 640),getRandomInt(0,480),getRandomInt(10,90),getRandomInt(10,90),getRandomColor(),getRandomInt(2, 12),getRandomColor())
		}

		const drawRandomArc = (ctx) =>
		{
			let startAng = getRandomInt(0, 360);
			let endAng = getRandomInt(startAng, 360);
			let startAngleRad = (startAng * (Math.PI/180));
			let endAngleRad = (endAng * (Math.PI/180));
			drawArc(ctx,getRandomInt(0, 640), getRandomInt(0,480), getRandomInt(0, 50), getRandomColor(), getRandomInt(2,12), getRandomColor(), startAngleRad, endAngleRad);
		}

		const drawRandomLine = (ctx) =>
		{
			drawLine(ctx,getRandomInt(0,640), getRandomInt(0,640), getRandomInt(0,640), getRandomInt(0,640), getRandomInt(1, 12), getRandomColor());
		}

		const drawTestRandomLine = (ctx) =>
		{
			ctx.strokeStyle = getRandomColor();
			ctx.beginPath();
			ctx.moveTo(0 ,getRandomInt(0, 640));
			ctx.lineTo(640,getRandomInt(0, 640));
			ctx.closePath();
			ctx.lineWidth = getRandomInt(2, 12);
			ctx.stroke();
		}

		const drawVertRandomLine = (ctx) =>
		{
			ctx.strokeStyle = getRandomColor();
			ctx.beginPath();
			ctx.moveTo(getRandomInt(0, 640),0);
			ctx.lineTo(getRandomInt(0, 640), 480);
			ctx.closePath();
			ctx.lineWidth = getRandomInt(2, 12);
			ctx.stroke();
		}

		// Event handlers
		const canvasClicked = (e) => {
			let rect = e.target.getBoundingClientRect();
			let mouseX = e.clientX - rect.x;
			let mouseY = e.clientY - rect.y;
			console.log(mouseX,mouseY);
			for (let i = 0; i < 10; i++)
			{
				let x = getRandomInt(-100, 100) + mouseX;
				let y = getRandomInt(-100, 100) + mouseY;
				let width = getRandomInt(20,50);
				let height = getRandomInt(20,50);
				let color = getRandomColor();
				let startAng = getRandomInt(0, 360);
				let endAng = getRandomInt(startAng, 360);
				let startAngleRad = (startAng * (Math.PI/180));
				let endAngleRad = (endAng * (Math.PI/180));
				drawArc(ctx,x, y, getRandomInt(20, 50), color, getRandomInt(2,12),getRandomColor(),startAngleRad, endAngleRad);
			}
		}

		const setupUI = () => {
			document.querySelector("#btn-pause").onclick =  () => {
				paused = true;
			};

			document.querySelector("#btn-play").onclick = () => {
				if(!paused) return;
				paused = false;
				update();
			};

			document.querySelector("#btn-clear").onclick =  () => {
				ctx.clearRect(0, 0, 640, 480);
			};

			canvas.onclick = canvasClicked;

			document.querySelector("#cb-rectangles").onclick = (e) => {
				createRectangles = e.target.checked;
			}

			document.querySelector("#cb-arcs").onclick = (e) => {
				createArcs = e.target.checked;
			}

			document.querySelector("#cb-lines").onclick = (e) => {
				createLines = e.target.checked;
			}
		}

        init();