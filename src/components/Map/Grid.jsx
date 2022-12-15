import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Grid() {

    const dispatch = useDispatch()

    // userLocation and mapInfo from the database 
    const map = useSelector((store) => store.map)
    const user = useSelector((store) => store.user)

    useEffect(() => {
        dispatch({
            type: "GET_MAP",
            payload: user.id
        })
    }, []);

    return (
        <>
            <div className="grid">

                {/* world map 1st draft */}
                <img className="map" src="https://res.cloudinary.com/dzyea2237/image/upload/v1671134379/IMG_20221215_135502_yah9ww.jpg" />

                {/* world map inital sketch */}
                {/* <img className="map" src="https://res.cloudinary.com/dzyea2237/image/upload/v1669783170/PXL_20221130_043409125_xk3sky.jpg" /> */}

                {map.map(grid => (
                    <div key={grid.id} className={`imageGrid ${user.location === grid.id ? "location" : ""}`}></div>
                ))}
            </div>
        </>
    )
}

export default Grid