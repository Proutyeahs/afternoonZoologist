import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useSelector, useDispatch } from 'react-redux';

function Details() {

    const map = useSelector((store) => store.map)
    const user = useSelector((store) => store.user);

    return (
        // displays world map details
        <Box sx={{ minWidth: 250, maxWidth: 250 }} className='inline right'>
            <div className="scroll">
                {/* <Card variant="outlined"> */}
                    <CardContent>
                        <h6>World Location</h6>
                        <h4>Coordinates:</h4>
                        {map.map(map => (
                            <div key={map.id}>{user.location === map.id && <p>X:{map.x} Y:{map.y}</p>}</div>
                        ))}
                        <h5>Description:</h5>
                        <p>Events:</p>
                    </CardContent>
                    <CardActions>
                    </CardActions>
                {/* </Card> */}
            </div>
        </Box >
    )
}

export default Details;