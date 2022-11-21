import React from 'react'
import "./modal.css"

export function Modal({active, closeClickHandler, child}) {
    return (
        <div className={active ? "modal active" : "modal "} onClick={closeClickHandler}>
            <div className={active ? "modal__content active" : "modal__content "} 
                onClick={e => e.stopPropagation()}>
                {child}
            </div>
        </div>
    )
}