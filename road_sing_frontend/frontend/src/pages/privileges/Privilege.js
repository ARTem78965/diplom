import { useState, useEffect, useCallback } from 'react';

import BaseTamplate from '../../consts/BaseTamplate';
import { readRows } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function Privilege() {
    const [tableData, setTableData] = useState();
    const [loading, setLoading] = useState(false);

    const fetchTableData = useCallback(async () => {
        setLoading(true);

        const read_priviliges = await readRows('/privileges');
        setTableData(read_priviliges);
        
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
                        <h1 className='Table-header'>Привелегии.</h1>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Пивелегия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.items.map((privilege) =>(
                                    <tr key={privilege.id}>
                                        <th>{privilege.id}</th>
                                        <td>{privilege.name_privilege}</td>
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

export default Privilege;