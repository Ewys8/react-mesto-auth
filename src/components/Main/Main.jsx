import { useContext } from "react";
import Card from "../Card/Card";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({onEditProfile, onEditAvatar, onAddPlace, onCardClick, onDelete, onCardLike, cards}) {
    const currentUser = useContext(CurrentUserContext)

    return (
    <main className="content">
        <section className="profile">
            <div className="profile__main">
                <button className="profile__avatar-button" type="button" onClick={onEditAvatar}>
                    <img className="profile__avatar" src={currentUser.avatar ? currentUser.avatar : '#'} alt="Аватар" />
                </button>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name ? currentUser.name : ''}</h1>
                    <p className="profile__description">{currentUser.about ? currentUser.about : ''}</p>
                    <button
                        className="profile__edit-button"
                        type="button"
                        aria-label="Редактировать"
                        onClick={onEditProfile}
                    />
                </div>
            </div>
            <button
                className="profile__add-button"
                type="button"
                aria-label="Добавить"
                onClick={onAddPlace}
            />
        </section>
        <section className="gallery">
            <ul className='gallery__list'>
                {cards.map(cardData => (
                <Card 
                    key={cardData._id} 
                    onCardClick={onCardClick} 
                    onDelete={onDelete} 
                    onCardLike={onCardLike}
                    card={cardData}
                />))}
            </ul>
        </section>
    </main>
    )
}