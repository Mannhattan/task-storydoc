import { Edit } from '../../assets/icons';
import { Check } from '../../assets/icons/Check';
import './EditButton.scss';

interface IEditButton {
    onClickHandler: React.MouseEventHandler<HTMLButtonElement>,
    isBeingEdited?: boolean
}

export const EditButton = ({ onClickHandler, isBeingEdited = false }: IEditButton) => {
    return (
        <button onClick={onClickHandler} className={`button-edit ${isBeingEdited ? 'button-edit-being-edited' : ''}`}>
            {isBeingEdited ? <Check /> : <Edit />}
        </button>
    )
}
