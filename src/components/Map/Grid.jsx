import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import userReducer from "../../redux/reducers/user.reducer";

function Grid() {

    const dispatch = useDispatch()

    const user = useSelector((store) => store.user)

    useEffect(() => {
        dispatch({
            type: "GET_MAP",
            payload: user.id
        })
    }, []);

    let number = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 4 }];
    return (
        <>
            <div className="grid">
                {number.map(num => (
                    <div className="imageGrid"></div>
                ))}
            </div>
        </>
    )
}

export default Grid