import { Delete } from '../../assets/icons/Delete';
import './DeleteButton.scss';

interface IDeleteButton {
    onClickHandler: React.MouseEventHandler<HTMLButtonElement>
}

export const DeleteButton = ({ onClickHandler }: IDeleteButton) => {
    return (
        <button onClick={onClickHandler} className='button-delete'>
            <Delete />
        </button>
    )
}
