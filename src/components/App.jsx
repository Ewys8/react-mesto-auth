import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Login from "./Login/Login.jsx";
import Register from "./Register/Register.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx";
import api from "../utils/api.js";
import authApi from "../utils/AuthApi.js";
import success from '../images/success.svg';
import failure from '../images/failure.svg';
import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';


function App() {
  //стейты попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [message, setMessage] = useState({ path: '', text: '' });

  //стейт контекста
  const [currentUser, setCurrentUser] = useState({});

  //стейты карточек
  const [cards, setCards] = useState([]);
  const [selectedCardID, setSelectedCardID] = useState("");
  //стейты состояния
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const navigate = useNavigate();

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleDeletePopupClick(cardID) {
    setSelectedCardID(cardID);
    setIsDeletePopupOpen(true);
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsLoading(true);
    api.deleteCard(selectedCardID)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== selectedCardID;
          })
        );
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    Promise.all([api.getUserData(), api.getCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleUpdateUser(userData, reset) {
    setIsLoading(true);
    api.editUserData(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(userData, reset) {
    setIsLoading(true);
    api.createCard(userData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(userData, reset) {
    setIsLoading(true);
    api.editUserAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleRegister(email, password) {
    authApi.signup({ email, password })
      .then((res) => {
        //setUserEmail(res.data.email);
        setMessage({ path: success, text: 'Вы успешно зарегистрировались!' });
        navigate('/sign-in');
      })
      .catch(() =>
        setMessage({ path: failure, text: 'Что-то пошло не так! Попробуйте ещё раз.' }),
      )
      .finally(() => {
        setIsInfoTooltipOpen(true);
      });
  }

  function handleLogin(email, password) {
    authApi.signin({ email, password })
      .then((data) => {
        if (data.token) {
          setUserEmail(email);
          setIsLoggedIn(true); 
          localStorage.setItem("JWT", data.token);
          navigate("/"); 
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSingOut() {
    localStorage.removeItem('JWT');
    setIsLoggedIn(false);
  }

  useEffect(() => {
    async function checkUserAuth() {
      try {
        const res = await authApi.checkToken(localStorage.getItem('JWT'));
        if (res.data) {
          setUserEmail(res.data.email);
          navigate("/");
          setIsLoggedIn(true);
        }
      } catch (error) {
        navigate("/sign-in");
        setIsLoggedIn(false);
        console.log(error);
      }
    }
    checkUserAuth();
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header userEmail={userEmail} onSignOut={handleSingOut}/>
        
        <Routes>
            <Route
              path='/'
              element={
                <ProtectedRoute
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onDelete={handleDeletePopupClick}
                  onCardLike={handleCardLike}
                  cards={cards}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path='/sign-in'
              element={
                <Login 
                  onLogin={handleLogin} 
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path='/sign-up'
              element={
                <Register 
                  onRegister={handleRegister} 
                  isLoggedIn={isLoggedIn}
                />
              }
            />
        </Routes>
          
        <Footer />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          title={message.text}
          path={message.path}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoad={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoad={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoad={isLoading}
        />

        <PopupWithForm
          name="delete-confirm"
          title="Вы уверены?"
          buttonTitle={isLoading ? "Удаление..." : "Да"}
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
