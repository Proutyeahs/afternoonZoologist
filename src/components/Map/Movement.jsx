import { Card } from "@mui/material"
import { useDispatch } from 'react-redux';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

function Movement({lead}) {

    const dispatch = useDispatch()

    const getMonsters = () => {
        dispatch({
            type: 'GET_MONSTERS',
            payload: lead.lvl
          })
    }

    return (
        <>
            <Card className="size inline">
                <div className="center">
                    <KeyboardDoubleArrowUpIcon color="success" size="small" variant="contained" onClick={getMonsters}>up</KeyboardDoubleArrowUpIcon>
                </div>
                <div>
                    <KeyboardDoubleArrowLeftIcon color="success" size="small" variant="contained" onClick={getMonsters}>left</KeyboardDoubleArrowLeftIcon>
                    <GpsFixedIcon></GpsFixedIcon>
                    <KeyboardDoubleArrowRightIcon color="success" size="small" variant="contained" onClick={getMonsters}>right</KeyboardDoubleArrowRightIcon>
                </div>
                <div className="center">
                    <KeyboardDoubleArrowDownIcon color="success" size="small" variant="contained" onClick={getMonsters}>down</KeyboardDoubleArrowDownIcon>
                </div>
            </Card>
        </>
    )
}

export default Movement