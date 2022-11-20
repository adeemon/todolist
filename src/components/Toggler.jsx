export function Toggler ({className, body, onClickHandler}) {
    return (
        <button className={className} onClick={onClickHandler}>
            {body}
        </button>
    )
}