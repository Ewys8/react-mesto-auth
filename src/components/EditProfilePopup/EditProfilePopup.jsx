import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useEffect, useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import useFormValidation from "../../hooks/useFormValidation";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoad }) {

    const currentUser = useContext(CurrentUserContext)
    const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = useFormValidation()

    useEffect(() => {
        setValue("username", currentUser.name)
        setValue("description", currentUser.about)
    }, [currentUser, setValue])

    function resetAfterClose() {
        onClose()
        reset({ username: currentUser.name, description:currentUser.about })
    }

    function handleSubmit(e) {
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            username: values.username,
            description: values.description
        }, reset);
    }

    return (
        <PopupWithForm
            name = 'edit'
            title = 'Редактировать профиль'
            isOpen = {isOpen}
            onClose = {resetAfterClose}
            isValid = {isValid}
            onSubmit={handleSubmit}
            buttonTitle = {onLoad? 'Сохранение...' : 'Сохранить'}
            >
            <input
                id="username"
                type="text"
                name="username"
                className={`popup__input popup__input_type_name ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_invalid'} `}
                required
                placeholder="Ваше имя"
                maxLength={40}
                minLength={2}
                autoComplete="off"
                value={values.username ? values.username : ''}
                onChange={handleChange}
            />
            <span id="error-username" className="error-message username-error">{errors.username}</span>
            <input
                id="description"
                type="text"
                name="description"
                className={`popup__input popup__input_type_name ${isInputValid.description === undefined || isInputValid.description ? '' : 'popup__input_invalid'} `}
                required
                placeholder="О себе"
                maxLength={200}
                minLength={2}
                autoComplete="off"
                value={values.description ? values.description : ''}
                onChange={handleChange}
            />
            <span id="error-description" className="error-message description-error">{errors.description}</span>
        </PopupWithForm>
    )
}