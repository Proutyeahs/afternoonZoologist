import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import HpBar from './HpBar';

function Battle({ squad, tameAttempt, handleClose, monsters, setToggle }) {

    const dispatch = useDispatch()

    const lead = useSelector((store) => store.lead)
    const opponent = useSelector((store) => store.opponent)

    // runs fight calculations
    const fight = () => {

        // basic dmg so I have something to work with
        let dmg = Math.round(lead.att * lead.att / (lead.att + opponent.def))
        let monsterDmg = Math.round(opponent.att * opponent.att / (opponent.att + lead.def))

        // checks if leader is dead
        if (lead.hp === 0) {
            return alert("This Animal can no longer fight!")

        // checks type advantage
        } else if (
            lead.type === "Fire" && opponent.type === "Air" ||
            lead.type === "Earth" && opponent.type === "Water" ||
            lead.type === "Water" && opponent.type === "Fire" ||
            lead.type === "Air" && opponent.type === "Earth"
        ) {
            dmg = Math.round(dmg *= 1.2)
            monsterDmg = Math.round(monsterDmg *= 0.8)
            console.log("advantage")
        } else if (
            lead.type === "Fire" && opponent.type === "Water" ||
            lead.type === "Earth" && opponent.type === "Air" ||
            lead.type === "Water" && opponent.type === "Earth" ||
            lead.type === "Air" && opponent.type === "Fire"
        ) {
            dmg = Math.round(dmg * 0.8)
            monsterDmg = Math.round(monsterDmg * 1.2)
            console.log("disadvantage")
        }

        // sends damage
        if (lead.spd >= opponent.spd) {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg
            })
            setTimeout(() => {
                if (opponent.hp - dmg > 0) {
                    dispatch({
                        type: "TAKE_DMG",
                        payload: monsterDmg
                    })
                }

                // run win or lose functions
                if (opponent.hp - dmg < 1) {
                    console.log(opponent.hp - dmg)
                    win()
                } else if (lead.hp - monsterDmg < 1) {
                    console.log(lead.hp - monsterDmg)
                    dead()
                }
            }, 600)
        }

        // sends damage
        if (lead.spd < opponent.spd) {
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg
            })
            setTimeout(() => {
                if (lead.hp - monsterDmg > 0) {
                    dispatch({
                        type: "DEAL_DMG",
                        payload: dmg
                    })
                }

                // run win or lose functions
                if (opponent.hp - dmg < 1) {
                    console.log(opponent.hp - dmg)
                    win()
                } else if (lead.hp - monsterDmg < 1) {
                    console.log(lead.hp - monsterDmg)
                    dead()
                }
            }, 600)
        }
        console.log("my att", dmg, "opp att", monsterDmg)
    }

    // dispatches dead monster data
    const dead = () => {
        dispatch({
            type: "DEAD",
            payload: lead
        })
    }

    // handles win condition
    const win = () => {

        // dispatches the monster to be removed from the reducer
        dispatch({
            type: "POP_MONSTER",
            payload: opponent
        })

        // appends leader lvl to the object
        lead.opponentLvl = opponent.lvl
        lead.opponentExp = opponent.exp

        // dispatches leader data
        dispatch({
            type: "WIN",
            payload: lead
        })

        // dispatches get request when the reducer is empty
        if (monsters.length === 0) {
            dispatch({
                type: 'GET_MONSTERS',
                payload: lead.lvl
            })
        }
        setToggle(null)
    }

    // renders attack button when monsters are alive
    const attack = () => {
        if (opponent.hp > 0 && lead.hp > 0) {
            return <Button color="error" size="small" variant="contained" onClick={fight}> Attack </Button>
        }
    }

    // sets new leader if its alive
    const swapLeader = (monster) => {
        if (monster.hp < 1) {
            alert("This Animal can no longer fight!")
        } else {
            dispatch({
                type: 'SET_LEAD', payload: monster
            })
        }
    }

    // renders death button
    const youDied = () => {
        if (lead.hp < 1 && opponent.hp > 0) {
            return (
                <Alert severity="success" color="error">
                    <Button color="error" size="small" variant="contained" onClick={handleClose}> You Died! </Button>
                </Alert>
            )
        }
    }

    return (
        <Box>
            <DialogTitle>
                Swap Leader:

                {/* displays your squad */}
                <Card className="fit" variant="outlined">
                    {squad.map(monster => (
                        <div className="inline padding" key={monster.id}>
                            <h6 onClick={() => swapLeader(monster)} className={`margin inline ${monster.gold ? "gold" : ""} ${monster.gold === null ? "silver" : ""}`}>{monster.monster}</h6>
                        </div>
                    ))}
                </Card>
            </DialogTitle>

            <DialogContent>

                {/* displays squad details */}
                <Card sx={{ minWidth: 200, maxWidth: 150 }} className='inline padding '>
                    <h6 className='right margin'>hp: {lead.hp}/{lead.maxhp}</h6>

                    {/* displays health bar */}
                    <HpBar stats={lead} />

                    <h4 className={`${lead.gold ? "gold" : ""} ${lead.gold === null ? "silver" : ""}`}>{lead.monster}</h4>
                    <h6 className=" margin right">lvl.{lead.lvl} {lead.exp}/100</h6>
                    <h5>{lead.type} type</h5>
                </Card>

                <p className='inline'>:  vs  :</p>

                {/* displays opponent details */}
                <Card sx={{ minWidth: 200, maxWidth: 150 }} className='inline padding'>
                    <h6 className='right margin'>hp: {opponent.hp}/{opponent.maxhp}</h6>

                    {/* displays health bar */}
                    <HpBar stats={opponent} />

                    <h4 className={`${opponent.gold ? "gold" : ""}`}>{opponent.monster}</h4>
                    <h6 className=" margin right">lvl.{opponent.lvl} {opponent.exp}/100</h6>
                    <h5>{opponent.type} type</h5>
                </Card>

            </DialogContent>
            <DialogActions>

                {/* displays death button */}
                {youDied()}

                {/* displays win button */}
                {opponent.hp <= 0 &&
                    <Alert severity="success" color="success">
                        <Button color="error" size="small" variant="contained" onClick={handleClose}> You Win! </Button>
                    </Alert>
                }

                {/* displays attack button */}
                {attack()}
                <Button color="secondary" size="small" variant="contained" onClick={tameAttempt}>Tame</Button>

            </DialogActions>
        </Box>
    )
}

export default Battle;