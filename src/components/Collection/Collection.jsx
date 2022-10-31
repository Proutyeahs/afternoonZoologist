import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function Collection() {

  // call get on load/reload
  useEffect(() => {
    dispatch({
      type: 'GET_COLLECTION'
    })
  }, [])

  const dispatch = useDispatch()

  const collection = useSelector((store) => store.collection)

  const [details, setDetails] = useState('')
  const [squad, setSquad] = useState([])

  // holds selected squad members
  const addToSquad = (monster) => {

    if (details != monster) {
      setDetails(monster)
    } else {
      setDetails('')
    }

    let index = squad.indexOf(monster)

    // removes a squad member
    if (squad.includes(monster)) {
      squad.splice(index, 1)

      // sets a squad member
    } else if (squad.length < 3) {
      setSquad([...squad, monster])
    } else {
      alert("squad is full")
    }
  }

  // dispatches the squad data
  const updateSquad = () => {
    dispatch({
      type: "UPDATE_SQUAD",
      payload: squad
    })
    setSquad([])
  }

  return (
    <div className="container">

      <Button className='right' color="secondary" size="small" variant="contained" onClick={updateSquad}>Confirm Squad</Button>

      {/* displays monster collection */}
      <p>Animal Collection:</p>
      <Box sx={{ minWidth: 300, maxWidth: 300 }}>
        <Card variant="outlined">
          {collection.map(monster => (
            <div className="padding" key={monster.id}>
              <h4 onClick={() => addToSquad(monster)} className={`${monster.gold ? "gold" : ""} ${squad.includes(monster) ? "squad" : ''}`}>{monster.monster}</h4>
            </div>
          ))}
        </Card>
      </Box>

      {/* displays monster details when true */}
      {details !== '' &&
        <Box sx={{ minWidth: 300, maxWidth: 300 }} className='right'>
          <Card variant="outlined">
            <CardContent>
              <h4 className={`inline ${details.gold ? "gold" : ""}`}>{details.monster}</h4>, <h5 className='inline'>{details.type} type</h5>
              <p>{details.description}</p>
              <p>lvl: {details.lvl}, exp: {details.exp}, hp: {details.hp}, att: {details.att}, def: {details.def}</p>
            </CardContent>
            {/* <CardActions>
              <Button color="secondary" size="small" variant="contained" onClick={addToSquad}>Stage</Button>
            </CardActions> */}
          </Card>
        </Box>
      }

    </div>
  );
}

export default Collection;
