import useFormValidation from "../../hooks/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function AddPlacePopup ({ isOpen, onClose, onAddPlace, onLoad }) {

    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetAfterClose() {
        onClose()
        reset()
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            placename: values.placename,
            placelink: values.placelink
        }, reset);
    }

    return (
        <PopupWithForm
        name = 'add'
        title = 'Новое место'
        buttonTitle = {onLoad? 'Создание...' : 'Создать'}
        isOpen = {isOpen}
        onClose = {resetAfterClose}
        isValid = {isValid}
        onSubmit={handleSubmit}
        >
            <input
                id="placename"
                type="text"
                name="placename"
                className={`popup__input popup__input_type_card-name ${isInputValid.placename === undefined || isInputValid.placename ? '' : 'popup__input_invalid'}`}
                required=""
                placeholder="Название"
                maxLength={30}
                minLength={2}
                autoComplete="off"
                value={values.placename ? values.placename : ''}
                onChange={handleChange}
            />
            <span id="error-placename" className="error-message placename-error">{errors.placename}</span>
            <input
                id="placelink"
                type="url"
                name="placelink"
                className={`popup__input popup__input_type_card-url ${isInputValid.placelink === undefined || isInputValid.placelink ? '' : 'popup__input_invalid'}`}
                required=""
                placeholder="Ссылка на картинку"
                autoComplete="off"
                value={values.placelink ? values.placelink : ''}
                onChange={handleChange}
            />
            <span id="error-url" className="error-message url-error">{errors.placelink}</span>
        </PopupWithForm>
    )
}