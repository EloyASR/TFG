function SummonerWard({ward}){
    return (
        <>
            <div className="ward">
            {ward !== 0 ?
                <img src={"http://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/"+ward+".png"} alt="Rune icon"/>
                :<></>
            }
            </div>
        </>
    );
}

export default SummonerWard