import "./LoLProfile.css"
import LoLHeader from "./LoLHeader";
import LoLMatch from "./LoLMatch";
import LoLQueue from "./LoLQueue";

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