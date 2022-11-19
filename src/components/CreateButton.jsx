export function CreateButton ({onClickHandler}) {
    return (
        <button className="addbutton">
            <img src="../img/circle-plus-solid.svg" alt="Create new todo button" onClick={onClickHandler} />
        </button>
    )
}