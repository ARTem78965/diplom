import { useState, useEffect, useCallback } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

import BaseTamplate from '../consts/BaseTamplate';
import { readRows } from '../consts/crud';


function Home() {
    const [tableData, setTableData] = useState();
    const [loading, setLoading] = useState(false);

    const fetchTableData = useCallback(async () => {
        setLoading(true);

        const localities_crossroads = await readRows('/localities/crossroads/roads/sings');
        setTableData(localities_crossroads);

        setLoading(false);
    }, []);
    
    useEffect(() => {
        fetchTableData();
    }, [fetchTableData]);


    const iconRoadSing = (road_sing) => {
        return `
            <div>
                <div>
                    <img src='img/${road_sing.crossroads.roads.sings.image}' />
                </div>
                <div>
                    <h3>
                        ${road_sing.crossroads.roads.sings.name_sing}
                    </h3>
                    <div>
                        <div>
                            <div>
                                <div style='font-weight: bold;'>
                                    Широта
                                </div>
                                <div>
                                    ${road_sing.crossroads.roads.sings.latitude.toFixed(6)}
                                </div>
                            </div>
                            <div>
                                <div style='font-weight: bold;'>
                                    Долгота
                                </div>
                                <div>
                                    ${road_sing.crossroads.roads.sings.longitude.toFixed(6)}
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div style='font-weight: bold;'>
                                        Населенный пункт:
                                    </div>
                                    <div>
                                        ${road_sing.name_locality}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div style='font-weight: bold;'>
                                        Тип перекрестка:
                                    </div>
                                    <div>
                                        ${road_sing.crossroads.type_crossroad}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <div style='font-weight: bold;'>
                                        Дорога:
                                    </div>
                                    <div>
                                        ${road_sing.crossroads.roads.number_road},
                                        ${road_sing.crossroads.roads.name_road}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    return (
        <div> 
            { loading ? (
                <div>
                    <p>Загрузка данных...</p>
                </div>
            ) : localStorage.getItem('login') !== '' ? (
                <div>
                    <BaseTamplate />
                    <div className='container'>
                        <h1>Интерактивная карта.</h1>
                        <div style={{ 
                            width: '100%', 
                            height: '600px',
                        }}>
                            <YMaps>
                                <Map 
                                    state={{center: [55.751574, 37.573856], zoom: 10 }} 
                                    width='100%' 
                                    height='100%'
                                >
                                {tableData?.items.map((road_sing) => (
                                    <Placemark
                                        key={road_sing.id}
                                        geometry={[road_sing.crossroads.roads.sings.latitude, road_sing.crossroads.roads.sings.longitude]}
                                        options={{
                                            iconColor: road_sing.crossroads.roads.sings.comment !== '' ? 'red' : 'blue',
                                            iconImageSize: [48, 48],
                                            iconImageOffset: [-24, -48],
                                            hideIconOnBalloonOpen: false,
                                            openBalloonOnClick: true,
                                        }}
                                        properties={{
                                            hintContent: `<div>${road_sing.crossroads.roads.sings.name_sing}</div>`,
                                            balloonContent: iconRoadSing(road_sing),
                                        }}
                                        modules={['geoObject.addon.balloon']}
                                        onClick={() => {
                                            console.log('Выбран маркер:', road_sing.name_locality);
                                        }}
                                    />
                                ))}
                                </Map>
                            </YMaps>
                        </div>
                        <div>
                           <div className='container'>
                                <h1 className='Table-header'>Дорожные знаки которые требуется замена.</h1>
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
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { tableData?.items.map((road_sing) => {
                                            if (road_sing.crossroads.roads.sings.state !== 'Хорошее состояние') {
                                                return (
                                                    <tr key={road_sing.id}>
                                                        <th>{road_sing.id}</th>
                                                        <th>{road_sing.name_locality}</th>
                                                        <th>{road_sing.crossroads.type_crossroad}</th>
                                                        <td>{road_sing.crossroads.roads.name_road}</td>
                                                        <td>{road_sing.crossroads.roads.number_road}</td>
                                                        <td>{road_sing.crossroads.roads.sings.sing_id}</td>
                                                        <td>{road_sing.crossroads.roads.sings.name_sing}</td>
                                                        <td>{road_sing.crossroads.roads.sings.image}</td>
                                                        <td>{road_sing.crossroads.roads.sings.latitude}</td>
                                                        <td>{road_sing.crossroads.roads.sings.longitude}</td>
                                                        <td>{road_sing.crossroads.roads.sings.state}</td>
                                                        <td>{road_sing.crossroads.roads.sings.comment}</td>
                                                    </tr>
                                                )
                                            }
                                            return null;                                         
                                        })}
                                    </tbody>
                                </table>
                            </div> 
                        </div>
                    </div>
                </div>
            ) : (
                <p className='no-data'>Нет данных для отображения</p> 
            )} 
        </div>
    );
}

export default Home;
