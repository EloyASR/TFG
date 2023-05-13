import { images } from "../../helpers/images";
import { useState, useRef, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import InputRadio from "../components/InputRadio";
import InputNumber from "../components/InputNumber";

function Step1Form({ actionContinue, setBaseInfo, baseInfo }) {

    const gameInput = useRef(null);

    const [informacionBasica, setInformacionBasica] = useState({});

    const [showSearchInput, setShowSearchInput] = useState(true);
    const [showSelectedGame, setShowSelectedGame] = useState(false);
    const [showSearchOptions, setShowSearchOptions] = useState(false);
    const [writtingGame, setWrittingGame] = useState(false);
    const [writtingGameValue, setWrittingGameValue] = useState();


    const gamesList = [
        {
            gameId: "LEAGUE_OF_LEGENDS",
            gameName: "League of Legends",
            icon: "./lolicon1.png"
        },
        {
            gameId: "VALORANT",
            gameName: "Valorant",
            icon: "./valicon2.png"
        },
        {
            gameId: "POKEMONVGC",
            gameName: "PokemonVGC",
            icon: "./pokemonicon.png"
        }
    ];


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

    const getGame = function(game) {
        console.log(game);
        return gamesList.find((element) => element.gameId === game)
    }

    const setName = (name) => {
        var copiaInformacionBasica = {
            name: name,
            game: informacionBasica.game,
            size: informacionBasica.size,
            playersType: informacionBasica.playersType
        }

        setBaseInfo(copiaInformacionBasica);
    }

    const setGame = (game) => {
        var copiaInformacionBasica = {
            name: informacionBasica.name,
            game: game.gameId,
            size: informacionBasica.size,
            playersType: informacionBasica.playersType
        }

        setBaseInfo(copiaInformacionBasica);
    }

    const setSize = (size) => {
        var copiaInformacionBasica = {
            name: informacionBasica.name,
            game: informacionBasica.game,
            size: size,
            playersType: informacionBasica.playersType
        }

        setBaseInfo(copiaInformacionBasica);
    }

    const setPlayersType = (playersType) => {
        var copiaInformacionBasica = {
            name: informacionBasica.name,
            game: informacionBasica.game,
            size: informacionBasica.size,
            playersType: playersType
        }

        setBaseInfo(copiaInformacionBasica);
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
                        <div className="flex vertical spacing-medium">
                            <div className="size-content">
                                <div className="flex align-middle align-spread">
                                    <div className="size-1-2">
                                        <div className="form-row">
                                            <div className="form-label">
                                                <label htmlFor="">
                                                    Nombre de torneo
                                                    <span className="constraint">{"(30 caracteres maximo)"}</span>
                                                </label>
                                            </div>
                                            <div className="own-form-text">
                                                <input id="tournament-name" type="text" name="tournament-name" maxLength="30" onChange={(e) => { setName(e.target.value) }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="size-content">
                                <div className="form-row">
                                    <div className="form-label">
                                        <label htmlFor="">Juego</label>
                                    </div>
                                    <div className="flex vertical spacing-medium">
                                        <div className="size-content">
                                            <div className="flex spacing-medium">
                                                <div className="size-1-6">
                                                    <div className="img-container" onClick={() => {
                                                        setGame(gamesList[0])
                                                        setShowSelectedGame(true);
                                                        setShowSearchInput(false);
                                                        setShowSearchOptions(false);
                                                    }}>
                                                        <img src={images("./leagueoflegendstorneo.jpg")} alt="League Of Legends Img" />
                                                    </div>
                                                </div>
                                                <div className="size-1-6">
                                                    <div className="img-container" onClick={() => {
                                                        setGame(gamesList[1])
                                                        setShowSelectedGame(true);
                                                        setShowSearchInput(false);
                                                        setShowSearchOptions(false);
                                                    }}>
                                                        <img src={images("./valoranttorneo.jpg")} alt="Valorant Img" />
                                                    </div>
                                                </div>
                                                <div className="size-1-6">
                                                    <div className="img-container" onClick={() => {
                                                        setGame(gamesList[2])
                                                        setShowSelectedGame(true);
                                                        setShowSearchInput(false);
                                                        setShowSearchOptions(false);
                                                    }}>
                                                        <img src={images("./pokemontorneo.jpg")} alt="Pokemon Img" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="size-content">
                                            <div className="form-row">
                                                <div className="form-field own-form-select own-form-search">
                                                    <input type={showSearchInput ? "search" : "hidden"} name="tournament-game" placeholder="Seleccionar un juego" autoComplete="off" onChange={(e) => handleGameChange(e)} onFocus={() => { setShowSearchOptions(true) }} onBlur={() => { setShowSearchOptions(false) }} ref={e => { gameInput.current = e }} />
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
                                                                    <div className="flex align-middle spacing-small">
                                                                        <div className="size-content">
                                                                            <div className="discipline format-icon size-tiny">
                                                                                <img src={images(getGame(informacionBasica.game).icon)} alt="" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="size-content">
                                                                            <span>{getGame(informacionBasica.game).gameName}</span>
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
                                                                                gamesList.map((game, index) => {
                                                                                    if (game.gameName.toLowerCase().includes(writtingGameValue?.toLowerCase())) {
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
                                                                                                                <img src={images(game.icon)} alt="" />
                                                                                                            </div>
                                                                                                        </div>
                                                                                                        <div className="size-content">
                                                                                                            <span>{game.gameName}</span>
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
                                        <InputNumber defaultValue={informacionBasica.size} label={"Tamaño"} placeholder={"Tamaño (2 - 32)"} min={"2"} max={"32"} onChange={(e) => setSize(e.target.valueAsNumber)} />
                                    </div>
                                    <InputRadio label={"Tipo de participantes"} id={"participantes"} name={"participantes"} itemsList={["Jugadores", "Equipos"]} defaultChecked={informacionBasica.playersType} checked={informacionBasica.playersType} onChange={(value)=>setPlayersType(value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="flex align-end">
                            <div className="size-content next">
                                <button type="submit">
                                    Continue
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