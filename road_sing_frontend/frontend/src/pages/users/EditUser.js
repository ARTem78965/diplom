import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BaseTamplateRequest from '../../consts/BaseTemplateRequest';
import { updateRow, readRows } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function EditSing() {
    const [loading, setLoading] = useState(false);
    const [privileges, setPrivileges] = useState('');
    
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [privilege_id, setPrivilegeID] = useState('');

    const navigate = useNavigate();

    const { id } = useParams();

    const handleChange = (event) => { setPrivilegeID(event.target.value); };

    const submitSing = async (e) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        };
        const user = { name, login, password, privilege_id };
        await updateRow('/users', id, user, headers);
        setName('');
        setLogin('');
        setPassword('');
        setPrivilegeID('');
        navigate('/users');
    };

    const fetchTableData = useCallback(async () => {
        setLoading(true);

        const read_priveleges = await readRows('/privileges');
        setPrivileges(read_priveleges);

        setLoading(false);
    }, []);

    useEffect(() => {
        fetchTableData();
    }, [fetchTableData]);

    return (
        <div>
            { loading ? 
                (
                    <div>
                        <p>Загрузка данных...</p>
                    </div>
                ) : localStorage.getItem('login') !== '' ? 
                (
                    <div>
                        <BaseTamplateRequest />
                        <form className='container' onSubmit={submitSing}>
                            <h1>Обновление пользователя</h1>
                            <div className='mb-3'>
                                <lable className='form-label'>ФИО</lable>
                                <input 
                                    type='text'
                                    name='name' 
                                    value={name.name} 
                                    onChange={(e) => setName(e.target.value)}
                                    className='form-input'  
                                    placeholder='name'
                                    required  
                                />
                            </div>
                            <div className='mb-3'>
                                <lable className='form-label'>Логин</lable>
                                <input 
                                    type='text'
                                    name='login' 
                                    value={login.login} 
                                    onChange={(e) => setLogin(e.target.value)}
                                    className='form-input'  
                                    placeholder='login'
                                    required  
                                />
                            </div>
                            <div className='mb-3'>
                                <lable className='form-label'>Пароль</lable>
                                <input 
                                    type='password'
                                    name='password' 
                                    value={password.password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='form-input'  
                                    placeholder='password'
                                    required  
                                />
                            </div>
                            <div className='mb-3'>
                                <lable className='form-label'>Права доступа</lable>
                                <select 
                                    value={privilege_id}
                                    onChange={handleChange}
                                    class="form-select"
                                    aria-label="Default select example"
                                >
                                    <option value="">Права доступа</option>
                                    { privileges?.items?.map(privilege => (
                                        <option key={ privilege.id } value={ privilege.id }>
                                            { privilege.name_privilege }
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                type='submit' 
                                class='btn btn-warning'
                            >
                                Обновить
                            </button>
                            <button 
                                type='submit' 
                                className='btn btn-danger' 
                                onClick={() => navigate('/users')}
                            >
                                Назад
                            </button>
                        </form>
                    </div>
                ) : (
                    <p className='no-data'>Нет данных для отображения</p> 
                )
            }
        </div>
    )
};

export default EditSing;