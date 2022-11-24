import createButton from "../../img/plus-solid.svg"

/**
 * Компонента, отображающая кнопку создания.
 * @param {function} onClickHandler обработчик нажатия на кнопку. 
 * @returns компонент, готовый для рендеринга.
 */
export function CreateButton ({onClickHandler}) {
    return (
        <button className="add-button transparent-button">
            <img className="button-icon" src={createButton} alt="Create new todo button" onClick={onClickHandler} />
        </button>
    )
}