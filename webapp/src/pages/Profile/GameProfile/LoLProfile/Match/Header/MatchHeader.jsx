import Action from "./Action";
import Data from "./Data";

function MatchHeader({data,playerId,action}) {
    return (
        <>
            <div className={getWinOrLose(data,playerId)?"win":"lose"}>
                <Data data={data} win={getWinOrLose(data,playerId)} summonerData={data.info.participants.find(participant => participant.summonerId === playerId)}/>
                <Action onClick={()=>action()}/>
            </div>
        </>
    );
}

function getWinOrLose(data,id){
    var participante = data.info.participants.find(participant => participant.summonerId === id)
    return participante.win;
}

export default MatchHeader