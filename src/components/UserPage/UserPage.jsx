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
      {monsters.map(monster => (
        <div key={monster.id}>
          <p>{monster.monster}</p>
        </div>
      ))}
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
