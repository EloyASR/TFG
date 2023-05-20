function Participant({ participant }) {
    return (
        <>
            <div className="size-1-4">
                <div className="participant">
                    <div className="name">{participant.name}</div>
                </div>
            </div>

        </>
    );
}

export default Participant;