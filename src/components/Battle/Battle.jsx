import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Battle() {

    const lead = useSelector((store) => store.lead)
    const monsters = useSelector((store) => store.monsters)

    return (
        <Box>
            <DialogTitle>
                Battle!
            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Box>
    )
}

export default Battle;