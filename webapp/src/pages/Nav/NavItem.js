import { Link } from "react-router-dom";

function NavItem({onClick,text,href,selected}) {
    return (
        <>
            <div className={selected ? "navitem selected": "navitem"} >
                <Link to={href} onClick={onClick}>{text}</Link>
            </div>
        </>
    );
}

export default NavItem;