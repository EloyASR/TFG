import "./Prize.css";
import React from "react";
import PrizeItem from "./PrizeItem";
import {useEffect, useState} from "react";
import prizesService from "../../services/prizeService";
import prizeService from "../../services/prizeService";
import Pagination from "../components/Pagination";
import {useNavigate} from "react-router";
import {faCircleInfo, faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function PrizeList() {

    const [prizes, setPrizes] = useState([]);
    const [actualPage, setActualPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const getPrizes = async () => {
        let creator = JSON.parse(localStorage.getItem("user")).uid;
        let data = await prizesService.getPrizesByCreator(creator,actualPage);
        setPrizes(data.prizes);
        setTotalPages(data.totalPages);
    }

    useEffect(() => {
        getPrizes();
    }, [actualPage]);

    const handleDelete = async (prizeId) => {
        await prizeService.deletePrize(prizeId);
        getPrizes();
    };

    return <>
        <div className="main">
            <div className="flex vertical gap-medium prizes-page">
                <div className="flex">
                    <div className="separador-flex"></div>
                    <div className={"flex align-bottom add accept"}>
                        <button onClick={() => navigate("/prize/create")}>
                            <FontAwesomeIcon icon={faPlus} />
                            Crear premio
                        </button>
                    </div>
                </div>
                <div className="prizes">
                    <div className="flex vertical gap-medium body">
                        {
                            prizes && prizes.length > 0 ?
                            prizes.map((prize, key)=>{
                                return <PrizeItem key={key} prize={prize} onDelete={handleDelete}/>
                            })
                            :
                            <>
                                <div className={"no-data-found flex vertical align-center align-middle gap-large"}>
                                    <FontAwesomeIcon icon={faCircleInfo} size={"2xl"} color={"#626363"}/>
                                    <p>No se han encontrado premios</p>
                                </div>
                            </>
                        }
                    </div>
                </div>
                {
                    totalPages > 0 ?
                        <div className="flex align-center">
                            <Pagination numPages={totalPages} onClick={(number) => setActualPage(number)}/>
                        </div>
                        :
                        <></>
                }
            </div>
        </div>
    </>
}

export default PrizeList;