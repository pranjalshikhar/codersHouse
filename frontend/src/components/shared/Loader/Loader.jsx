import React from "react";
import Card from "../Card/Card";
import styles from './Loader.module.css';

const Loader = ({ message }) => {
    return (
        <div className="cardWrapper"> 
            <Card>
                <svg className={styles.loader} width="47" height="46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#E5E5E5" d="M0 0h47v46H0z"/>
                    <path fill="#121212" d="M-697-468H743V556H-697z"/>
                    <rect x="-302" y="-146" width="650" height="380" rx="20" fill="#1D1D1D"/>
                    <path d="M45 23c0 11.558-9.585 21-21.5 21S2 34.558 2 23 11.585 2 23.5 2 45 11.442 45 23Z" stroke="#C4C5C5" strokeWidth="4"/>
                    <path d="M14.961 3.727a21.974 21.974 0 0 1 13.353-1.194c4.468 1.003 8.485 3.373 11.472 6.757a20.749 20.749 0 0 1 5.147 12.05 20.614 20.614 0 0 1-3.136 12.687c-2.4 3.8-5.981 6.758-10.229 8.438a21.979 21.979 0 0 1-13.377.885c-4.442-1.106-8.401-3.568-11.304-7.02a20.725 20.725 0 0 1-4.854-12.165" stroke="#5453E0" strokeWidth="4"/>
                </svg>
                <span className={styles.message}>{message}</span>
            </Card>
        </div>
    )
}

export default Loader;