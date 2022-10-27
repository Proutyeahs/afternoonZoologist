import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function Opponent({ monster, handleClickOpen }) {

    const dispatch = useDispatch()

    let odds = 15
    const tameAttempt = () => {
        let attempt = Math.floor(Math.random() * (odds - 1 + 1)) + 1
        odds++
        console.log(attempt, odds)
        if (attempt === 1) {
            dispatch({
                type: 'CATCH_MONSTER',
                payload: monster
            })
        }
    }

    return (
        <Box sx={{ minWidth: 300, maxWidth: 300 }} className='right'>
            <Card variant="outlined">
                <CardContent>
                    <h4 className={`inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>, <h5 className='inline'>{monster.type} type</h5>
                    <p>{monster.description}</p>
                    <p>lvl: {monster.lvl}, exp: {monster.exp}, hp: {monster.hp}, att: {monster.att}, def: {monster.def}</p>
                </CardContent>
                <CardActions>
                    <Button color="secondary" size="small" variant="contained" onClick={tameAttempt}>Tame</Button>
                    <Button color="error" size="small" variant="contained" onClick={handleClickOpen}>Fight</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Opponent;