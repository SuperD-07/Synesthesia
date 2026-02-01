
class Event {
    constructor ({
        type, 
        startAfterSeconds = 0, 
        lines = [], 
        hitbox = null, 
        maxClickCount = 67, 
        handler = null, 
        onCompletion = null,
        scene = null,
        frame = 67,
        item = null,
        to = 0,
        msg = null,
        adjust = false,
        duration = 0,
        wv = false,
        obj = null,
    }) {
        this.type = type;
        this.startAfterSeconds = startAfterSeconds;
        this.lines = lines;
        this.hitbox = hitbox;
        this.maxClickCount = maxClickCount;
        this.handler = handler;
        this.onCompletion = onCompletion;
        this.sceneName = scene;
        this.frame = frame;
        this.item = item;
        this.to = to;
        this.msg = msg;
        this.adjust = adjust;
        this.duration = duration;
        this.wv = wv;
        this.obj = obj;
    }

    start () {
        //console.log('Start called on: ', this)
        switch (this.type) {
            case 'dialogue':
                if (!this.lines.length) {
                    closeDialogue();
                    setTimeout(() => this.onCompletion.start(), 100);
                }
                else showDialogue({
                    text: this.lines[0].text, 
                    duration: this.lines[0].duration,
                    onEnd: new Event({...this, lines: this.lines.slice(1), startAfterSeconds: 67}),
                    role: this.lines[0].role || null
                });
                break;
            
            case 'clickable':
                activeScene.addClickableObject({
                    hitbox: this.hitbox,
                    maxClickCount: this.maxClickCount,
                    handler: this.handler,
                    onCompletion: this.onCompletion
                });
                break;
            
            case 'changeScene':
                setTimeout(() => {
                    activeScene.end();
                    if (this.wv) {
                        dissolveOut(canvas, 1, () => (new Event({
                            type: 'video',
                            scene: this.sceneName,
                            duration: this.duration
                        })).start());
                    } else {
                        dissolveOut(canvas, 1, () => {
                            scenes[this.sceneName].start();
                            dissolveIn(canvas);
                        });
                    }
                }, this.startAfterSeconds);
                break;
            
            case 'video':
                canvas.classList.add('hidden');
                console.log(this.sceneName)
                const el = document.querySelector('video#'+this.sceneName)
                el.classList.remove('hidden');
                el.play();
                setTimeout(() => {
                    el.classList.add('hidden');
                    canvas.classList.remove('hidden');
                    scenes[this.sceneName].start();
                    dissolveIn(canvas);
                }, this.duration);
                break;
            
            case 'BGsetFrame':
                setTimeout(() => {
                    activeScene.bg.activeFrame = this.frame;
                    setTimeout(() => this.onCompletion.start(), 100);
                }, this.startAfterSeconds);
                break;

            case 'MCsetFrame':
                setTimeout(() => {
                    activeScene.mc.sprite.activeFrame = this.frame;
                    setTimeout(() => this.onCompletion?.start(), 100);
                }, this.startAfterSeconds);
                break;

            case 'addItem':
                activeScene.items.push({...this.item, order: this.item.order || 1});
                activeScene.addClickableObject({
                    hitbox: this.item.hitbox,
                    maxClickCount: this.item.maxClickCount || 67,
                    handler: this.item.onclick || null,
                });
                break;

            case 'changeMask':
                if (activeScene.maskOn) {
                    activeScene.maskOn = false;
                    activeScene.bg.activeFrame--;
                    activeScene.mc.sprite.activeFrame--;
                } else {
                    activeScene.maskOn = true;
                    activeScene.bg.activeFrame++;
                    activeScene.mc.sprite.activeFrame++;
                }
                mask.sprite.activeFrame++;
                break;

            case 'tp':
                activeScene.mc.transform.x = this.adjust ? (this.to - activeScene.mc.transform.w/2) : this.to;
                this.onCompletion?.start();
                break;

            case 'destroy':
                activeScene.items = activeScene.items.filter(i => i.id != this.obj);
                keyCollected.play();
                break;

            case 'startPuzzle':
                canvas.classList.add('hidden');
                puzzle.classList.remove('hidden');
                break;
            
            case 'endPuzzle':
                keyCollected.play();
                setTimeout(() => {
                    
                document.querySelector('#finale').classList.remove('hidden');
                puzzle.classList.add('hidden');
                audio.pause();
                document.querySelector('#finale').play();
                }, 100);
                break;

            case 'lol':
                console.log(this.msg||'676767')
                break;
                
            case 'quit':
                window.close();
                break;
        
            default:
                break;
        }
    }
}

class ConditionalEvent {
    constructor (maskOffEvent, maskOnEvent) {
        this.maskOffEvent = maskOffEvent;
        this.maskOnEvent = maskOnEvent;
    }

    start () {
        if (activeScene.maskOn) this.maskOnEvent.start();
        else this.maskOffEvent.start();
    }
}