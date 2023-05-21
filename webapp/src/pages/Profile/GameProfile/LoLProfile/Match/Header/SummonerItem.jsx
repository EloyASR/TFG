function SummonerItem({ item }) {
    return (
        <>
            <div className="item">
                {item !== 0 ?
                    <img src={"http://ddragon.leagueoflegends.com/cdn/13.10.1/img/item/" + item + ".png"} alt="Rune icon" />
                    : <></>
                }
            </div>
        </>
    );
}

export default SummonerItem