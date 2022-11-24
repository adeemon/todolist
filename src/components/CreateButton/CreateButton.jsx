import createButton from "../../img/plus-solid.svg"

export function CreateButton ({onClickHandler}) {
    return (
        <button className="add-button transparent-button">
            <img className="button-icon" src={createButton} alt="Create new todo button" onClick={onClickHandler} />
        </button>
    )
}