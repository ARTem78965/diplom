import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplate from '../../consts/BaseTamplate';
import { readRows, getRow, deleteRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function RoadsSings() {
    const [tableData, setTableData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchTableData = useCallback(async () => {
        setLoading(true);

        const read_roads_sings = await readRows('/roads/sings');
        setTableData(read_roads_sings);
        
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
                        <h1 className='Table-header'>Знаки на дорогах.</h1>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Название дороги</th>
                                    <th scope='col'>Номер дороги</th>
                                    <th scope='col'>ID дорожного знака</th>
                                    <th scope='col'>Название дорожного знака</th>
                                    <th scope='col'>Изображение</th>
                                    <th scope='col'>Широта</th>
                                    <th scope='col'>Долгота</th>
                                    <th scope='col'>Состояние дорожного знака</th>
                                    <th scope='col'>Рекомендации</th>
                                    <th scope='col'>
                                        Операции  
                                        <button type='button' className='btn btn-success btn-sm me-1' onClick={() => navigate('/road/sing/add')}>
                                            Создать
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.items.map((road_sing) =>(
                                    <tr key={road_sing.id}>
                                        <th>{road_sing.id}</th>
                                        <td>{road_sing.name_road}</td>
                                        <td>{road_sing.number_road}</td>
                                        <td>{road_sing.sings.sing_id}</td>
                                        <td>{road_sing.sings.name_sing}</td>
                                        <td>{road_sing.sings.image}</td>
                                        <td>{road_sing.sings.latitude}</td>
                                        <td>{road_sing.sings.longitude}</td>
                                        <td>{road_sing.sings.state}</td>
                                        <td>{road_sing.sings.comment}</td>
                                        <td>
                                            <button type='button' className='btn btn-primary btn-sm me-1' onClick={async () => { getRow('/road/sing', road_sing.id); navigate(`/road/sing/edit/${road_sing.id}`);}}>
                                                Редактировать
                                            </button>
                                            <button type='button' className='btn btn-danger btn-sm' onClick={async () => {deleteRow('/roads/sings', road_sing.id); fetchTableData(); }}>
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

export default RoadsSings;