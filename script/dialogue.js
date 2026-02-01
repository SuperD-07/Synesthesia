
const dialogueBox = document.querySelector('#s2').children[0];

function showDialogue ({text, duration = 67, onEnd = null, role = null}) {
    activeDialogue = {text, duration, onEnd, role};

    document.querySelector('p').innerHTML = text;
    role == 'start' && openDialogue();

    duration == 67 && setTimeout(() => {
        dialogueBox.onclick = () => {
            chlose(dialogueBox);
        };
    }, 100);

    duration != 67 && setTimeout(() => {
        chlose(dialogueBox);
    }, duration*1000);
}

function openDialogue () {
    s2.classList.remove('hidden');
    dissolveIn(dialogueBox);
}
function closeDialogue () {
    dissolveOut(dialogueBox, 1, () => s2.classList.add('hidden'));
}

function chlose (el) {
    el.onclick = null;

    if (activeDialogue && activeDialogue.onEnd) activeDialogue.onEnd.start();
    else activeDialogue = null;
}