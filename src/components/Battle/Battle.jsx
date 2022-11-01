import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Battle({ squad, tameAttempt, handleClose, monsters, setToggle }) {

    const dispatch = useDispatch()

    const lead = useSelector((store) => store.lead)
    const opponent = useSelector((store) => store.opponent)

    // runs fight calculations
    const fight = () => {

        // basic dmg so i have something to work with
        let dmg = Math.round(lead.att * lead.att / (lead.att + opponent.def))
        let monsterDmg = Math.round(opponent.att * opponent.att / (opponent.att + lead.def))

        // Eww dont look at my if statement 
        // checks if leader is dead
        if (lead.hp === 0) {
            return alert("This Animal can no longer fight!")

            // checks type advantage
        } else if (lead.type === "Air" && opponent.type === "Air") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 1
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 1
            })
        } else if (lead.type === "Air" && opponent.type === "Earth") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 2
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 0.5
            })
        } else if (lead.type === "Air" && opponent.type === "Fire") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 0.5
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 2
            })
        } else if (lead.type === "Air" && opponent.type === "Water") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 1
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 1
            })
        } else if (lead.type === "Water" && opponent.type === "Air") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 1
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 1
            })
        } else if (lead.type === "Water" && opponent.type === "Earth") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 0.5
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 2
            })
        } else if (lead.type === "Water" && opponent.type === "Fire") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 2
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 0.5
            })
        } else if (lead.type === "Water" && opponent.type === "Water") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 1
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 1
            })
        } else if (lead.type === "Fire" && opponent.type === "Air") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 2
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 0.5
            })
        } else if (lead.type === "Fire" && opponent.type === "Earth") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 1
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 1
            })
        } else if (lead.type === "Fire" && opponent.type === "Fire") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 1
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 1
            })
        } else if (lead.type === "Fire" && opponent.type === "Water") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 0.5
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 2
            })
        } else if (lead.type === "Earth" && opponent.type === "Air") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 0.5
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 2
            })
        } else if (lead.type === "Earth" && opponent.type === "Earth") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 1
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 1
            })
        } else if (lead.type === "Earth" && opponent.type === "Fire") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 1
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 1
            })
        } else if (lead.type === "Earth" && opponent.type === "Water") {
            dispatch({
                type: "DEAL_DMG",
                payload: dmg * 2
            })
            dispatch({
                type: "TAKE_DMG",
                payload: monsterDmg * 0.5
            })
        }
    }

    // dispatches dead monster data
    const dead = () => {
        dispatch({
            type: "DEAD",
            payload: lead
        })
        handleClose()
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
        handleClose()
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
                    <Button color="error" size="small" variant="contained" onClick={dead}> You Died! </Button>
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
                            <h6 onClick={() => swapLeader(monster)} className={`margin inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h6>
                        </div>
                    ))}
                </Card>
            </DialogTitle>

            <DialogContent>

                {/* displays squad details */}
                <Card sx={{ minWidth: 200, maxWidth: 150 }} className='inline padding '>
                    <p>hp: {lead.hp}</p>
                    <h4 className={`${lead.gold ? "gold" : ""}`}>{lead.monster}</h4>
                    <h5>{lead.type} type</h5>
                    <p>lvl: {lead.lvl}, exp: {lead.exp}</p>
                    <p>att: {lead.att}, def: {lead.def}</p>
                </Card>

                <p className='inline'>:  vs  :</p>

                {/* displays opponent details */}
                <Card sx={{ minWidth: 200, maxWidth: 150 }} className='inline padding'>
                    <p>hp: {opponent.hp}</p>
                    <h4 className={`${opponent.gold ? "gold" : ""}`}>{opponent.monster}</h4>
                    <h5>{opponent.type} type</h5>
                    <p>lvl: {opponent.lvl}, exp: {opponent.exp}</p>
                    <p>att: {opponent.att}, def: {opponent.def}</p>
                </Card>

            </DialogContent>
            <DialogActions>

                {/* displays death button */}
                {youDied()}

                {/* displays win button */}
                {opponent.hp <= 0 &&
                    <Alert severity="success" color="success">
                        <Button color="error" size="small" variant="contained" onClick={win}> You Win! </Button>
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