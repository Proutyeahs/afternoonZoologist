import { Card } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

function Movement({lead}) {

    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)

    const getMonsters = () => {
        dispatch({
            type: 'GET_MONSTERS',
            payload: lead.lvl
          })
    }

    const move = (num) => {
        console.log(user.location)
        const position = {loc: user.location + num}
        dispatch({
            type: 'MOVE',
            payload: position
        })
        getMonsters()
    }

    return (
        <>
            <Card className="size inline">
                <div className="center">
                    <KeyboardDoubleArrowUpIcon color="success" size="small" variant="contained" onClick={() => move(-30)}>up</KeyboardDoubleArrowUpIcon>
                </div>
                <div>
                    <KeyboardDoubleArrowLeftIcon color="success" size="small" variant="contained" onClick={() => move(-1)}>left</KeyboardDoubleArrowLeftIcon>
                    <GpsFixedIcon></GpsFixedIcon>
                    <KeyboardDoubleArrowRightIcon color="success" size="small" variant="contained" onClick={() => move(1)}>right</KeyboardDoubleArrowRightIcon>
                </div>
                <div className="center">
                    <KeyboardDoubleArrowDownIcon color="success" size="small" variant="contained" onClick={() => move(30)}>down</KeyboardDoubleArrowDownIcon>
                </div>
            </Card>
        </>
    )
}

export default Movement