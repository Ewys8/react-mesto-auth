import { usePopupClose } from "../../hooks/usePopupClose"
export default function ImagePopup({card, isOpen, onClose}) {
    usePopupClose(isOpen, onClose)
    return (
        <section className={`popup popup_type_figure ${isOpen && 'popup_opened'}`}>
            <figure className="popup__figure-container">
                <button
                    type="button"
                    className="popup__close-button"
                    aria-label="Закрыть"
                    onClick={onClose}
                />
                <img src={card.link} alt={card.name} className="popup__image" />
                <figcaption className="popup__figcaption">{card.name}</figcaption>
            </figure>
        </section>

    )
}