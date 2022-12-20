import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Companion() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const errors = useSelector((store) => store.errors);
    const dispatch = useDispatch();
    const history = useHistory();

    // dispatches companion data
    const saveCompanion = (event) => {
        event.preventDefault();

        console.log(name, description)
        
        dispatch({
            type: 'SAVE_COMPANION',
            payload: {
                name: name,
                description: description,
            },
        });
        history.push('/map')
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
                <input className="btn" type="submit" name="submit" value="Comfirm Companion" />
            </div>
        </form>
    );
}

export default Companion;
