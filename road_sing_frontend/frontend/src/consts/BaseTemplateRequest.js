import { useNavigate, Link } from 'react-router-dom';

import { handleLogout } from './handleLogout';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'


function BaseTamplateRequest() {
    const navigate = useNavigate();
    const loading = false;

    return (
        <div>
            <nav className='navbar navbar-expand-lg navbar-dark bg-dark flex-column align-items-start p-0'>
                <div className='container-fluid py-2'>
                    <Link className='navbar-brand fs-3 fw-bold' to='/main'>Дорожное хозяйство</Link>
                    <div class='btn-group'>
                        <button type='button' class='btn btn-info'>{ localStorage.getItem('login') }</button>
                        <button type='button' class='btn btn-info dropdown-toggle dropdown-toggle-split' data-bs-toggle='dropdown' aria-expanded='false'>
                            <span class='visually-hidden'>Переключатель выпадающего списка</span>
                        </button>
                        <ul class='dropdown-menu'>
                            <li>
                                <a class='dropdown-item'>
                                    <button
                                        onClick={() => { handleLogout(localStorage.getItem('id')); navigate('/login') }} 
                                        className='dropdown-item'
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span className='spinner'></span>
                                                Выход...
                                            </>
                                        ) : 'Выйти'}
                                    </button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )

}

export default BaseTamplateRequest