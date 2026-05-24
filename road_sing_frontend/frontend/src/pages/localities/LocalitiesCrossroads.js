import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplate from '../../consts/BaseTamplate';
import { readRows, getRow, deleteRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function LocalitiesCrossroads() {
    const [tableData, setTableData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchTableData = useCallback(async () => {
        setLoading(true);

        const read_localities_crossroads_roads_sings = await readRows('/localities/crossroads/roads/sings');
        setTableData(read_localities_crossroads_roads_sings);
        
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
                        <h1 className='Table-header'>Дорожные знаки на населенных пунктах.</h1>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th scope='col'>ID</th>
                                    <th scope='col'>Населенный пункт</th>
                                    <th scope='col'>Тип перекрестка</th>
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
                                        <button type='button' className='btn btn-success btn-sm me-1' onClick={() => navigate('/locality/crossroad/road/sing/add')}>
                                            Создать
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {tableData?.items.map((locality_crossroad) =>(
                                    <tr key={locality_crossroad.id}>
                                        <th>{locality_crossroad.id}</th>
                                        <th>{locality_crossroad.name_locality}</th>
                                        <th>{locality_crossroad.crossroads.type_crossroad}</th>
                                        <td>{locality_crossroad.crossroads.roads.name_road}</td>
                                        <td>{locality_crossroad.crossroads.roads.number_road}</td>
                                        <td>{locality_crossroad.crossroads.roads.sings.sing_id}</td>
                                        <td>{locality_crossroad.crossroads.roads.sings.name_sing}</td>
                                        <td>{locality_crossroad.crossroads.roads.sings.image}</td>
                                        <td>{locality_crossroad.crossroads.roads.sings.latitude}</td>
                                        <td>{locality_crossroad.crossroads.roads.sings.longitude}</td>
                                        <td>{locality_crossroad.crossroads.roads.sings.state}</td>
                                        <td>{locality_crossroad.crossroads.roads.sings.comment}</td>
                                        <td>
                                            <button type='button' className='btn btn-primary btn-sm me-1' onClick={async () => { getRow('/locality/crossroad/road/sing', locality_crossroad.id); navigate(`/locality/crossroad/road/sing/edit/${locality_crossroad.id}`);}}>
                                                Редактировать
                                            </button>
                                            <button type='button' className='btn btn-danger btn-sm' onClick={async () => { deleteRow('/localities/crossroads/roads/sings', locality_crossroad.id); fetchTableData(); }}>
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

export default LocalitiesCrossroads;