
const scenes = {};

const s2 = document.querySelector('#s2');

const puzzle = document.querySelector('#game1');

const audio = document.querySelector('audio#theme');
const keyCollected = document.querySelector('audio#key');

const canvas = document.querySelector('#gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 960;
canvas.height = 540;

const mask = {
    sprite: new Sprite(1080, 1080, ['assets/img/wearBtn.png', 'assets/img/removeBtn.png'], canvas, ctx),
    transform: new Hitbox(20, 20, 108, 108),
    hitbox: new Hitbox(20, 20, 108, 108),
    onclick: new Event({
        type: 'changeMask'
    }),
    mount: () => {
        mask.sprite.activeFrame = 0;
    }
};
const player = {
    sprite: new Sprite(1080, 1080, [
        'assets/img/Sy67d.png', 
        'assets/img/Synm.png',
        'assets/img/Sywm.png',
        'assets/img/Sy104l.png',
        'assets/img/Sy105l.png',
        'assets/img/Sy104r.png',
        'assets/img/Sy105r.png',
        'assets/img/Sy69nm.png',
        'assets/img/Sy69wm.png',
        'assets/img/Syback.png',
        'assets/img/Syback.png',
    ], canvas, ctx),
}

const menuScene = new Scene({
    bg: new Sprite(1920, 1080, ['assets/img/menuBG.png'], canvas, ctx),
    items: [{
        sprite: new Sprite(1920, 1080, ['assets/img/logo.png'], canvas, ctx),
    }, {
        sprite: new Sprite(1920, 1080, ['assets/img/btnPlay.png'], canvas, ctx),
        hitbox: new Hitbox(377, 285, 586-377, 343-285),
        onclick: new Event({type: 'changeScene', scene: 'scene1'}),
        maxClickCount: 1,
    }, {
        sprite: new Sprite(1920, 1080, ['assets/img/btnQuit.png'], canvas, ctx),
        hitbox: new Hitbox(377, 377, 586-377, 435-377),
        onclick: new Event({type: 'quit'}),
    }]
});

const scene1 = new Scene({
    bg: new Sprite(1920, 1080, ['assets/img/Room1BG.png', 'assets/img/Room1BG_glow.png', 'assets/img/Room1BG_2.png'], canvas, ctx),
    events: [
        new Event({
            type: 'dialogue',
            lines: [
                {text: createDialogue('Mum', 'Sy, you can’t keep taking things that aren’t yours. I’m starting to get worried.'), duration: 67, role: 'start'},
                {text: createDialogue('Mum', 'Also, I know you want to touch the shift. Don’t do that.'), duration: 67, role: 'end'},
            ],
            startAfterSeconds: 2,
            onCompletion: new Event({
                type: 'BGsetFrame',
                frame: 1,
                onCompletion: new Event({
                    type: 'clickable',
                    hitbox: new Hitbox (413, 382, 475-413, 452-382),
                    maxClickCount: 1,
                    onCompletion: new Event({
                        type: 'BGsetFrame',
                        frame: 0,
                        onCompletion: new Event({
                            type: 'dialogue',
                            lines: [
                                {text: createDialogue('Mum', 'Sy, don’t.'), duration: 67, role: 'start'},
                            ],
                            onCompletion: new Event({
                                type: 'BGsetFrame',
                                frame: 1,
                                onCompletion: new Event({
                                    type: 'clickable',
                                    hitbox: new Hitbox (413, 382, 475-413, 452-382),
                                    maxClickCount: 1,
                                    onCompletion: new Event({
                                        type: 'BGsetFrame',
                                        frame: 0,
                                        onCompletion: new Event({
                                            type: 'dialogue',
                                            lines: [
                                                {text: createDialogue('Mum', 'Sy stop touching that.'), duration: 67, role: 'start'},
                                            ],
                                            onCompletion: new Event({
                                                type: 'BGsetFrame',
                                                frame: 1,
                                                onCompletion: new Event({
                                                    type: 'clickable',
                                                    hitbox: new Hitbox (413, 382, 475-413, 452-382),
                                                    maxClickCount: 1,
                                                    onCompletion: new Event({
                                                        type: 'BGsetFrame',
                                                        frame: 0,
                                                        onCompletion: new Event({
                                                            type: 'dialogue',
                                                            lines: [
                                                                {text: createDialogue('Mum', 'I’m serious, don’t.'), duration: 67, role: 'start'},
                                                            ],
                                                            onCompletion: new Event({
                                                                type: 'BGsetFrame', 
                                                                frame: 1,
                                                                onCompletion: new Event({
                                                                    type: 'clickable',
                                                                    hitbox: new Hitbox (413, 382, 475-413, 452-382),
                                                                    maxClickCount: 1,
                                                                    onCompletion: new Event({
                                                                        type: 'BGsetFrame',
                                                                        frame: 2,
                                                                        onCompletion: new Event({
                                                                            type: 'dialogue',
                                                                            lines: [
                                                                                {text: createDialogue('Mum', 'SY-'), duration: 67, role: 'start'},
                                                                            ],
                                                                            onCompletion: new Event({
                                                                                type: 'changeScene',
                                                                                scene: 'scene2',
                                                                                startAfterSeconds: 1.5,
                                                                            }),
                                                                        }),
                                                                    })
                                                                }),
                                                            })
                                                        }),
                                                    })
                                                }),
                                            })
                                        }),
                                    }),
                                }),
                            }),
                        }),
                    }),
                }),
            }),
        }),
    ],
    items: [{
        sprite: new Sprite(1920, 1080, ['assets/img/Room1forest.png', 'assets/img/Room1forest67.png'], canvas, ctx, {animated: 0.25}),
        order: -1
    }]
});

const scene2 = new Scene({
    bg: new Sprite(1920, 1080, [
        'assets/img/Room2_1.png',
        'assets/img/Room2_1_glow.png',
        'assets/img/Room2_2.png',
        'assets/img/Room2_2_smell.png',
        'assets/img/Room2_2_glow.png',
        'assets/img/Room2_3.png',
        'assets/img/Room2_3_smell.png',
    ], canvas, ctx),
    mc: {
        ...player, 
        transform: new Hitbox(600, 292, 216, 216),
    },
    events: [
        new Event({
            type: 'MCsetFrame',
            frame: 1,
            startAfterSeconds: 2,
            onCompletion: new Event({
                type: 'dialogue',
                lines: [
                    {text: createDialogue('Sy', 'Mama? Where are you?'), duration: 67, role: 'start'},
                ],
                startAfterSeconds: 1,
                onCompletion: new Event({
                    type: 'BGsetFrame',
                    frame: 1,
                    onCompletion: new Event({
                        type: 'clickable',
                        hitbox: new Hitbox (772, 230, 811-772, 256-230),
                        maxClickCount: 1,
                        onCompletion: new Event({
                            type: 'BGsetFrame',
                            frame: 2,
                            onCompletion: new Event({
                                type: 'dialogue',
                                lines: [
                                    {text: createDialogue('Sy', 'Ooh, mine!'), duration: 67, role: 'start'},
                                ], 
                                startAfterSeconds: 1,
                                onCompletion: new Event({
                                    type: 'BGsetFrame',
                                    frame: 2,
                                    onCompletion: new Event({
                                        type: 'addItem',
                                        item: mask
                                    })
                                })
                            })
                        })
                    }),
                })
            }),
        })
    ],
    onFirstMask: new Event({
        type: 'BGsetFrame',
        frame: 6,
        onCompletion: new Event({
            type: 'dialogue', 
            lines: [{text: createDialogue('...', 'Psss, hey you...'), duration: 67, role: 'start'}],
            onCompletion: new Event({
                type: 'clickable',
                hitbox: new Hitbox (40, 352, 137-40, 430-352),
                maxClickCount: 67,
                handler: new Event({
                    type: 'tp',
                    to: 200,
                    onCompletion: new ConditionalEvent(
                        new Event({
                            type: 'MCsetFrame',
                            frame: 7,
                            onCompletion: new ConditionalEvent(new Event({
                                type: 'dialogue',
                                lines: [{text: createDialogue('...', '...'), duration: 1.5, role: 'start'}]
                            }), new Event({
                                type: 'dialogue',
                                lines: [
                                    {text: createDialogue('Nutrio', 'Hey kid.'), duration: 67, role: 'start'},
                                    {text: createDialogue('Nutrio', 'Yeah you.'), duration: 67},
                                    {text: createDialogue('Nutrio', 'Take this'), duration: 67, role: 'end'},
                                ],
                                onCompletion: new Event({
                                    type: 'changeScene',
                                    scene: 'scene3',
                                })
                            })),
                        }), new Event({
                            type: 'MCsetFrame',
                            frame: 8,
                            onCompletion: new ConditionalEvent(new Event({
                                type: 'dialogue',
                                lines: [{text: createDialogue('...', '...'), duration: 1.5, role: 'start'}]
                            }), new Event({
                                type: 'dialogue',
                                lines: [
                                    {text: createDialogue('Nutrio', 'Hey kid.'), duration: 67, role: 'start'},
                                    {text: createDialogue('Nutrio', 'Yeah you.'), duration: 67},
                                    {text: createDialogue('Nutrio', 'Take this'), duration: 67, role: 'end'},
                                ],
                                onCompletion: new Event({
                                    type: 'changeScene',
                                    scene: 'scene3',
                                    wv: true,
                                    duration: 6300
                                })
                            })
                        ),
                    }))
                })
            })
        })
    }),
});

const scene3 = new Scene({
    bg: new Sprite(1920, 1080, [
        'assets/img/Room3.png',
        'assets/img/Room3_420.png',
    ], canvas, ctx),
    items: [mask, {
        hitbox: new Hitbox(0, 365, 50, 365),
        onclick: new ConditionalEvent(new Event({type: 'dialogue', 
            lines: [{text: createDialogue('Sy', 'I shouldn\'t go back, I have to find Mama!'), duration: 2, role: 'start'}]
        }), new Event({type: 'dialogue', 
            lines: [{text: createDialogue('Sy', 'The smell points in the opposite direction!'), duration: 2, role: 'start'}]
        })),
    }, {
        hitbox: new Hitbox(51, 365, 80, 365),
        onclick: new Event({type: 'tp', to:'80', adjust: true})
    }, {
        hitbox: new Hitbox(131, 365, 100, 365),
        onclick: new Event({type: 'tp', to:'180', adjust: true})
    }, {
        hitbox: new Hitbox(231, 365, 100, 365),
        onclick: new Event({type: 'tp', to:'280', adjust: true})
    }, {
        hitbox: new Hitbox(331, 365, 100, 365),
        onclick: new Event({type: 'tp', to:'380', adjust: true})
    }, {
        hitbox: new Hitbox(431, 365, 100, 365),
        onclick: new Event({type: 'tp', to:'480', adjust: true})
    }, {
        hitbox: new Hitbox(531, 365, 100, 365),
        onclick: new Event({type: 'tp', to:'580', adjust: true})
    }, {
        hitbox: new Hitbox(631, 365, 100, 365),
        onclick: new Event({type: 'tp', to:'680', adjust: true})
    }, {
        hitbox: new Hitbox(731, 365, 100, 365),
        onclick: new Event({type: 'tp', to:'780', adjust: true})
    }, {
        hitbox: new Hitbox(831, 365, 80, 365),
        onclick: new Event({type: 'tp', to:'880', adjust: true})
    }, {
        hitbox: new Hitbox(911, 365, 50, 365),
        onclick: new Event({
            type: 'changeScene', 
            scene: 'scene4'
        }),
    }],
    mc: {
        ...player, 
        transform: new Hitbox(40, 318, 216, 216),
    },
    startEvent: new Event({
        type: 'MCsetFrame',
        frame: 1,
    })
});

const scene35 = new Scene({
    bg: new Sprite(1920, 1080, [
        'assets/img/Room3.png',
        'assets/img/Room3_420.png',
    ], canvas, ctx),
    items: [mask, {
        hitbox: new Hitbox(0, 365, 50, 365),
        onclick: new ConditionalEvent(new Event({type: 'dialogue', 
            lines: [{text: createDialogue('Sy', 'I shouldn\'t go back, I have to find Mama!'), duration: 2, role: 'start'}]
        }), new Event({type: 'dialogue', 
            lines: [{text: createDialogue('Sy', 'The smell points in the opposite direction!'), duration: 2, role: 'start'}]
        })),
    }, {
        hitbox: new Hitbox(911, 365, 50, 365),
        onclick: new Event({
            type: 'changeScene', 
            scene: 'scene4'
        }),
    }, {
        sprite: new Sprite(1080, 1080, ['assets/img/mask2.png'], canvas, ctx),
        hitbox: new Hitbox(415, 421, 533-415, 494-421),
        transform: new Hitbox(415, 421, 533-415, 494-421),
        onclick: new Event({
            type: 'destroy',
            obj: 'key2'
        }),
        id: 'key2'
    }],
    mc: {
        ...player, 
        transform: new Hitbox(750, 318, 216, 216),
    },
    startEvent: new Event({
        type: 'MCsetFrame',
        frame: 1,
    })
});

const scene4 = new Scene({
    bg: new Sprite(1920, 1080, [
        'assets/img/Room4.png',
        'assets/img/Room4_420.png',
    ], canvas, ctx),
    items: [mask,
        {
            sprite: new Sprite(32, 32, ['assets/img/arrow.png'], canvas, ctx),
            hitbox: new Hitbox(30, 460, 32, 32),
            transform: new Hitbox(30, 460, 64, 64),
            onclick: new Event({
                type: 'changeScene',
                scene: 'scene35',
            })
        },
        {
            sprite: new Sprite(1080, 1080, ['assets/img/mask3.png'], canvas, ctx),
            hitbox: new Hitbox(740, 373, 809-680, 456-373),
            transform: new Hitbox(680, 373, 170, 170),
            onclick: new Event({
                type: 'destroy',
                obj: 'key1'
            }),
            id: 'key1'
        }, 
        {
            hitbox: new Hitbox(131, 71, 253-131, 193-71),
            maxClickCount: 1,
            onclick: new Event({
                type: 'startPuzzle'
            })
        }
    ],
    mc: {
        ...player, 
        transform: new Hitbox(200, 250, 432, 432),
    },
    startEvent: new Event({
        type: 'MCsetFrame',
        frame: 9
    })
});

const scene45 = new Scene({
    bg: new Sprite(1920, 1080, [
        'assets/img/Room4.png',
        'assets/img/Room4_420.png',
    ], canvas, ctx),
    items: [mask, {hitbox: new Hitbox()}],
    mc: {
        ...player, 
        transform: new Hitbox(200, 250, 432, 432),
    },
    startEvent: new Event({
        type: 'MCsetFrame',
        frame: 9
    })
});

let started = false;
const start = () => {
    if (started) return;
    audio.play();
    menuScene.start();
    //scene1.start();
    //scene2.start();
    //scene3.start();
    //scene4.start(); s2.classList.add('hidden');
    started = true;
    requestAnimationFrame(loop);
}
document.addEventListener('mousedown', start)


canvas.addEventListener('mousedown', e => e.ctrlKey && console.log(e.offsetX+' '+e.offsetY))

scenes['menuScene'] = menuScene;
scenes['scene1'] = scene1;
scenes['scene2'] = scene2;
scenes['scene3'] = scene3;
scenes['scene35'] = scene35;
scenes['scene4'] = scene4;
scenes['scene45'] = scene45;


const STEP = 1000 / 30;
let last = performance.now();

function loop(now) {
    if (now - last >= STEP) {
        activeScene.update();
        last += STEP;
    }
    requestAnimationFrame(loop);
}
