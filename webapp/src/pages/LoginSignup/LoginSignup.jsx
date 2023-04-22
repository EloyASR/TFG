import { Route } from "wouter";
import Login from "./Login";
import Signup from "./Signup";

import './LoginSignup.css';
import Header from "./components/Header";

const LoginSignup = ({ selected }) => {
    return (
        <>
            <div className="loginsignup">
                {
                    <Header selected={selected} />
                }
                <div className="body">
                    {
                        selected === "login" ? <Login /> : <Signup />
                    }
                </div>
            </div>
        </>
    );
}

export default LoginSignup;