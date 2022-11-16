import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Grid() {

    const dispatch = useDispatch()

    const user = useSelector((store) => store.user)

    useEffect(() => {
        dispatch({
            type: "GET_MAP",
            payload: user.id
        })
    }, []);

    // This will use the map data from the database
    let number = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    return (
        <>
            <div className="grid">
                {number.map(num => (
                    <div key={num.id} className="imageGrid"></div>
                ))}
            </div>
        </>
    )
}

export default Grid