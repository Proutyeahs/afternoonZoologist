import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function Opponent({ monster, handleClickOpen, tameAttempt }) {

    return (

        // displays opponent details
        <Box sx={{ minWidth: 250, maxWidth: 250 }} className='inline right'>
            <div>
                <div className="scroll">
                    <CardContent>
                        <h6 className=" margin right">lvl.{monster.lvl} ({monster.exp}/100)</h6>
                        <h4 className={`${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>
                        <h5>{monster.type} type</h5>
                        <p>{monster.description}</p>
                    </CardContent>
                </div>
                <CardActions>
                    <Button color="secondary" size="small" variant="contained" onClick={tameAttempt}>Tame</Button>
                    <Button color="error" size="small" variant="contained" onClick={handleClickOpen}>Fight</Button>
                </CardActions>
            </div>
        </Box>
    )
}

export default Opponent;