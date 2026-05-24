import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplateRequest from '../../consts/BaseTemplateRequest';
import { addRow, readRows } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function AddLocalityCrossroad() {
    const [loading, setLoading] = useState(false);
    const [localities, setLocalities] = useState('');
    const [crossroads_roads_sings, setCrossroadsRoadsSings] = useState('');
    
    const [locality_id, setLocalityID] = useState('');
    const [road_sing_crossroad_id, setCrossroadRoadSingID] = useState('');

    const navigate = useNavigate();

    const handleChangeLocalityID = (event) => { setLocalityID(event.target.value); };
    const handleChangeCrossroadRoadsSingsID = (event) => { setCrossroadRoadSingID(event.target.value); };

    const submitLocalityCrossroad = async (e) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        };
        const crossroad_road_sing = { road_sing_crossroad_id, locality_id };
        await addRow('/localities/crossroads/roads/sings', crossroad_road_sing, headers);
        setCrossroadRoadSingID('');
        setLocalityID('');
        navigate('/localities/crossroads/roads/sings');
    };

    const fetchTableData = useCallback(async () => {
        setLoading(true);

        const read_crossroads_roads_sings = await readRows('/crossroads/roads/sings');
        const read_localities = await readRows('/localities');

        setCrossroadsRoadsSings(read_crossroads_roads_sings);
        setLocalities(read_localities);

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
                        <form className='container' onSubmit={submitLocalityCrossroad}>
                            <h1>Создание знака на населенном пункте</h1>
                            <div className='mb-3'>
                                <lable className='form-label'> Перекресток </lable>
                                <select 
                                    value={road_sing_crossroad_id}
                                    onChange={handleChangeCrossroadRoadsSingsID}
                                    class="form-select"
                                    aria-label="Default select example"
                                >
                                    <option value="">Название дороги</option>
                                    { crossroads_roads_sings?.items?.map(crossroad_road_sing => (
                                        <option key={ crossroad_road_sing.id } value={ crossroad_road_sing.id }>
                                            Перекресток: { crossroad_road_sing.type_crossroad } Дорога: { crossroad_road_sing.roads.name_road }  Дорожный знак: { crossroad_road_sing.roads.sings.name_sing }
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-3'>
                                <lable className='form-label'>Населенный пункт</lable>
                                <select 
                                        value={locality_id}
                                        onChange={handleChangeLocalityID}
                                        class="form-select"
                                        aria-label="Default select example"
                                    >
                                        <option value="">Населенный пункт</option>
                                        { localities?.items?.map(locality => (
                                            <option key={ locality.id } value={ locality.id }>
                                                { locality.name_locality }
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
                                onClick={() => navigate('/localities/crossroads/roads/sings')}
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

export default AddLocalityCrossroad;