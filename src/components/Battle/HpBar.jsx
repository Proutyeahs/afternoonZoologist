import { useEffect } from 'react';

function HpBar({ stats }) {

    useEffect(() => {
        health()
    }, [])

    // turns hp into a percentage
    let hp = (stats.hp / stats.maxhp) * 100

    // creates health bar
    const health = () => {
        let bar = []
        for (let i = 0; i < hp; i++) {
            bar.push(<div className='health' key={i}></div>)
        }
        return bar
    }

    // displays health bar
    return (
        <>
            <div className="bar">
                {health()}
            </div>
        </>
    )
}

export default HpBar