import { Link } from "react-router-dom";

const Header = ({ selected }) => {


    return (
        <>
            <div className="flex">
                <div className="size-1-2">
                    <Link to="/login">
                        <div className={selected === "login" ? "flex align-center align-middle headeritem selected" : "flex align-center align-middle headeritem"}>
                            LOG IN
                        </div>
                    </Link>
                </div>
                <div className="size-1-2">
                    <Link to="/signup">
                        <div className={selected === "signup" ? "flex align-center align-middle headeritem selected" : "flex align-center align-middle headeritem"}>
                            SIGN UP
                        </div>
                    </Link >
                </div>
            </div >
        </>
    );
}

export default Header;