import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function UserPage() {

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
      <p>Animals in your area:</p>
      {monsters.map(monster => (
        <div key={monster.id}>
          <h4 onClick={(e) => setCurrentMonster(monster)} className={`inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>
        </div>
      ))}
      {monster !== '' &&
        <div className='right'>
          <h4 className={`inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>, <h5 className='inline'>{monster.type} type</h5>
          <p>lvl: {monster.lvl}, exp: {monster.exp}, hp: {monster.hp}, att: {monster.att}, def: {monster.def}</p>
          <button onClick={tameAttempt}>Tame</button>
        </div>
      }
      <LogOutButton className="btn" />
    </div>
  );
}

export default UserPage;
