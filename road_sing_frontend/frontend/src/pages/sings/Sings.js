import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplate from '../../consts/BaseTamplate';
import { readRows, getRow, deleteRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function Sings() {
    const [tableData, setTableData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchTableData = useCallback(async () => {
        setLoading(true);

        const read_sings = await readRows('/sings');
        setTableData(read_sings);

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
            ) : localStorage.getItem('login') !== '' ? 
            (
                <div>
                    <BaseTamplate />
                    <div className='container'>
                        <h1 className='Table-header'>Дорожные знаки.</h1>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Название дорожного знака</th>
                                    <th scope='col'>
                                        Операции  
                                        <button type='button' className='btn btn-success btn-sm me-1' onClick={() => navigate('/sing/add')}>
                                            Создать
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                { tableData?.items.map((sing) =>(
                                    <tr key={sing.id}>
                                        <th>{sing.id}</th>
                                        <td>{sing.name_sing}</td>
                                        <td>
                                            <button type='button' className='btn btn-primary btn-sm me-1' onClick={async() => { getRow('/sing', sing.id); navigate(`/sing/edit/${sing.id}`);}}>
                                                Редактировать
                                            </button>
                                            <button type='button' className='btn btn-danger btn-sm' onClick={async () => { await deleteRow('/sings', sing.id); fetchTableData(); }}>
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

export default Sings;