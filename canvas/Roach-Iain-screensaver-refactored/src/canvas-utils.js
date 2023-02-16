// canvas helpers
export const drawRectangle = (ctx,x,y,width,height,fillStyle="black",lineWidth=0,strokeStyle="black") => {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.rect(x,y,width,height);
    ctx.fill();
    if(lineWidth > 0 ) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
}

export const drawArc = (ctx, x, y, radius, fillStyle="black", lineWidth=0, strokeStyle="black", startAngle=0, endAngle=(Math.PI *2)) => {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
        // (x, y, r, start ang(rad), end ang(rad), counterclockwise?)
        ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.closePath();
    ctx.fill();
    if(lineWidth > 0)
    {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.restore();
}

export const drawLine = (ctx, x1, y1, x2, y2, lineWidth=1,strokeStyle="black") =>
{
    ctx.save();
    ctx.strokeStyle = strokeStyle;
    ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
    ctx.closePath();
    ctx.lineWidth = lineWidth;
    ctx.stroke();
    ctx.restore();
}