import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Companion() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [disabled, setDisabled] = useState(false)
    const errors = useSelector((store) => store.errors);
    const dispatch = useDispatch();
    const history = useHistory();

    // dispatches companion data
    const saveCompanion = (event) => {
        setDisabled(true)
        event.preventDefault();

        dispatch({
            type: 'SAVE_COMPANION',
            payload: {
                name: name,
                description: description,
            },
        });
        dispatch({
            type: 'ADD_ITEM',
            payload: {id: 1, quantity: 100}
        })
        setTimeout(() => {
            history.push('/map')
            setDisabled(false)
        }, 400)
    };

    return (

        // displays companion submission form
        <form className="formPanel" onSubmit={saveCompanion}>
            <h2>Create an Animal Companion</h2>
            {errors.registrationMessage && (
                <h3 className="alert" role="alert">
                    {errors.registrationMessage}
                </h3>
            )}
            <div>
                <label htmlFor="name">
                    Name:
                    <input
                        placeholder='Name your pet'
                        type="text"
                        name="name"
                        value={name}
                        required
                        onChange={(event) => setName(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <label htmlFor="description">
                    <p>Description:</p>
                    <textarea
                        placeholder='Add a description of your pet'
                        type="text"
                        name="description"
                        rows={3}
                        value={description}
                        required
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </label>
            </div>
            <div>
                <input disabled={disabled} className="btn" type="submit" name="submit" value="Confirm Companion" />
            </div>
        </form>
    );
}

export default Companion;
