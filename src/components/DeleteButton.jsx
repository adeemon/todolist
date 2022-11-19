import deleteButton from "../img/delete.png";

export function DeleteButton ({onClickHandler}) {
    return (
        <div className="transparent-button">
            <button className="delete-button transparent-button" onClick={onClickHandler}>
            <img className="button-icon" src={deleteButton} />
        </button>
        </div>
    )
}