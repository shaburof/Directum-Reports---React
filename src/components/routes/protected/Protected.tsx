import React from 'react';
import { Context } from '../../../containers/App';
import { Redirect } from "react-router-dom";

const Protected: React.FC = ({ children }) => {

    const store = React.useContext(Context);
    const [show, setShow] = React.useState(false);
    const [redirect, setRedirect] = React.useState(false);

    React.useEffect(() => {
        if (store.isLogin === true) setShow(true);
        if (store.isLogin === false) setRedirect(true);
    }, [store.load, store.isLogin]);

    return <React.Fragment>
        {show
            ? children
            : ''
        }
        {redirect
            ? <Redirect to='/login' />
            : ''
        }

    </React.Fragment>
}

export { Protected };