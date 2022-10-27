import React from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function Battle() {

    const lead = useSelector((store) => store.lead)
    const opponent = useSelector((store) => store.opponent)

    const fight = () => {

        let dmg = Math.round(lead.att * lead.att / (lead.att + opponent.def))
        let monsterDmg = Math.round(opponent.att * opponent.att / (opponent.att + lead.def))
        console.log("my dmg:", dmg, "opp Dmg", monsterDmg)

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

                <Button color="error" size="small" variant="contained" onClick={fight}> Attack </Button>

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