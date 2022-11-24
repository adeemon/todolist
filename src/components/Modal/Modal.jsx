import React, { useEffect } from 'react'
import "./modal.css"

/**
 * Универсальный компонент, реализующий модальное окно.
 * @param {bool} active определяет, активно ли модальное окно.
 * @param {funtion} closeClickHandler обработчик события нажатия вне модального окна
 * @param {component} child компонент, который отрисуется внутри модального окна.
 * @returns компонент модального окна.
 */
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