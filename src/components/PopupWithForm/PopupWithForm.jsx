import { usePopupClose } from "../../hooks/usePopupClose"
export default function PopupWithForm ({name, title, buttonTitle, children, isOpen, onClose, onSubmit, isValid=true }) {
    usePopupClose(isOpen, onClose);

    return (
        <section className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
            <div className="popup__container">
            <button
                type="button"
                className="popup__close-button"
                aria-label="Закрыть"
                onClick={onClose}
            />
            <h2 className={`popup__title ${name === 'delete-confirm' && 'popup__title_type_delete-confirm'}`}>{title}</h2>
            <form className="form popup__edit-form" name={name} noValidate onSubmit={onSubmit}>
                {children}
                <button type="submit" className={`popup__submit-button ${isValid ? '' : 'popup__submit-button_disabled'}`}>
                {buttonTitle}
                </button>
            </form>
            </div>
        </section>
    )
}