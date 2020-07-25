function initial()
{
	canvas=document.getElementById('mycanvas')
	W=canvas.width=window.innerWidth-1
	H=canvas.height=window.innerHeight	-1
	pen=canvas.getContext('2d')
	cb=67
	gameover=false
	foodimage= new Image()
	foodimage.src="Assets/apple.png"
	trophy=new Image()
	trophy.src="Assets/trophy.png"
	score=0

	snake={
		init_length:5,
		color:"blue",
		cells:[],	
		direction:"right",

		create_snake:function(){
			for(var i=this.init_length;i>0;i--){
				this.cells.push({x:i,y:0});
			}
		},

		draw_snake:function(){
			pen.fillStyle=this.color
			for(var i=0;i<this.cells.length;i++)
			{
				pen.fillRect(this.cells[i].x*cb,this.cells[i].y*cb,cb-2,cb-2)
			}
		},

		update_snake:function(){

			//keydown updates		
			var X=this.cells[0].x
			var Y=this.cells[0].y
			var nextx,nexty
			if(this.direction=="right"){
				nextx=X+1
				nexty=Y
			}
			else if(this.direction=="left"){
				nextx=X-1
				nexty=Y
			}
			else if(this.direction=="down"){
				nextx=X
				nexty=Y+1
			}
			else{
				nextx=X
				nexty=Y-1
			}

			//gameover bounds
			var lastx=Math.round(W/cb)
			var lasty=Math.round(H/cb)
			if((nextx+1)>lastx||nextx<0||nexty+1>lasty||nexty<0)
				gameover=true;
			for(let i=0;i<this.cells.length;i++)
			{
				if(nextx==this.cells[i].x && nexty==this.cells[i].y)
					gameover=true;
			}


			//food
			if(nextx==food.x&&nexty==food.y){
				food=getfood()
				this.cells.unshift({x:nextx,y:nexty})
				score++;
			}
			else{
				if(gameover==false){
					this.cells.pop()
					this.cells.unshift({x:nextx,y:nexty})
			}
			}

		}

	};

	snake.create_snake()
	food=getfood();

	function keypressed(e){
		if(e.key=="ArrowRight" && snake.direction!="left")
			snake.direction="right"
		else if(e.key=="ArrowLeft" && snake.direction!="right")
			snake.direction="left"
		else if(e.key=="ArrowDown" && snake.direction!="up")
			snake.direction="down"
		else if(e.key=="ArrowUp" && snake.direction!="down")
			snake.direction="up"
	}

	document.addEventListener('keydown',keypressed)

}

function draw()
{
	pen.clearRect(0,0,W,H)
	snake.draw_snake()
	pen.drawImage(foodimage,food.x*cb,food.y*cb,cb-2,cb-2)
	pen.drawImage(trophy,18,20,cb,cb)
	pen.fillStyle="blue"
	pen.font="20px Roboto"
	pen.fillText(score,45,50)
}

function update()
{
	snake.update_snake()
}

function getfood()
{
	mark=true
	while(mark){
		foodx=Math.round(Math.random()*(W-cb)/cb)
		foody=Math.round(Math.random()*(H-cb)/cb)
		mark=false
		for(let i=0;i<snake.cells.length;i++){
			if(foodx==snake.cells[i].x && foody==snake.cells[i].y)
				mark=true
		}
	}

	food={
		x:foodx,
		y:foody,
	};
	return food
}

function gameloop()
{
	if(gameover==true){
		clearInterval(f)
		alert("GAME OVER")
	}
	draw();
	update();
}
initial();
f=setInterval(gameloop,100);
