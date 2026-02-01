

/* new Sprite(1920, 1080, [
    'assets/img/puzzle1/bg_puzzle.png',
], canvas, ctx),

    new Event({
        type: 'dialogue',
        lines: [{text: createDialogue('Sy', 'Looks like a toy I used to play with...'), duration: 67, role: 'start'},
            {text: createDialogue('Sy', 'I have to put those squares in order.'), duration: 67, role: 'end'},     
        ],
        startAfterSeconds: 0.5,
        onCompletion: new Event()
    }),


new Sprite(1080, 1080, ['assets/img/puzzle1/cornice'], canvas, ctx); */
    




let rows = 3;
let col = 3;
let currTile;
let otherTile; //blank tile

let imgOrder =["Cubo_1","Cubo_2","Cubo_3","Cubo_4","Cubo_5","Cubo_6","Cubo_7","Cubo_8","vuoto",];

for (let r=0; r < rows; r++) {
    for (let c=0; c < col; c++) {
        //<img1>
        let tile = document.createElement("img");
        tile.id = r.toString() + "-" + c.toString();
        tile.src = 'assets/img/puzzle1/-'+imgOrder.shift() + "-.png";

        document.getElementById("board").append(tile); 
        document.getElementById("board").onclick = () => (new Event({
                type: 'endPuzzle'
            })).start();
    }
}
/* 
function dragStart(e)  {
    e.preventDefault();
    currTile = this;
}
function dragDrop() {
    otherTile = this;
}
function dragEnd() {
    if(!otherTile.src.includes("vuoto.png")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = r == r2 && c2 == c-1;
    let moveRight = r == r2 && c2 == c+1;
    let moveUp = c == c2 && r2 == r-1;
    let moveDown = c == c2 && r2 == r+1;

    let isAdja = moveLeft || moveRight || moveUp || moveDown;

    if (isAdja) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;

        if (check()) {
            (new Event({
                type: 'changeScene',
                scene: 'scene45'
            })).start();
        }
    }
}


function check() {
    return Array.from(document.querySelector('#board').childNodes).every((el, i) => parseInt(el.src.split('-')[1])*3+parseInt(el.src.split('-')[2]) == i);
}
 */