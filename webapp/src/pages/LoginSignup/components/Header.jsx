import { Link } from "wouter";

const Header = ({ selected }) => {


    return (
        <>
            <div className="header">
                <Link href="/login">
                    <div className={selected === "login" ? "headerItem selected" : "headerItem"}>
                        LOG IN
                    </div>
                </Link>
                <Link href="/signup">
                    <div className={selected === "signup" ? "headerItem selected" : "headerItem"}>
                        SIGN UP
                    </div>
                </Link>
            </div>
        </>
    );
}

export default Header;