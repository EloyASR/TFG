import NavItem from "./NavItem";
import defaultIcon from "../../assets/multimedia/icon_01.png"
import appIcon from "../../assets/multimedia/iconApp.png"
import "./Nav.css";
import { Link } from "wouter";

function  Nav({ tab,setTab}) {

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
                    <img src={appIcon} />
                </div>
                <div className="buscador">
                    <input type="text" placeholder="&#128269; Search..."></input>
                </div>
                <div className="account">
                    <div className="log-sign">
                        <Link href="/login">
                            <img src={defaultIcon} />
                        </Link>
                    </div>

                    {/*
                    <div class="button">
                        <button class="update">Login</button>
                    </div>
                    */ }
                </div>
            </div>
            <div className="navinferior">
                <div className="menu">
                    {
                        tabs.map((item) =>
                            item.id == tab ?
                                <NavItem key={item.id} href={item.href} text={item.text} selected={true} onClick={()=>setTab(item.id)}/>
                                :
                                <NavItem key={item.id} href={item.href} text={item.text} selected={false} onClick={()=>setTab(item.id)}/>
                        )
                    }
                </div>
            </div>
        </>
    );
}

export default Nav;