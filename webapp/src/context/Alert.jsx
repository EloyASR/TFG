import React, { useEffect } from 'react';
import { useAlert } from './AlertContext';
import './Alert.css';

const Alert = () => {
    const { alert, hideAlert } = useAlert();

    useEffect(() => {
        if (alert.visible) {
            const timer = setTimeout(() => {
                hideAlert();
            }, 10000); // 15 segundos

            return () => clearTimeout(timer);
        }
    }, [alert, hideAlert]);

    if (!alert.visible) return null;

    const alertClass = alert.type === 'error' ? 'alert-danger' :
        alert.type === 'warning' ? 'alert-warning' :
            'alert-success';

    return (
        <div className="alert-overlay">
            <div className= {"alert-box " + alertClass + " alert-dismissible"}>
                <p>{alert.message}</p>
                <button className="close" onClick={(e) => {
                    e.preventDefault();
                    hideAlert()
                    }
                }>
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
        </div>
    );
}

export default Alert;