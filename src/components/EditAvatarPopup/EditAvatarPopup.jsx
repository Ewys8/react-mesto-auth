import useFormValidation from "../../hooks/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function EditAvatarPopup ({ isOpen, onClose, onUpdateAvatar, onLoad }) {

    const { values, errors, isValid, isInputValid, handleChange, reset } = useFormValidation()

    function resetAfterClose() {
        onClose()
        reset()
    }

    function handleSubmit(e) {
        e.preventDefault();
    
        onUpdateAvatar({
            avatar: values.avatar
        }, reset);
    }

    return (
    <PopupWithForm
        name = 'edit-avatar'
        title = 'Обновить аватар'
        isOpen = {isOpen}
        onClose = {resetAfterClose}
        onSubmit={handleSubmit}
        isValid = {isValid}
        buttonTitle = {onLoad? 'Сохранение...' : 'Сохранить'}
        >
        <input
                id="avatar"
                type="url"
                name="avatar"
                className={`popup__input popup__input_type_card-url ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_invalid'}`}
                required=""
                placeholder="Ссылка на картинку"
                autoComplete="off"
                onChange={handleChange}
                value={values.avatar ? values.avatar : ''}
            />
            <span id="error-avatar" className="error-message avatar-error">{errors.avatar}</span>
    </PopupWithForm>
    )
}