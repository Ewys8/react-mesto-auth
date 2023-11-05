import { Link, Redirect } from "react-router-dom";
export default function Register ({}) {

    return (
        <form
        //onSubmit={handleSubmit}
        className="auth__form"
        noValidate
        name="register"
        >
            <h2 className="auth__title">Регистрация</h2>
            <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                //value={email}
                className="auth__input"
                //onChange={handleEmailChange}
                autoComplete="off"
            />

            <input
                id="password"
                name="password"
                type="password"
                placeholder="Пароль"
                //value={password}
                className="auth__input"
                //onChange={handlePasswordChange}
                autoComplete="off"
            />
            <button type="submit" className="auth__submit">
                Зарегистрироваться
            </button>
            <div className="auth__signin">
                <Link to="/sign-in" className="auth__login-link">
                Уже зарегистрированы? Войти
                </Link>
            </div>
        </form>
    )
}