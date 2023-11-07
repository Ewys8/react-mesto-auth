import { usePopupClose } from "../../hooks/usePopupClose";

function InfoTooltip({ isOpen, onClose, title, path }) {

    usePopupClose(isOpen, onClose);
    
    return (
        <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
            <div className='popup__container popup__container_auth'>
                <img src={path} alt={path} className='popup__auth-image' />
                <h2 className='popup__title popup__title_type_auth'>{title}</h2>
            <button
                type="button"
                className="popup__close-button"
                aria-label="Закрыть"
                onClick={onClose}
            />
            </div>
        </div>
    );
    }

export default InfoTooltip;