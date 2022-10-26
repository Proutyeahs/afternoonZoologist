import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

function UserPage() {

  const dispatch = useDispatch()

  const monsters = useSelector((store) => store.monsters)

  useEffect(() => {
    dispatch({
      type: 'GET_MONSTERS'
    })
  }, [])


  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Animals in your area:</p>
      {monsters.map(monster => (
        <div key={monster.id}>
          <h4 className={`inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>, <h5 className='inline'>{monster.type} type</h5>
          <p>lvl: {monster.lvl}, exp: {monster.exp}, hp: {monster.hp}, att: {monster.att}, def: {monster.def}</p>
        </div>
      ))}
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
