import "./LoLProfile.css"
import LoLHeader from "./Header/LoLHeader";
import LoLMatch from "./Match/LoLMatch";
import LoLQueue from "./Queue/LoLQueue";

function LoLProfile(props) {

    return <>
        <div className="lol-profile">
            <div className="header">
                <LoLHeader/>
            </div>
            <div className="body">
                <div className="left">
                    <LoLQueue ranked={false}/>
                    <LoLQueue ranked={true}/>
                </div>
                <div className="center">
                    <LoLMatch/>
                </div>
            </div>
        </div>
    </>;
}

export default LoLProfile