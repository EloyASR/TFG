import { Link } from "wouter";

function NavItem({onClick,text,href,selected}) {
    return (
        <>
            <div className={selected ? "navitem selected": "navitem"} >
                <Link href={href} onClick={onClick}><a>{text}</a></Link>
            </div>
        </>
    );
}

export default NavItem;