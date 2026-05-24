import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplate from '../../consts/BaseTamplate';
import { readRows, getRow, deleteRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function Localities() {
    const [tableData, setTableData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const fetchTableData = useCallback(async () => {
        setLoading(true);
        
        const read_localities = await readRows('/localities');
        setTableData(read_localities);
        
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
                        <h1 className='Table-header'>Населенные пункты</h1>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Населенные пункты.</th>
                                    <th scope='col'>
                                        Операции  
                                        <button type='button' className='btn btn-success btn-sm me-1' onClick={() => navigate('/locality/add')}>
                                            Создать
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.items.map((locality) =>(
                                    <tr key={locality.id}>
                                        <th>{locality.id}</th>
                                        <td>{locality.name_locality}</td>
                                        <td>
                                            <button type='button' className='btn btn-primary btn-sm me-1' onClick={async () => { getRow('/locality', locality.id); navigate(`/locality/edit/${locality.id}`);}}>
                                                Редактировать
                                            </button>
                                            <button type='button' className='btn btn-danger btn-sm' onClick={async () => { deleteRow('/localities', locality.id); fetchTableData(); }}>
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

export default Localities;