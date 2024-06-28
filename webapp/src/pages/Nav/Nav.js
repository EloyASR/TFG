import NavItem from "./NavItem";
import defaultIcon from "../../assets/multimedia/icon_01.png"
import appIcon from "../../assets/multimedia/iconApp.png"
import "./Nav.css";
import { useNavigate } from "react-router";
import { Link} from "react-router-dom"
import {applyTheme} from "../../context/theme";

function Nav({ tab, setTab }) {

    const navigate = useNavigate();

    const user= JSON.parse(localStorage.getItem("user"))

    const userRole = user ? user.role : "";

    const tabs = []

    const userTabs = [
        {
            id: 1,
            text: "Perfil",
            href: "/profile"
        },
        {
            id: 2,
            text: "Torneos",
            href: "/tournaments"
        }
    ]

    const adminTabs = [
        {
            id: 1,
            text: "Perfil",
            href: "/profile"
        },
        {
            id: 2,
            text: "Mis premios",
            href: "/prizes"
        },
        {
            id: 3,
            text: "Mis torneos",
            href: "/my-tournaments"
        }
    ]

    const companyTabs = [
        {
            id: 1,
            text: "Perfil",
            href: "/profile"
        },
        {
            id: 2,
            text: "Torneos",
            href: "/tournaments"
        },
        {
            id: 3,
            text: "Torneos patrocinados",
            href: "/sponsored-tournaments"
        },
        {
            id: 4,
            text: "Mis premios",
            href: "/prizes"
        }
    ]

    const NavInferior = () => {
        if(userRole ===  "ADMIN") {
            return <>
                {
                    adminTabs.map((item) =>
                        item.id === tab ?
                            <NavItem key={item.id} href={item.href} text={item.text} selected={true} onClick={() => setTab(item.id)} />
                            :
                            <NavItem key={item.id} href={item.href} text={item.text} selected={false} onClick={() => setTab(item.id)} />
                    )
                }
            </>
        }else if (userRole === "COMPANY"){
            return <>
                {
                    companyTabs.map((item) =>
                        item.id === tab ?
                            <NavItem key={item.id} href={item.href} text={item.text} selected={true} onClick={() => setTab(item.id)} />
                            :
                            <NavItem key={item.id} href={item.href} text={item.text} selected={false} onClick={() => setTab(item.id)} />
                    )
                }
            </>
        }else if (userRole === "USER"){
            return <>
                {
                    userTabs.map((item) =>
                        item.id === tab ?
                            <NavItem key={item.id} href={item.href} text={item.text} selected={true} onClick={() => setTab(item.id)} />
                            :
                            <NavItem key={item.id} href={item.href} text={item.text} selected={false} onClick={() => setTab(item.id)} />
                    )
                }
            </>
        }else{
            return <>
                {
                    tabs.map((item) =>
                        item.id === tab ?
                            <NavItem key={item.id} href={item.href} text={item.text} selected={true} onClick={() => setTab(item.id)} />
                            :
                            <NavItem key={item.id} href={item.href} text={item.text} selected={false} onClick={() => setTab(item.id)} />
                    )
                }
            </>
        }
    }

    return (
        <>
            <div className="navsuperior">
                <div className="icon">
                    <img src={appIcon} alt="" />
                </div>
                <div className="name">
                    <span>ToorEII</span>
                </div>
                <div className="account">
                    <div className="log-sign">
                        {
                            localStorage.getItem("session") === null ?
                                <>
                                    <form onSubmit={(e) => {
                                        navigate("/login");
                                    }}>
                                        <div className={""}>
                                            <button id="login" type="submit">
                                            LOG IN
                                            </button>
                                        </div>
                                    </form>
                                </>
                                :
                                <>
                                    <form onSubmit={(e) => {
                                        e.preventDefault();
                                        localStorage.removeItem("session")
                                        localStorage.removeItem("user")
                                        applyTheme();
                                        navigate("/login");
                                    }}>
                                        <div className={""}>
                                            <button id="logout" type="submit">
                                                LOG OUT
                                            </button>
                                        </div>
                                    </form>
                                </>
                        }
                    </div>
                </div>
            </div >
            <div className="navinferior">
                <div className="menu">
                    <NavInferior/>
                </div>
            </div>
        </>
    );
}

export default Nav;