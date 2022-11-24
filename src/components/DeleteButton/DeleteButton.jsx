import deleteButton from "../../img/delete.png";

/**
 * Компонент, отображающий кнопку удаления.
 * @param {function} function 
 * @returns 
 */
export function DeleteButton ({onClickHandler}) {
    return (
        <div className="transparent-button">
            <button type="button" className="delete-button transparent-button" onClick={onClickHandler}>
                <img className="button-icon" src={deleteButton} />
            </button>
        </div>
    )
}