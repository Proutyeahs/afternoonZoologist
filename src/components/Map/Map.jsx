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
      type: 'GET_MONSTERS',
      payload: lead.lvl
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

    if (squad[0].hp === 0 && squad[1].hp === 0 && squad[2].hp === 0) {
      return alert("All Your Animals are Dead")
    } else if (lead.hp === 0) {
      for (let leader of squad) {
        if (leader.hp > 0) {
          dispatch({
            type: 'SET_LEAD',
            payload: leader
          })
        }
      }
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
      dispatch({
        type: "POP_MONSTER",
        payload: monster
      })
      setToggle(null)
      setOpen(false);
      if (monsters.length === 0) {
        dispatch({
          type: 'GET_MONSTERS',
          payload: lead.lvl
        })
      }
      alert("Animal Sucessfully Tamed!")
    }
  }

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
        <Opponent monster={monster} handleClickOpen={handleClickOpen} tameAttempt={tameAttempt} />
      }

      <Dialog open={open} onClose={handleClose}>
        <Battle squad={squad} tameAttempt={tameAttempt} handleClose={handleClose} monsters={monsters} setToggle={setToggle}/>
      </Dialog>

      {toggle === false &&
        <SquadMember details={details} />
      }

    </div>
  );
}

export default Map;
