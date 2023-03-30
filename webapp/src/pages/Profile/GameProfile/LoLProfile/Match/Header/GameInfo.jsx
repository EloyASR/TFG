function GameInfo({queueId,gameDuration, win}) {
    return (
        <>
            <div className="game_info">
                <div className="type">{getQueueName(queueId)}</div>
                <div className="separator"></div>
                <div className="result">{win?"Victory":"Defeat"}</div>
                <div className="duration">{Math.trunc(gameDuration/60)} min {gameDuration%60} s</div>
            </div>
        </>
    );
}

function getQueueName(queueId){
    switch(queueId){
        case 400:
            return "Draft Pick";
        case 420:
            return "Ranked Solo";
        case 430:
            return "Blind Pick";
        case 440:
            return "Ranked Flex";
        case 450:
            return "ARAM";
        default:
            return "Default Game";
    }
}

export default GameInfo;