import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplate from '../../consts/BaseTamplate';
import { readRows, getRow, deleteRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function Crossroads() {
    const [tableData, setTableData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchTableData = useCallback(async () => {
        setLoading(true);

        const read_crossroads = await readRows('/crossroads');
        setTableData(read_crossroads);
        
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
                        <h1 className='Table-header'>Перекрестки.</h1>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Тип перекрестка</th>
                                    <th scope='col'>
                                        Операции  
                                        <button type='button' className='btn btn-success btn-sm me-1' onClick={() => navigate('/crossroad/add')}>
                                            Создать
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.items.map((crossroad) =>(
                                    <tr key={crossroad.id}>
                                        <th>{crossroad.id}</th>
                                        <td>{crossroad.type_crossroad}</td>
                                        <td>
                                            <button type='button' className='btn btn-primary btn-sm me-1' onClick={async () => { getRow('/crossroad', crossroad.id); navigate(`/crossroad/edit/${crossroad.id}`); }}>
                                                Редактировать
                                            </button>
                                            <button type='button' className='btn btn-danger btn-sm' onClick={async () => { deleteRow('/crossroads', crossroad.id); fetchTableData(); }}>
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

export default Crossroads;