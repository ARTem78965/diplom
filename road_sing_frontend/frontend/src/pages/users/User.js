import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplate from '../../consts/BaseTamplate';
import { readRows, getRow, deleteRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function Users() {
    const [tableData, setTableData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchTableData = useCallback(async () => {
        setLoading(true);
        
        const read_users = await readRows('/users');
        setTableData(read_users);

        setLoading(false);
    }, []);

    useEffect(() => {
        fetchTableData();
    }, [fetchTableData]);

    return (
        <div> 
            {loading ? 
            (
                <div>
                    <p>Загрузка данных...</p>
                </div>
            ) : localStorage.getItem('login') === 'admin' ? 
            (
                <div>
                    <BaseTamplate />
                    <div className='container'>
                        <h1 className='Table-header'>Пользователи.</h1>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>ФИО</th>
                                    <th scope='col'>Логин</th>
                                    <th scope='col'>Пароль</th>
                                    <th scope='col'>Привелегия</th>
                                    <th scope='col'>Активность</th>
                                    <th scope='col'>Дата создание</th>
                                    <th scope='col'>Дата обновление</th>
                                    <th scope='col'>
                                        Операции  
                                        <button type='button' className='btn btn-success btn-sm me-1' onClick={() => navigate('/user/add')}>
                                            Создать
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.items.map((user) =>(
                                    <tr key={user.id}>
                                        <th>{user.id}</th>
                                        <td>{user.name}</td>
                                        <td>{user.login}</td>
                                        <td 
                                            style={{
                                                maxWidth: '200px',
                                                wordBreak: 'break-word',
                                                wordWrap: 'break-word',
                                                overflowWrap: 'break-word',
                                                whiteSpace: 'normal'
                                            }}
                                        >{user.password}</td>
                                        <td>{user.privilege}</td>
                                        <td>{user.is_active.toString()}</td>
                                        <td>{user.created_on}</td>
                                        <td>{user.updated_on}</td>
                                        <td>
                                            <button type='button' className='btn btn-primary btn-sm me-1' onClick={async () => { getRow('/user', user.id); navigate(`/user/edit/${user.id}`);}}>
                                                Редактировать
                                            </button>
                                            <button type='button' className='btn btn-danger btn-sm' onClick={async () => { deleteRow('/users', user.id); fetchTableData(); }}>
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p className='no-data'>Нет данных для отображения</p> 
            )} 
        </div>
    );
}

export default Users;