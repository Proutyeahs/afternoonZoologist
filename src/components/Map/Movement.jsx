import { Card } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';

function Movement() {

    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)

    // moves user up or down
    const move = (num) => {

        // stops movement off map
        if (user.location + num < 1 || user.location + num > 660 ) {
            return
        }

        // dispatches new position
        const position = {loc: user.location + num}
        dispatch({
            type: 'MOVE',
            payload: position
        })
    }

    // moves user left
    const moveL = (num) => {

        // stops movement off map
        if (user.location % 30 === 1) {
            return
        }

        // dispatches new position
        const position = {loc: user.location + num}
        dispatch({
            type: 'MOVE',
            payload: position
        })
    }

    // moves user right
    const moveR = (num) => {

        // stops movement off map
        if (user.location % 30 === 0) {
            return
        }

        // dispatches new position
        const position = {loc: user.location + num}
        dispatch({
            type: 'MOVE',
            payload: position
        })
    }

    return (
        <>
            <Card className="size inline">
                <div className="center">
                    <KeyboardDoubleArrowUpIcon color="success" size="small" variant="contained" onClick={() => move(-30)}>up</KeyboardDoubleArrowUpIcon>
                </div>
                <div>
                    <KeyboardDoubleArrowLeftIcon color="success" size="small" variant="contained" onClick={() => moveL(-1)}>left</KeyboardDoubleArrowLeftIcon>
                    <GpsFixedIcon></GpsFixedIcon>
                    <KeyboardDoubleArrowRightIcon color="success" size="small" variant="contained" onClick={() => moveR(1)}>right</KeyboardDoubleArrowRightIcon>
                </div>
                <div className="center">
                    <KeyboardDoubleArrowDownIcon color="success" size="small" variant="contained" onClick={() => move(30)}>down</KeyboardDoubleArrowDownIcon>
                </div>
            </Card>
        </>
    )
}

export default Movement