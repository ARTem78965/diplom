import { useState, useEffect, useCallback } from 'react';

import BaseTamplate from '../../consts/BaseTamplate';
import { readRows } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function FixSings() {
    const [tableData, setTableData] = useState();
    const [loading, setLoading] = useState(false);


    const fetchTableData = useCallback(async () => {
        setLoading(true);
        
        const read_localities = await readRows('/fix-sings');
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
                        <h1 className='Table-header'>Список замененных знаков</h1>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Дата замены</th>
                                    <th scope='col'>Название дорожного знака</th>
                                    <th scope='col'>Причина</th>
                                    <th scope='col'>Долгота</th>
                                    <th scope='col'>Широта</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.items.map((fix_sing) =>(
                                    <tr key={fix_sing.id}>
                                        <th>{fix_sing.id}</th>
                                        <td>{fix_sing.date_fix}</td>
                                        <td>{fix_sing.name_sing}</td>
                                        <td>{fix_sing.state}</td>
                                        <td>{fix_sing.latitude}</td>
                                        <td>{fix_sing.longitude}</td>
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

export default FixSings;