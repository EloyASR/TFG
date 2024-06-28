function TableRunes({data, runesData}) {

    const searchPrincipalRuneImage =  () => {
        if(runesData !== undefined && data){
            let runaPadre = runesData.find((rune) => rune.slots[0].runes.find((r)=>r.id === data.perks.styles[0].selections[0].perk));
            if(runaPadre){
                let runaHija = runaPadre.slots[0].runes.find((rune)=>rune.id === data.perks.styles[0].selections[0].perk);
                return runaHija;
            }
        }
    }

    return <>
        <div className="table-runes">
            {
                runesData ?
                    <img src={"http://ddragon.leagueoflegends.com/cdn/img/" + searchPrincipalRuneImage().icon}
                         alt="Rune icon"/>
                    :
                    <img
                        src="http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png"
                        alt="Rune icon"/>
            }
            {
                runesData ?
                    <img
                        src={"http://ddragon.leagueoflegends.com/cdn/img/" + runesData.find((rune) => rune.id === data.perks.styles[1].style)?.icon}
                        alt="Rune icon"/>
                    :
                    <img
                        src="http://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7204_Resolve.png"
                        alt="Rune icon"/>
            }
        </div>
    </>;
}

export default TableRunes