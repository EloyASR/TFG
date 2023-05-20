import Login from "./Login";
import Signup from "./Signup";

import './LoginSignup.css';
import Header from "./components/Header";

const LoginSignup = ({ selected }) => {
    return (
        <>
            <div className="main">
                <div className="loginsignup">
                    <div className="card">
                        <div className="card-header">
                            {
                                <Header selected={selected} />
                            }
                        </div>
                        <div className="card-content spacing-medium">
                            <div className="flex vertical align-middle align-center">
                                {
                                    selected === "login" ? <Login /> : <Signup />
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginSignup;