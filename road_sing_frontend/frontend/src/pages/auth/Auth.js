import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import constFlaskURL from '../../consts/constFlaskURL'
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function Auth(){
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        try {
            setLoading(true);

            e.preventDefault();
            setError('');
            const login_user = await constFlaskURL.post('/login', { login: login, password: password });

            if (login_user.status === 200) {
                setLogin('');
                setPassword('');
                
                localStorage.setItem('id', login_user.data.id);
                localStorage.setItem('login', login_user.data.login);
                localStorage.setItem('name_privilege', login_user.data.name_privilege);
                
                navigate('/main');
            }

        } catch (error) {
            let errorMessage = '';
        
            if (error.response) {
                errorMessage = error.response.data.message;
            } else if (error.request) {
                errorMessage = 'Нет ответа от сервера. Проверьте, запущен ли Flask.';
            } else {
                errorMessage = 'Ошибка при отправке запроса';
            }
        
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='app-container'>
            <div className='app-card'>
                <h2 className='app-title'>Вход в систему</h2>
                <p className='app-subtitle'>Введите логин и пароль</p>
                {error && (
                    <div className='error-message'>
                        <strong>Ошибка:</strong> {error}
                    </div>
                )}
                <form onSubmit={handleLogin} className='app-form'>
                    <div className='form-group'>
                        <label htmlFor='login'>Логин:</label>
                        <input
                            type='text'
                            name='login'
                            value={login.login}
                            onChange={(e) => setLogin(e.target.value)}
                            className='form-input'
                            placeholder='Введите логин'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Пароль:</label>
                        <input
                            type='password'
                            name='password'
                            value={password.password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='form-input'
                            placeholder='Введите пароль'
                        />
                    </div>
                    <button type='submit' className='login-button'>
                        {loading ? 'Вход...' : 'Войти'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Auth;