import { images } from "../../helpers/images";
import VerticalSpliter from "../components/VerticalSpliter";

function TournamentInformation() {
    return (
        <>
            <div className="card">
                <div className="card-header">
                    Información
                </div>
                <div className="card-content">
                    <div className="flex no-wrap">
                        <div>
                            <div>
                                <h2>Descripción</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                            <div>
                                <h2>Reglas</h2>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            </div>
                        </div>
                        <VerticalSpliter />
                        <div className="size-1-4">
                            <div className="flex vertical">
                                <div className="flex vertical spacing-medium game-card align-center align-middle ">
                                    <span>Juego</span>
                                    <img src={images("./valoranttorneo.jpg")} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TournamentInformation;
