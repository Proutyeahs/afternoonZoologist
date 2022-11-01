function Grid() {

    let number = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];

    return (
        <>
            {number.map(num => (
                <div className="imageGrid" key={num.id}>{num.id}</div>
            ))}
        </>
    )
}

export default Grid