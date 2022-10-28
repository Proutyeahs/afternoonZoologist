import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Battle() {

    const dispatch = useDispatch()

    const lead = useSelector((store) => store.lead)
    const opponent = useSelector((store) => store.opponent)

    const fight = () => {

        // basic dmg so i have something to work with
        let dmg = Math.round(lead.att * lead.att / (lead.att + opponent.def))
        let monsterDmg = Math.round(opponent.att * opponent.att / (opponent.att + lead.def))

        // Eww dont look at my if statement 
        if (lead.type === "Air" && opponent.type === "Air") {
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

    const dead = () => {
        dispatch({
            type: "DEAD",
            payload: lead
        })
    }

    const win = () => {
        dispatch({
            type: "NEW_MONSTER",
            payload: opponent.id
        })
        lead.opponentLvl = opponent.lvl
        console.log()
        dispatch({
            type: "WIN",
            payload: lead
        })
    }

    const attack = () => {
        if (opponent.hp >= 0 && lead.hp >= 0) {
            return <Button color="error" size="small" variant="contained" onClick={fight}> Attack </Button>
        } else if (lead.hp <= 0) {
            return <Button color="error" size="small" variant="contained" onClick={dead}> You Died! </Button>
        } else if (opponent.hp <= 0) {
            return <Button color="error" size="small" variant="contained" onClick={win}> You Win! </Button>
        } else {
            return
        }
    }

    return (
        <Box>
            <DialogTitle>
                Battle!
            </DialogTitle>

            <DialogContent>

                <Card className='inline padding'>
                    <p>hp: {lead.hp}</p>
                    <h4 className={`${lead.gold ? "gold" : ""}`}>{lead.monster}</h4>
                    <h5>{lead.type} type</h5>
                    <p>lvl: {lead.lvl}, exp: {lead.exp}</p>
                    <p>att: {lead.att}, def: {lead.def}</p>
                </Card>

                {attack()}

                <Card className='inline padding'>
                    <p>hp: {opponent.hp}</p>
                    <h4 className={`${opponent.gold ? "gold" : ""}`}>{opponent.monster}</h4>
                    <h5>{opponent.type} type</h5>
                    <p>lvl: {opponent.lvl}, exp: {opponent.exp}</p>
                    <p>att: {opponent.att}, def: {opponent.def}</p>
                </Card>

            </DialogContent>

            <DialogActions>

            </DialogActions>
        </Box>
    )
}

export default Battle;