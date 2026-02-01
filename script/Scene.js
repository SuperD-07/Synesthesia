
class Scene {
    constructor ({bg, mc = null, startEvent = null, onFirstMask = null, items = [], endEvent = null, events = [], clickEvents = []}) {
        this.bg = bg;
        this.mc = mc;
        this.startEvent = startEvent;
        this.onFirstMask = onFirstMask;
        this.endEvent = endEvent;
        this.events = events;
        this.clickEvents = clickEvents;
        this.items = items;

        this.eventListeners = [];

        this.lol = 0;

        this._maskOn = false;
        this.firstMask = false
    }

    set maskOn (tf) {
        if (tf && !this.firstMask && this.onFirstMask) {
            this.firstMask = true;
            setTimeout(() => this.onFirstMask.start(), 1000);
        }

        this._maskOn=tf;
    }
    get maskOn () {return this._maskOn;}

    start () {
        console.log('Starting new scene')
        activeScene = this;
        this.maskOn = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.startEvent && this.startEvent.start();

        this.events.forEach(e => {
            e.startAfterSeconds != 67 &&
                setTimeout(() => e.start(), e.startAfterSeconds*1000);
        });

        this.items.forEach(i => {
            !Object.hasOwn(i, 'order') && (i.order = 1);
            i.mount && i.mount();
        });
        this.mc && (this.mc.order = 66);
        [(this.mc ? this.mc : {order: 66}), ...this.items, {sprite: this.bg, order: 0}].sort((x, y) => x.order-y.order).forEach(i => {
            i?.sprite && (
                i.transform ? 
                i.sprite.draw(i.transform.x, i.transform.y, i.transform.w, i.transform.h) : 
                i.sprite.draw(0, 0, canvas.width, canvas.height)
            );
            i?.hitbox && this.addClickableObject({
                hitbox: i.hitbox,
                maxClickCount: i.maxClickCount || 67,
                handler: i.onclick || null,
            });
        });
    }

    update () {
        this.lol += 0.25;

        this.bg.draw(0, 0, canvas.width, canvas.height);

        [(this.mc ? this.mc : {order: 66}), ...this.items, {sprite: this.bg, order: 0}].sort((x, y) => x.order-y.order).forEach(i => {
            i?.sprite && (
                i.transform ? 
                i.sprite.draw(i.transform.x, i.transform.y, i.transform.w, i.transform.h) : 
                i.sprite.draw(0, 0, canvas.width, canvas.height)
            );
        });

        if (this.mc && this.mc.walking && this.lol%1 == 0) {
            if (this.mc.sprite.activeFrame == 3) this.mc.sprite.activeFrame = 4;
            else if (this.mc.sprite.activeFrame == 4) this.mc.sprite.activeFrame = 3;
            if (this.mc.sprite.activeFrame == 5) this.mc.sprite.activeFrame = 6;
            else if (this.mc.sprite.activeFrame == 6) this.mc.sprite.activeFrame = 5;
        }

        /* ctx.fillStyle = 'yellow'
        for (let i = 0; i < 10; i++) {
            ctx.fillRect(5+i*100, 0, 5, 500);
        } */
    }

    end () {
        this.eventListeners.forEach(l => canvas.removeEventListener('click', l));

        this.endEvent && this.endEvent();
    }

    addClickableObject ({hitbox, maxClickCount, handler, onCompletion = null}) {
        const lol67 = ({offsetX, offsetY}) => {
            if (!hitbox.containsPoint(offsetX, offsetY)) return;
            if (maxClickCount == 67) {
                handler.start();
            } else if (maxClickCount == 1) {
                onCompletion ? onCompletion.start() : handler.start();
                canvas.removeEventListener('click', lol67);
            } else {
                handler.start();
                canvas.removeEventListener('click', lol67);
                this.addClickableObject({hitbox, maxClickCount: maxClickCount-1, handler, onCompletion});
            }
        };
        canvas.addEventListener('click', lol67);
        this.eventListeners.push(lol67);
    }

}