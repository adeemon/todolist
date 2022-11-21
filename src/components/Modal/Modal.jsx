import React from 'react'
import "./modal.css"

export function Modal({active, setActive, child}) {
    return (
        <div className={active ? "modal active" : "modal "} onClick={() => setActive(false)}>
            <div className={active ? "modal__content active" : "modal__content "} 
                onClick={e => e.stopPropagation()}>
                {child}
            </div>
        </div>
    )
}