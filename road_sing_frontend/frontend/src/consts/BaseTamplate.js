import { useNavigate, Link, NavLink } from 'react-router-dom';

import { handleLogout } from './handleLogout';
import '../App.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.css'



function BaseTamplate(){
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
                            <span class='visually-hidden'></span>
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
                <div className='container-fluid bg-dark py-2'>
                    <div className='navbar-nav flex-row'>
                        <NavLink className={({ isActive }) => `nav-link me-3 ${isActive ? 'active fw-bold' : ''}`} to='/main' end> Главная </NavLink>
                        <ul class='navbar-nav'>
                            <li class='nav-item dropdown'>
                                <a class='nav-link dropdown-toggle' href='#' id='navbarDarkDropdownMenuLink' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    Дорожные знаки на дорогах
                                </a>
                                <ul class='dropdown-menu dropdown-menu-dark' aria-labelledby='navbarDarkDropdownMenuLink'>
                                    <li>
                                        <NavLink style={{ color: 'black' }} className={({ isActive }) => `nav-link me-3 ${isActive ? 'active fw-bold' : ''}`} to='/roads' end> Дороги </NavLink>
                                        <NavLink style={{ color: 'black' }} className={({ isActive }) => `nav-link me-3 ${isActive ? 'active fw-bold' : ''}`} to='/sings' end> Дорожные знаки </NavLink>
                                        <NavLink style={{ color: 'black' }} className={({ isActive }) => `nav-link me-3 ${isActive ? 'active fw-bold' : ''}`} to='/roads/sings' end> Дорожные знаки на дорогах </NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li class='nav-item dropdown'>
                                <a class='nav-link dropdown-toggle' href='#' id='navbarDarkDropdownMenuLink' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    Дорожные знаки на перекрестках
                                </a>
                                <ul class='dropdown-menu dropdown-menu-dark' aria-labelledby='navbarDarkDropdownMenuLink'>
                                    <li>
                                        <NavLink style={{ color: 'black' }} className={({ isActive }) => `nav-link me-3 ${isActive ? 'active fw-bold' : ''}`} to='/crossroads' end>Перекрестки</NavLink>
                                        <NavLink style={{ color: 'black' }} className={({ isActive }) => `nav-link me-3 ${isActive ? 'active fw-bold' : ''}`} to='/crossroads/roads/sings' end>Дорожные знаки на перекрестках</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li class='nav-item dropdown'>
                                <a class='nav-link dropdown-toggle' href='#' id='navbarDarkDropdownMenuLink' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    Дорожные знаки на населенных пунктах
                                </a>
                                <ul class='dropdown-menu dropdown-menu-dark' aria-labelledby='navbarDarkDropdownMenuLink'>
                                    <li>
                                        <NavLink style={{ color: 'black' }} className={({ isActive }) => `nav-link me-3 ${isActive ? 'active fw-bold' : ''}`} to='/localities' end>Населенные пункты</NavLink>
                                        <NavLink style={{ color: 'black' }} className={({ isActive }) => `nav-link me-3 ${isActive ? 'active fw-bold' : ''}`} to='/localities/crossroads/roads/sings' end>Дорожные знаки на населенных пунктах</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li class='nav-item dropdown'>
                                <a class='nav-link dropdown-toggle' href='#' id='navbarDarkDropdownMenuLink' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    Пользователи
                                </a>
                                <ul class='dropdown-menu dropdown-menu-dark' aria-labelledby='navbarDarkDropdownMenuLink'>
                                    <li>
                                        <NavLink style={{ color: 'black' }} className={({ isActive }) => `nav-link me-3 ${isActive ? 'active fw-bold' : ''}`} to='/users' end>Пользователи</NavLink>
                                        <NavLink style={{ color: 'black' }} className={({ isActive }) => `nav-link me-3 ${isActive ? 'active fw-bold' : ''}`} to='/privileges' end>Роли пользователей</NavLink>
                                    </li>
                                </ul>
                            </li>
                            <li class='nav-item dropdown'>
                                <a class='nav-link dropdown-toggle' href='#' id='navbarDarkDropdownMenuLink' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
                                    Отчетность
                                </a>
                                <ul class='dropdown-menu dropdown-menu-dark' aria-labelledby='navbarDarkDropdownMenuLink'>
                                    <li>
                                        <NavLink style={{ color: 'black' }} className={({ isActive }) => `nav-link me-3 ${isActive ? 'active fw-bold' : ''}`} to='/fix-sings' end>Отчет о замене дорожных знаков</NavLink>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default BaseTamplate;