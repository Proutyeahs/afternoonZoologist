import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function InfoPage() {

  useEffect(() => {
    dispatch({
      type: 'GET_COLLECTION'
    })
  }, [])

  const dispatch = useDispatch()

  const collection = useSelector((store) => store.collection)

  const [monster, setCurrentMonster] = useState('')

  return (
    <div className="container">
      <p>Animal Collection:</p>
      <Box sx={{ minWidth: 300, maxWidth: 300 }}>
        <Card variant="outlined">
          {collection.map(monster => (
            <div className="padding" key={monster.id}>
              <h4 onClick={(e) => setCurrentMonster(monster)} className={`margin inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>
            </div>
          ))}
        </Card>
      </Box>

      {monster !== '' &&
        <Box sx={{ minWidth: 300, maxWidth: 300 }} className='right'>
          <Card variant="outlined">
            <CardContent>
              <h4 className={`inline ${monster.gold ? "gold" : ""}`}>{monster.monster}</h4>, <h5 className='inline'>{monster.type} type</h5>
              <p>{monster.description}</p>
              <p>lvl: {monster.lvl}, exp: {monster.exp}, hp: {monster.hp}, att: {monster.att}, def: {monster.def}</p>
            </CardContent>
          </Card>
        </Box>
      }

    </div>
  );
}

export default InfoPage;
