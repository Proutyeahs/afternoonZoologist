import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import Battle from '../Battle/Battle';
import SquadMember from '../SquadMember/SquadMember';
import Opponent from '../Opponent/Opponent';

function Map() {

  const dispatch = useDispatch()

  const user = useSelector((store) => store.user);
  const monsters = useSelector((store) => store.monsters)
  const squad = useSelector((store) => store.squad)
  const lead = useSelector((store) => store.lead)

  const [monster, setMonster] = useState('')
  const [details, setDetails] = useState('')
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(null)

  useEffect(() => {
    dispatch({
      type: 'GET_MONSTERS'
    })
    dispatch({
      type: 'GET_SQUAD'
    })
  }, [])

  const toggleMonster = (data) => {
    setToggle(true)
    setMonster(data)
  }

  const toggleDetails = (data) => {
    setToggle(false)
    setDetails(data)
  }

  const handleClickOpen = () => {
    if( lead.hp === 0) {
      return alert("Your Lead Animal is Dead")
    }
    setOpen(true);
    dispatch({
      type: "SET_OPPONENT",
      payload: monster
    })
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="container">

      <h2>Welcome, {user.username}!</h2>

      <p className='margin'>Current Squad:</p>
      <Card className="size" variant="outlined">
        {squad.map(monster => (
          <div className="inline padding" key={monster.id}>
            <h4 onClick={() => toggleDetails(monster)} className={`margin inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>
          </div>
        ))}
      </Card>

      <p className='margin'>Animals in your area:</p>

      <Card className="size" variant="outlined">
        {monsters.map(monster => (
          <div className="inline padding" key={monster.id}>
            <h4 onClick={() => toggleMonster(monster)} className={`margin inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>
          </div>
        ))}
      </Card>

      {toggle === true &&
          <Opponent monster={monster} handleClickOpen={handleClickOpen}/>
      }

      <Dialog open={open} onClose={handleClose}>
        <Battle/>
      </Dialog>

      {toggle === false &&
          <SquadMember details={details}/>
      }

    </div>
  );
}

export default Map;
