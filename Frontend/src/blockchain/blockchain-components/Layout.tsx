import React from "react";
import { Link } from "react-router-dom";

type Props = {
    children?: React.ReactNode;
};

const Layout:React.FC<Props> = ({children}) => {
    return(
        <div>
            <div>
                <Link to="/blockchain">
                    <button>blockchain</button>
                </Link>
            </div>
            <div>
                <Link to="/my-animal">
                    <button>my animal</button>
                </Link>
            </div>
            <div>
                <Link to="/sale-animal">
                    <button>sale animal</button>
                </Link>
            </div>
            {children}
        </div>
    );
};

export default Layout;