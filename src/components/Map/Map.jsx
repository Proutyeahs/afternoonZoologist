import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import Battle from '../Battle/Battle';
import SquadMember from '../SquadMember/SquadMember';
import Opponent from '../Opponent/Opponent';
import Movement from './Movement';
import Grid from './Grid';
import Details from './Details';

function Map() {

  const dispatch = useDispatch()

  // access to reducers
  const user = useSelector((store) => store.user);
  const monsters = useSelector((store) => store.monsters)
  const squad = useSelector((store) => store.squad)
  const lead = useSelector((store) => store.lead)

  // local state storage
  const [monster, setMonster] = useState('')
  const [details, setDetails] = useState('')
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(null)

  // call gets on load/reload
  useEffect(() => {
    dispatch({
      type: 'GET_MONSTERS',
      payload: lead.lvl
    })
    dispatch({
      type: 'UNSET_SQUAD'
    })
    dispatch({
      type: 'GET_SQUAD'
    })
    dispatch({
      type: 'GET_SQUAD_COMPANION'
    })
  }, [])

  // changes state to display the Opponent page
  const toggleMonster = (data) => {
    setToggle(true)
    setMonster(data)
  }

  // changes state to display the SquadMember page
  const toggleDetails = (data) => {
    setToggle(false)
    setDetails(data)
  }

  // opens battle Dialog
  const handleClickOpen = () => {

    // checks what squad members are alive and sets the next alive member to lead reducer
    for (let member of squad) {
      if (member.hp > 0) {
        dispatch({
          type: 'SET_LEAD',
          payload: member
        })
        setOpen(true)

        // sets the selected opponent to the reducer
        dispatch({
          type: "SET_OPPONENT",
          payload: monster
        })
        return
      }
    }
    if (lead.hp < 1) {
      return alert("All Your Animals are Dead")
    }
  };

  // closes battle Dialog
  const handleClose = () => {
    setOpen(false);
  };

  // rolls odds to catch monster
  let odds = 10
  const tameAttempt = () => {

    // sets attempt value on click
    let attempt = Math.floor(Math.random() * (odds - 1 + 1)) + 1
    if (odds < 20) {
      odds++
    }
    console.log(attempt, odds)

    if (attempt === 1) {

      // dispatches monster data
      dispatch({
        type: 'CATCH_MONSTER',
        payload: monster
      })

      // dispatches the monster to be removed from the reducer
      dispatch({
        type: "POP_MONSTER",
        payload: monster
      })

      setToggle(null)
      setOpen(false);

      // dispatches get request when the reducer is empty
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
      <div className='right'>
        <Movement />
      </div>

      {/* displays your squad */}
      <div>
        <div className='sideScroll'>
          <p className='margin'>Current Squad:</p>
          <div className="hight size">
            {squad.map(monster => (
              <div className="inline padding" key={monster.id}>
                <h4 onClick={() => toggleDetails(monster)} className={`margin inline ${monster.gold ? "gold" : ""} ${monster.gold === null ? "silver" : ""}`}>{monster.monster}</h4>
              </div>
            ))}
          </div>

          <p className='margin'>Animals in your area:</p>

          {/* displays monsters */}
          <div className="size">
            {monsters.map(monster => (
              <div className="inline padding" key={monster.id}>
                <h4 onClick={() => toggleMonster(monster)} className={`margin inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Grid />

      {/* displays Opponent details */}
      {toggle === true &&
        <Opponent monster={monster} handleClickOpen={handleClickOpen} tameAttempt={tameAttempt} />
      }

      {/* displays battle Dialog when open */}
      <Dialog open={open} onClose={handleClose}>
        <Battle squad={squad} tameAttempt={tameAttempt} handleClose={handleClose} monsters={monsters} setToggle={setToggle} />
      </Dialog>

      {/* displays SquadMember details */}
      {toggle === false &&
        <SquadMember details={details} />
      }

      <Details />

    </div>
  );
}

export default Map;
