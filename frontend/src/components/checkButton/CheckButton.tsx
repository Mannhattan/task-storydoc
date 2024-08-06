import { CircleCheck } from '../../assets/icons';
import './CheckButton.scss';

interface ICheckButton {
    onClickHandler: React.MouseEventHandler<HTMLButtonElement>
}

export const CheckButton = ({ onClickHandler }: ICheckButton) => {
    return (
        <button onClick={onClickHandler} className='button-check'>
            <CircleCheck />
        </button>
    )
}
