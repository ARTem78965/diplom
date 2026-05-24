import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplateRequest from '../../consts/BaseTemplateRequest';
import { addRow, readRows } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function AddCrossroadRoadSing() {
    const [loading, setLoading] = useState(false);
    const [roads_sings, setRoadsSings] = useState('');
    const [crossroads, setCrossroads] = useState('');

    const [road_sing_id, setRoadSingID] = useState('');
    const [crossroad_id, setCrossroadID] = useState('');

    const navigate = useNavigate();

    const handleChangeCrossroadID = (event) => { setCrossroadID(event.target.value); };
    const handleChangeRoadSingID = (event) => { setRoadSingID(event.target.value); };

    const submitCrossroadRoadSing = async (e) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        };
        const crossroad_road_sing = { road_sing_id, crossroad_id };
        await addRow('/crossroads/roads/sings', crossroad_road_sing, headers);
        setRoadSingID('');
        setCrossroadID('');
        navigate('/crossroads/roads/sings');
    };

    const fetchTableData = useCallback(async () => {
        setLoading(true);

        const read_roads_sings = await readRows('/roads/sings');
        const read_crossroads = await readRows('/crossroads');

        setRoadsSings(read_roads_sings);
        setCrossroads(read_crossroads);

        setLoading(false);
    }, []);

    useEffect(() => {
        fetchTableData();
    }, [fetchTableData]);

    return (
        <div>
            { loading ? 
                (
                    <div>
                        <p>Загрузка данных...</p>
                    </div>
                ) : localStorage.getItem('login') !== '' ? 
                (
                    <div>
                        <BaseTamplateRequest />
                        <form className='container' onSubmit={submitCrossroadRoadSing}>
                            <h1>Создание знака на перекрестке</h1>
                            <div className='mb-3'>
                                <lable className='form-label'>Название дороги</lable>
                                <select 
                                    value={road_sing_id}
                                    onChange={handleChangeRoadSingID}
                                    class="form-select"
                                    aria-label="Default select example"
                                >
                                    <option value="">Название дороги</option>
                                    { roads_sings?.items?.map(road_sing => (
                                        <option key={ road_sing.id } value={ road_sing.id }>
                                            Дорога: { road_sing.name_road }  Дорожный знак: { road_sing.sings.name_sing }
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-3'>
                                <lable className='form-label'>Название перекрестка</lable>
                                <select 
                                    value={crossroad_id}
                                    onChange={handleChangeCrossroadID}
                                    class="form-select"
                                    aria-label="Default select example"
                                >
                                    <option value="">Название перекрестка</option>
                                    { crossroads?.items?.map(crossroad => (
                                        <option key={ crossroad.id } value={ crossroad.id }>
                                            { crossroad.type_crossroad }
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button 
                                type='submit' 
                                className='btn btn-primary'
                            >
                                Добавить
                            </button>
                            <button 
                                type='submit' 
                                className='btn btn-danger' 
                                onClick={() => navigate('/crossroads/roads/sings')}
                            >
                                Назад
                            </button>
                        </form>
                    </div>
                ) : (
                    <p className='no-data'>Нет данных для отображения</p> 
                )
            }
        </div>
    )
};

export default AddCrossroadRoadSing;