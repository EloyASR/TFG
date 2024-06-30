import { images } from "../../../helpers/images";
import { useState, useRef, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import InputRadio from "../../components/InputRadio";
import Combobox from "../List/Combobox";
import gameService from "../../../services/gameService";
import React from "react";
import prizeService from "../../../services/prizeService";

function Step1Form({ actionContinue, setBaseInfo, baseInfo, resetPhases }) {

    const gameInput = useRef(null);

    const [informacionBasica, setInformacionBasica] = useState({});

    const [showSearchInput, setShowSearchInput] = useState(true);
    const [showSelectedGame, setShowSelectedGame] = useState(false);
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [writtingGame, setWrittingGame] = useState(false);
    const [writtingGameValue, setWrittingGameValue] = useState();
    const [games, setGames] = useState([]);
    const [prizes, setPrizes] = useState([]);

    useEffect(()=>{
        getGames();
        getPrizes();
    },[])

    useEffect(() => {
        setInformacionBasica(baseInfo);
        if(baseInfo.game){
            setShowSelectedGame(true);
            setShowSearchInput(false);
        }
    }, [baseInfo])

    useEffect(() => {
        if (writtingGame) {
            gameInput.current.focus();
        }
    }, [writtingGame])

    const getGames = async () => {
        let newGames = await gameService.getGames();
        setGames(newGames.games);
    }

    const getPrizes = async () => {
        let newPrizes = await prizeService.getPrizesByCreator(JSON.parse(localStorage.getItem("user")).uid)
        setPrizes(newPrizes.prizes);
    }

    const getPrizesNames = () => {
        let prizesNames = []
        prizes.map((prize)=>prizesNames.push(prize.name));
        return prizesNames;
    }

    const getPrizeName = (id) => {
        let prizeToFind = prizes.find((prize) => prize.uid === id)
        return prizeToFind ? prizeToFind.name : "";
    }

    const setName = (name) => {
        let copiaInformacionBasica = {
            name: name,
            game: informacionBasica.game,
            size: informacionBasica.size,
            playersType: informacionBasica.playersType,
            prize: informacionBasica.prize,
            havePrize: informacionBasica.havePrize
        }

        setBaseInfo(copiaInformacionBasica);
    }

    const setPrize = (prize) => {

        let copiaInformacionBasica = {
            name: informacionBasica.name,
            game: informacionBasica.game,
            size: informacionBasica.size,
            playersType: informacionBasica.playersType,
            havePrize: informacionBasica.havePrize,
        }

        let prizeFound = prizes.find((p)=>p.name === prize)
        if(prizeFound){
            copiaInformacionBasica.prize = prizeFound.uid;
        }else{
            copiaInformacionBasica.prize = "";
        }

        setBaseInfo(copiaInformacionBasica);
    }

    const setHavePrize = (havePrize) => {

        let copiaInformacionBasica = {
            name: informacionBasica.name,
            game: informacionBasica.game,
            size: informacionBasica.size,
            playersType: informacionBasica.playersType,
            prize: informacionBasica.prize,
            havePrize: havePrize
        }

        setBaseInfo(copiaInformacionBasica);
    }

    const setGame = (game) => {
        let copiaInformacionBasica = {
            name: informacionBasica.name,
            game: game,
            size: informacionBasica.size,
            playersType: informacionBasica.playersType,
            prize: informacionBasica.prize,
            havePrize: informacionBasica.havePrize
        }

        setBaseInfo(copiaInformacionBasica);
    }

    const setSize = (size) => {
        let copiaInformacionBasica = {
            name: informacionBasica.name,
            game: informacionBasica.game,
            size: size,
            playersType: informacionBasica.playersType,
            prize: informacionBasica.prize,
            havePrize: informacionBasica.havePrize
        }

        setBaseInfo(copiaInformacionBasica);
        resetPhases();
    }

    const handleRadioChange = (e) => {
        setHavePrize(e === "Sí");
    }

    const handlePrizeChange = (item) => {
        if(informacionBasica.havePrize) {
            setPrize(item);
        }else{
            setPrize(undefined);
        }
    }

    const handleGameChange = (e) => {
        setWrittingGame(true);
        setWrittingGameValue(e.target.value);
        setShowSearchOptions(true);
    }

    return (<>
        <div className="creacion-datos-basicos-container">
            <form className="creacion-datos-basicos-form" onSubmit={(e) => {
                e.preventDefault();
                actionContinue();
            }}>
                <div className="card">
                    <div className="card-header">
                        Crear un nuevo torneo
                    </div>
                    <div className="card-content">
                        <div className="flex vertical  gap-large">
                            <div className="size-content">
                                <div className="flex align-middle align-spread">
                                    <div className="size-1-2">
                                        <div className="form-row">
                                            <div className="form-label">
                                                <label htmlFor="">
                                                    Nombre de torneo *
                                                    <span className="constraint">{"(30 caracteres maximo)"}</span>
                                                </label>
                                            </div>
                                            <div className="own-form-text">
                                                <input id="tournament-name" type="text" defaultValue={informacionBasica.name} placeholder="Nombre del torneo" name="tournament-name" maxLength="30" onChange={(e) => { setName(e.target.value) }} required autoComplete={"off"}/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="size-content">
                                <div className="form-row">
                                    <div className="form-label">
                                        <label htmlFor="">Juego *</label>
                                    </div>
                                    <div className="flex vertical spacing-medium">
                                        <div className="size-content">
                                            <div className="flex spacing-medium">
                                                {
                                                    games.map((game, index) =>{
                                                        return <div key={index} className="size-1-6">
                                                                <div id={game._name + "-img" } className="img-container" onClick={() => {
                                                                    setGame(game)
                                                                    setShowSelectedGame(true);
                                                                    setShowSearchInput(false);
                                                                    setShowSearchOptions(false);
                                                                }}>
                                                                    <img src={images("./" + game._name + "_torneo.jpg")} alt= {game.name + " Img"} />
                                                                </div>
                                                            </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className="size-content">
                                            <div className="form-row">
                                                <div className="form-field own-form-select own-form-search">
                                                    <input type={showSearchInput ? "search" : "hidden"} name="tournament-game" placeholder="Seleccionar un juego" autoComplete="off" onChange={(e) => handleGameChange(e)} onFocus={() => { setShowSearchOptions(true) }} onBlur={() => { setShowSearchOptions(false) }} ref={e => { gameInput.current = e }} required autoComplete={"off"}/>
                                                    {
                                                        showSelectedGame && informacionBasica.game ?
                                                            <>
                                                                <div className="simple" onClick={() => {
                                                                    setWrittingGame(true);
                                                                    if (writtingGameValue) {
                                                                        setShowSearchOptions(true);
                                                                    }
                                                                    setShowSelectedGame(false);
                                                                    setShowSearchInput(true);
                                                                }}>
                                                                    <div className="flex align-middle spacing-small selectedGame">
                                                                        <div className="size-content">
                                                                            <div className="discipline format-icon size-tiny">
                                                                                <img src={images("./" + informacionBasica.game._name + "_icon.png")} alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="size-content">
                                                                            <span>{informacionBasica.game.name}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : <></>
                                                    }
                                                    {
                                                        writtingGame && writtingGameValue && showSearchOptions ?
                                                            <>
                                                                <div className="select-widget-container" data-placement="bottom-start">
                                                                    <div className="select-widget">
                                                                        <div className="select-list">
                                                                            {
                                                                                games.map((game, index) => {
                                                                                    if (game._name.toLowerCase().includes(writtingGameValue?.toLowerCase())) {
                                                                                        return (
                                                                                            <>
                                                                                                <div key={index} role="option" data-rw-option="" data-rw-focusable="" aria-selected="false" className="widget-list-option" onMouseDown={(e) => { e.preventDefault() }} onClick={() => {
                                                                                                    setGame(game)
                                                                                                    setShowSelectedGame(true);
                                                                                                    setShowSearchInput(false);
                                                                                                    setShowSearchOptions(false);
                                                                                                }}>
                                                                                                    <div className="flex align-middle spacing-small">
                                                                                                        <div className="size-content">
                                                                                                            <div className="discipline format-icon size-tiny">
                                                                                                                <img src={images("./" + game._name + "_icon.png")} alt={ game.name + " Icon Img"} />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="size-content">
                                                                                                            <span>{game.name}</span>
                                                                                                        </div>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </>);
                                                                                    } else {
                                                                                        return <></>
                                                                                    }
                                                                                })
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </>
                                                            : <></>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="size-content">
                                <div className="flex spacing-large">
                                    <div className="size-1-4">
                                        <Combobox id={"size"} name={"size"} placeholder={"Tamaño"} label={"Tamaño del torneo *"} itemsList={[2,4,6,8,10,12,14,16]} onChange={(value)=>setSize(value)} selection={informacionBasica.size} required={true}/>
                                    </div>
                                    <>
                                        <div className="size-1-4">
                                            <InputRadio label={"¿Torneo con premio?"} itemsList={["Sí", "No"]} checked={informacionBasica.havePrize ? "Sí" : "No"} id={"have-prize"} name={"have-prize"} onChange={(e) => handleRadioChange(e)} autoComplete={"off"}/>
                                        </div>
                                        {
                                            informacionBasica.havePrize ?
                                                <div className="size-1-2">
                                                    <Combobox id={"prize"} name={"prize"} itemsList={getPrizesNames()} label={"Premio *"} placeholder={"Premio"} selection={getPrizeName(informacionBasica.prize)} onChange={(item) => {handlePrizeChange(item)}} required={true} autoComplete={"off"}/>
                                                </div>
                                                :
                                                <></>
                                        }
                                    </>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="flex align-end">
                            <div className="size-content next accept">
                                <button type="submit">
                                    Continuar
                                    <FontAwesomeIcon icon={faArrowRight} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </>
    );
}

export default Step1Form;