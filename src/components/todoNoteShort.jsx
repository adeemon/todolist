export const TodoNoteShort = ({id, title, status, onClickHandler}) => {
    return (
        <div className="todoNote-short" onClick={onClickHandler}>
            <div>{id}</div>
            <div>{title}</div>
            <div>{status ? 'Выполнено' : 'Не выполнено'}</div>
        </div>
    )
}