import NavItem from "./NavItem";
import defaultIcon from "../../assets/multimedia/icon_01.png"
import appIcon from "../../assets/multimedia/iconApp.png"
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";

function Nav({ tab, setTab, logged }) {

    const navigate = useNavigate();

    console.log(localStorage.getItem("session") === null);

    const tabs = [
        {
            id: 1,
            text: "Profile",
            href: "/profile"
        },
        {
            id: 2,
            text: "Tournaments",
            href: "/tournaments"
        },
        {
            id: 3,
            text: "Games",
            href: "/games"
        }
    ]

    return (
        <>
            <div className="navsuperior">
                <div className="icon">
                    <img src={appIcon} alt="" />
                </div>
                <div className="buscador">
                    <input type="text" placeholder="&#128269; Search..."></input>
                </div>
                <div className="account">
                    <div className="log-sign">
                        {
                            localStorage.getItem("session") === null ?
                                <>
                                    <Link to="/login">
                                        <img src={defaultIcon} alt="" />
                                    </Link>
                                </>
                                :
                                <>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        localStorage.removeItem("session")
                                        navigate("/login");
                                    }}>
                                        <button type="submit">
                                            Logout
                                        </button>
                                    </form>
                                </>
                        }
                    </div>
                </div>
            </div >
            <div className="navinferior">
                <div className="menu">
                    {
                        tabs.map((item) =>
                            item.id === tab ?
                                <NavItem key={item.id} href={item.href} text={item.text} selected={true} onClick={() => setTab(item.id)} />
                                :
                                <NavItem key={item.id} href={item.href} text={item.text} selected={false} onClick={() => setTab(item.id)} />
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Nav;