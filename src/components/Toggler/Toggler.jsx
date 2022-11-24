/**
 * Компонент, который реализует переключатель.
 * @param {obj} object содержащий className, body и обработчик события нажатия.
 * @returns отрисовку компонента.
 */
export function Toggler ({className, body, onClickHandler}) {
    return (
        <button className={className} onClick={onClickHandler}>
            {body}
        </button>
    )
}