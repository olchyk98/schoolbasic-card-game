import rules from '../rules';

function reducer(state = {}, { type, payload }) {
    let a = Object.assign({}, state);

    let gen = () => {
        if(
            !Number.isInteger(a.deskSize) || a.deskSize > 0
        ) {
            let list = [];
            for(let ma = rules.minCard; ma <= rules.maxCard; ma++) { // arr range
                list.push(ma);
            }

            let b = [];
            for(let ma = 0; ma < ((!Number.isInteger(a.deskSize) || a.deskSize > rules.userDeskSize) ? rules.userDeskSize : a.gameDesk); ma++) {
                b.push(list[Math.floor(Math.random() * list.length)]);
            }

            if(a.deskSize) a.deskSize -= rules.userDeskSize;
            return b;
        } else if(
            a.deskSize <= 0 &&
            (
                (a.botDesk && !a.botDesk.length) ||
                (a.playerDesk && !a.playerDesk.length)
            )
        ) {
            if(!a.botDesk.length) {
                a.winMessage = "Bot won!";
            } else if(!a.playerDesk.length) {
                a.winMessage = "Player won!";
            }
            return [];
        } else {
            return [];
        }
    }

    function execute(type, payload) {
        switch(type) {
            case 'INITIALIZE_GAME': // WARNING: Store enter point
                if(payload) {
                    a = {
                        deskSize: rules.deskSize,
                        botDesk: gen(), // [*]
                        playerDesk: gen(), // [*]
                        inGame: true,
                        gameDesk: [],
                        currentTurn: "USER_TURN",
                        isLoop: null,
                        winMessage: ""
                    }
                }
            break;
            case 'PUSH_CARD_TO_DESK':
                {
                    let b = a.gameDesk,
                        c = {
                            value: payload.value,
                            sender: payload.sender
                        },
                        d = {
                            "BOT_TARGET" : "USER_TURN",
                            "USER_TARGET" : "BOT_TURN"
                        },
                        e = false;

                    if(!b.slice(-1)[0] || b.slice(-1)[0].length !== 1) { // create new
                        a.gameDesk.push([c]);
                        e = true;
                    } else if(a.gameDesk[b.length - 1].slice(-1)[0].value <= payload.value) { // beat
                        a.gameDesk[b.length - 1].push(c);
                        e = true;
                    }
    
                    if(e) {
                        a.playerDesk.splice(a.playerDesk.findIndex(io => io === payload.value), 1);
                        if(a.playerDesk.length === 0) {
                            a.playerDesk = gen();
                        }
                        a.currentTurn = d[payload.sender];
                    }
                }
            break;
            case 'START_BOT_RUNNER':
                if(a.currentTurn === 'BOT_TURN') { // TODO: Test
                    let b = a.botDesk, // bot desc
                        d = a.gameDesk,
                        e = d.slice(-1)[0], // last casted cart
                        g = f => {
                            a.botDesk.splice(a.botDesk.findIndex(io => io === f), 1);
                            if(a.botDesk.length === 0) {
                                a.botDesk = gen();
                            }
                        }
            
                    if(!e || e.length !== 1) {
                        a.gameDesk.push([{
                            value: b[0],
                            sender: "BOT_TARGET"
                        }]);
                        g(b[0]);
                        a.currentTurn = "USER_TURN";
                    } else {
                        let f = Infinity; // best answer
                        a.botDesk.forEach(io => {
                            if(io < f && io >= e.slice(-1)[0].value) {
                                f = io;
                            }
                        });
            
                        if(isFinite(f)) { // found
                            a.gameDesk[a.gameDesk.length - 1].push({
                                value: f,
                                sender: "BOT_TARGET"
                            });
                            g(f);
                            execute('START_BOT_RUNNER', '');
                        } else { // miss
                            a.isLoop = (a.isLoop === null) ? false : true;
                            a.currentTurn = "USER_TURN";
                        }
                    }
                }
            break;
            case 'PASS_CURRENT_TURN':
                if(a.currentTurn === 'USER_TURN') {
                    if(a.deskSize.length) {
                        a.isLoop = (a.isLoop === null) ? false : true;
                        a.currentTurn = "BOT_TURN";
                        execute('START_BOT_RUNNER', '');
                    } else {
                        a.winMessage = "Bot won!";
                    }
                }
            break;
            case 'ADAPTIVE_CLEAR_BOARD':
                if(a.gameDesk && a.gameDesk.length === 4) {
                    a.gameDesk.splice(0, 2);
                }
            break;
            default:break;
        }
    }
    execute(type, payload);

    return a;
}

export default reducer;