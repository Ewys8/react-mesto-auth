import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function Card({ onCardClick, onDelete, onCardLike, card }) {
    const currentUser = useContext(CurrentUserContext)
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = ( 
        `card__like-button ${isLiked && 'card__like-button_active'}` 
    );

    return (
        <article className="card">
            <img src={card.link} 
            alt={card.name} 
            className="card__photo" 
            onClick={() => onCardClick({link: card.link, name:card.name})}
            />
            <div className="card__figcaption">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__like-element">
                <button
                    className={cardLikeButtonClassName}
                    type="button"
                    aria-label="Нравится"
                    onClick={() => onCardLike(card)}
                />
                <span className="card__like-count">{card.likes.length}</span>
                </div>
            </div>
            {isOwn && <button className="card__delete-button" type="button" aria-label="Удалить" onClick={() => onDelete(card._id)}/>}
        </article>
    )
}