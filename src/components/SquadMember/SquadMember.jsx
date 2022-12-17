import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function SquadMember({ details }) {

    const dispatch = useDispatch()

    // sets leader to reducer
    // const setLead = () => {
    //     dispatch({ type: 'SET_LEAD', payload: details })
    // }

    return (

        // displays squad details
        <Box sx={{ minWidth: 250, maxWidth: 250 }} className='inline right'>
            <div>
                <div className="scroll">
                    <CardContent>
                        <h6 className=" margin right">lvl.{details.lvl} ({details.exp}/100)</h6>
                        <h4 className={`${details.gold ? "gold" : ""}`}>{details.monster}</h4>
                        <h5>{details.type} type</h5>
                        <p>{details.description}</p>
                    </CardContent>
                </div>
                {/* <CardActions>
                    <Button color="secondary" size="small" variant="contained" onClick={setLead}>Lead</Button>
                </CardActions> */}
            </div>
        </Box>

    )
}

export default SquadMember;