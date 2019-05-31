(function(){
    const count = 20;
    let elem = document.getElementById("greed");
    function Init(){
        elem.innerHTML = "";
        for(let y = 0; y < count; y++){
            for(let x = 0; x < count; x++){
                elem.innerHTML += `<div data-x="${x}" data-y="${y}" life-time="0" data-state="free" class="game-field__cell black"></div>`;
            }
        }

        elem.querySelector(`.game-field__cell[data-x="${count/2}"][data-y="${count/2}"]`).setAttribute("data-state","snake");
        elem.querySelector(`.game-field__cell[data-x="${count/2}"][data-y="${count/2}"]`).setAttribute("head","");
        elem.querySelector(`.game-field__cell[data-x="${count/2}"][data-y="${count/2}"]`).setAttribute("life-time","1");
    }
    Init();

    let direction = "up";

    let length = 3;

    function SetDirection(changed){
        if(changed == "toLeft"){
            if(direction == "up"){
                direction = "left";
            } else if(direction == "left"){
                direction = "down";
            } else if(direction == "down"){
                direction = "right";
            } else if(direction == "right"){
                direction = "up";
            }
        } else if(changed == "toRight"){
            if(direction == "up"){
                direction = "right";
            } else if(direction == "right"){
                direction = "down";
            } else if(direction == "down"){
                direction = "left";
            } else if(direction == "left"){
                direction = "up";
            }
        }
    }

    let directionChange = "none";

    function Control(){
        if(event.keyCode == 37){
            directionChange = "toLeft";
        } else if( event.keyCode == 39){
            directionChange = "toRight";
        } else{
            directionChange = "none";
        }
    }

    function Update(){
        let snakeHead = elem.querySelector(`.game-field__cell[head]`);
        snakeHead.removeAttribute("head");
        let x = +snakeHead.getAttribute("data-x");
        let y = +snakeHead.getAttribute("data-y");
        if(direction == "up"){
            y--;
            if(y < 0){
                y = count-1;
            }
        }
        if(direction == "down"){
            y = (y + 1)%count;
        }
        if(direction == "left"){
            x--;
            if(x < 0){
                x = count-1;
            }
        }
        if(direction == "right"){
            x = (x + 1)%count;
        }
        let newHead = elem.querySelector(`.game-field__cell[data-x="${x}"][data-y="${y}"]`);
        if(newHead.getAttribute("data-state") == "food"){
            length++;
            GenerateFood();
            newHead.classList.remove("green");
        } else if(newHead.getAttribute("data-state") == "snake"){
            length = 3;
        }
        newHead.setAttribute("head","");
        newHead.setAttribute("data-state","snake");
        newHead.setAttribute("life-time",0);

        let snake = elem.querySelectorAll(`.game-field__cell[data-state="snake"]`);
        for(let i = 0;i < snake.length; i++){
            let lifeTime = +snake[i].getAttribute("life-time")+1;
            snake[i].setAttribute("life-time",`${lifeTime}`);
            if(+snake[i].getAttribute("life-time") > length){
                snake[i].setAttribute("life-time",0);
                snake[i].setAttribute("data-state","free");
                snake[i].classList.add("black");
            }
            else{
                snake[i].classList.remove("black");
            }
        }
    }

    function GenerateFood(){
        let freeCells = elem.querySelectorAll(`.game-field__cell[data-state="free"]`);
        let num = Math.floor(Math.random()*freeCells.length);
        freeCells[num].setAttribute("data-state", "food");
        freeCells[num].classList.remove("black");
        freeCells[num].classList.add("green");
    }

    GenerateFood();

    document.onkeydown = Control;
    setInterval(function(){ SetDirection(directionChange); Update(); directionChange = "none"},500);
})();