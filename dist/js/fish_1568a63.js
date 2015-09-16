function draw(t){var i=t.angle+Math.PI;context.translate(t.x,t.y),context.rotate(i);var o=20,s=py(t.dx-t.ox,t.dy-t.oy)/.05;s>1&&(o=10+10/s),context.drawImage(fishBitmap,0,0,o,6),context.rotate(-i),context.translate(-t.x,-t.y)}function py(t,i){return Math.sqrt(t*t+i*i)}function deltaAngle(t,i){var o=t-i;return Math.atan2(Math.sin(o),Math.cos(o))}function affinityLine(t,i,o){var s=context.createLinearGradient(t.x,t.y,i.x,i.y);s.addColorStop(0,o),s.addColorStop(1,"black"),context.strokeStyle=s,context.beginPath(),context.moveTo(t.x,t.y),context.lineTo(i.x,i.y),context.stroke()}function activateSpeedBoost(){speedBoostCountdown=400+Math.round(400*Math.random()),speedBoost=SPEED_BOOST}function update(){if(fishes.length<500&&fishes.push(new Fish(fishes.length)),!cursorDown){canvas.width=canvas.width;for(var t=0;t<fishes.length;t++){var i=fishes[t];i.calc(),draw(i)}}speedBoostCountdown--,0>speedBoostCountdown&&activateSpeedBoost(),speedBoost>0?speedBoost-=SPEED_BOOST/80:speedBoost=0,requestAnimationFrame(update)}var FOLLOW_DISTANCE=100,Fish=function(t){this.id=t,this.entourage=[],this.ox=this.dx=Math.random()-.5,this.oy=this.dy=Math.random()-.5,this.x=canvas.width*Math.random(),this.y=canvas.height*Math.random(),Fish.prototype.angleToClosestFish=function(t){return t=null==t?this.following:t,t?Math.atan2(t.y-this.y,t.x-this.x):Number.MAX_VALUE},Fish.prototype.angleFromFishDirectionToClosestFish=function(t){return t=null==t?this.following:t,t?Math.abs(deltaAngle(this.angle,this.angleToClosestFish(t))):Number.MAX_VALUE},Fish.prototype.angleDirectionDifference=function(t){return(t=null==t?this.following:t)?void Math.abs(deltaAngle(this.angle,t.angle)):Number.MAX_VALUE},Fish.prototype.calc=function(){this.ox=this.dx,this.oy=this.dy;var t=1.1,i=t;if(null==this.following||py(this.x-this.following.x,this.y-this.following.y)>FOLLOW_DISTANCE){null!=this.following&&(keyDown&&affinityLine(this.following,this,"white"),this.following.entourage.splice(this.following.entourage.indexOf(this))),this.following=null;for(var o=Number.MAX_VALUE,s=null,n=0;n<fishes.length;n++){var e=fishes[n];if(e!=this){var h=py(this.x-e.x,this.y-e.y);o>h&&e.following!=this&&FOLLOW_DISTANCE>h&&this.angleFromFishDirectionToClosestFish(e)<.25*Math.PI&&(o=h,s=e)}}null!=s&&(this.following=s,s.entourage.push(this))}if(null!=this.following&&(this.followingDistance=py(this.x-this.following.x,this.y-this.following.y),this.distanceFactor=1-this.followingDistance/FOLLOW_DISTANCE,this.angleDirectionDifference()>.9*Math.PI&&this.angleFromFishDirectionToClosestFish()<.2*Math.PI?(this.dx+=.1*this.following.x,this.dy+=.1*this.following.y,keyDown&&affinityLine(this.following,this,"yellow")):this.followingDistance>.3*FOLLOW_DISTANCE&&(this.dx+=.05*Math.cos(this.angleToClosestFish())*this.distanceFactor,this.dy+=.05*Math.sin(this.angleToClosestFish())*this.distanceFactor),keyDown&&affinityLine(this.following,this,"red")),(this.x<.1*canvas.width||this.x>.9*canvas.width||this.y<.2*canvas.height||this.y>.8*canvas.height)&&(this.dx+=(canvas.width/2-this.x)/5e3,this.dy+=(canvas.height/2-this.y)/5e3),py(this.x-cursor.x,this.y-cursor.y)<.75*FOLLOW_DISTANCE&&(this.dx-=(cursor.x-this.x)/500,this.dy-=(cursor.y-this.y)/500,i=4,keyDown&&affinityLine(cursor,this,"green")),null!=this.following)for(var n=0;n<this.following.entourage.length;n++){var a=this.following.entourage[n];a!==this&&py(this.x-a.x,this.y-a.y)<.2*FOLLOW_DISTANCE&&(keyDown&&affinityLine(a,this,"yellow"),this.dx-=(a.x-this.x)/1e3,this.dy-=(a.y-this.y)/1e3)}this.angle=Math.atan2(this.dy,this.dx);var l=Math.max(.1,Math.min(i,py(this.dx,this.dy)));this.dx=Math.cos(this.angle)*(l+speedBoost),this.dy=Math.sin(this.angle)*(l+speedBoost),this.x+=this.dx,this.y+=this.dy}},canvas=document.getElementById("fishtank"),context=canvas.getContext("2d"),fishes=[],speedBoostCountdown=200,speedBoost=0,SPEED_BOOST=2,fishBitmap=new Image;fishBitmap.onload=function(){update()},fishBitmap.src="https://dl.dropboxusercontent.com/u/4534978/2014/fishes/fish.png";var cursor={x:0,y:0},cursorDown=!1,keyDown=!1;document.onmousemove=function(t){cursor.x=t.pageX-(window.innerWidth/2-canvas.width/2),cursor.y=t.pageY-(window.innerHeight/2-canvas.height/2)},document.onmouseout=function(){cursor.y=cursor.x=Number.MAX_VALUE},document.onmousedown=function(){activateSpeedBoost(),cursorDown=!0},document.onmouseup=function(){cursorDown=!1},document.onkeydown=function(){keyDown=!0},document.onkeyup=function(){keyDown=!1};