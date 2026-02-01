
function dissolveIn (el, curr = 0, onComplete = null) {
    if (curr < 1) {
        curr += 0.05;
        el.style.opacity = curr;
        setTimeout(() => dissolveIn(el, curr, onComplete), 10);
    } else {
        el.style.opacity = 1;
        onComplete && onComplete();
    }
}

function dissolveOut (el, curr = 1, onComplete = null) {
    if (curr > 0) {
        curr -= 0.05;
        el.style.opacity = curr;
        setTimeout(() => dissolveOut(el, curr,onComplete), 10);
    } else {
        el.style.opacity = 0;
        onComplete && onComplete()
    }
}


function createDialogue (character, text) {
    return '<b>'+character+': </b>'+text;
}