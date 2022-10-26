import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function Map() {

  const dispatch = useDispatch()

  const monsters = useSelector((store) => store.monsters)

  const [monster, setCurrentMonster] = useState('')

  useEffect(() => {
    dispatch({
      type: 'GET_MONSTERS'
    })
  }, [])

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
    }
  }

  const user = useSelector((store) => store.user);
  return (
    <div className="container">

      <h2>Welcome, {user.username}!</h2>

      <p className='margin'>Current Party:</p>
      {/* <Card className="size" variant="outlined">
        {monsters.map(monster => (
          <div className="inline padding" key={monster.id}>
            <h4 onClick={(e) => setCurrentMonster(monster)} className={`margin inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>
          </div>
        ))}
      </Card> */}

      <p className='margin'>Animals in your area:</p>

      <Card className="size" variant="outlined">
        {monsters.map(monster => (
          <div className="inline padding" key={monster.id}>
            <h4 onClick={(e) => setCurrentMonster(monster)} className={`margin inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>
          </div>
        ))}
      </Card>

      {monster !== '' &&
        <Box sx={{ minWidth: 300, maxWidth: 300 }} className='right'>
          <Card variant="outlined">
            <CardContent>
              <h4 className={`inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>, <h5 className='inline'>{monster.type} type</h5>
              <p>{monster.description}</p>
              <p>lvl: {monster.lvl}, exp: {monster.exp}, hp: {monster.hp}, att: {monster.att}, def: {monster.def}</p>
            </CardContent>
            <CardActions>
              <Button color="secondary" size="small" variant="contained" onClick={tameAttempt}>Tame</Button>
            </CardActions>
          </Card>
        </Box>
      }

    </div>
  );
}

export default Map;
