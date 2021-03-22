import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { Color } from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { Context } from '../../../containers/App';

interface alertInteraface {
    type: Color,
    text: string,
}

const AlertUI: React.FC<alertInteraface> = ({ type, text }) => {

    let store = React.useContext(Context);

    let close = () => {
        store.setMessage({ type: type, text: '', isActive: false })
    }

    React.useEffect(() => {
        if (store.message.autoClose && store.message.isActive) setTimeout(() => close(), 3500);
    }, [store.message.isActive]);

    return (
        <Collapse in={store.message.isActive}>
            <Alert severity={type} variant="filled"
                style={{ position: 'fixed', minWidth: '80%', left: '50%', top: '30px', transform: 'translateX(-50%)', zIndex: 1305 }}
                action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={close}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
            >
                {text}
            </Alert>
        </Collapse>
    )
}

export { AlertUI };