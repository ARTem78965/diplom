import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplate from '../../consts/BaseTamplate';
import { readRows, getRow, deleteRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function CrossroadRoadSing() {
    const [tableData, setTableData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchTableData = useCallback(async () => {
        setLoading(true);

        const read_crossroads_roads_sings = await readRows('/crossroads/roads/sings');
        setTableData(read_crossroads_roads_sings);

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
                        <h1 className='Table-header'>Дорожные знаки на перекрестках.</h1>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Тип перекрестка</th>
                                    <th scope='col'>Название дороги</th>
                                    <th scope='col'>Номер дороги</th>
                                    <th scope='col'>ID дорожного знака</th>
                                    <th scope='col'>Название дорожного знака</th>
                                    <th scope='col'>Изображение</th>
                                    <th scope='col'>Широта</th>
                                    <th scope='col'>Долгота</th>
                                    <th scope='col'>Статус</th>
                                    <th scope='col'>Рекомендации</th>
                                    <th scope='col'>
                                        Операции  
                                        <button type='button' className='btn btn-success btn-sm me-1' onClick={() => navigate('/crossroad/road/sing/add')}>
                                            Создать
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.items.map((crossroad_road_sing) =>(
                                    <tr key={crossroad_road_sing.id}>
                                        <th>{crossroad_road_sing.id}</th>
                                        <th>{crossroad_road_sing.type_crossroad}</th>
                                        <td>{crossroad_road_sing.roads.name_road}</td>
                                        <td>{crossroad_road_sing.roads.number_road}</td>
                                        <td>{crossroad_road_sing.roads.sings.sing_id}</td>
                                        <td>{crossroad_road_sing.roads.sings.name_sing}</td>
                                        <td>{crossroad_road_sing.roads.sings.image}</td>
                                        <td>{crossroad_road_sing.roads.sings.latitude}</td>
                                        <td>{crossroad_road_sing.roads.sings.longitude}</td>
                                        <td>{crossroad_road_sing.roads.sings.state}</td>
                                        <td>{crossroad_road_sing.roads.sings.comment}</td>
                                        <td>
                                            <button type='button' className='btn btn-primary btn-sm me-1' onClick={async () => { getRow('/crossroad/road/sing', crossroad_road_sing.id); navigate(`/crossroad/road/sing/edit/${crossroad_road_sing.id}`); }}>
                                                Редактировать
                                            </button>
                                            <button type='button' className='btn btn-danger btn-sm' onClick={async () => { deleteRow('/crossroads/roads/sings', crossroad_road_sing.id); fetchTableData(); }}>
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

export default CrossroadRoadSing;