import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplateRequest from '../../consts/BaseTemplateRequest';
import { addRow, readRows } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function AddRoadSing() {
    const [loading, setLoading] = useState(false);
    const [roads, setRoads] = useState('');

    const [road_id, setRoadID] = useState('');
    const [image, setFile] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    
    const navigate = useNavigate();

    const handelFileChange = (e) => { setFile(e.target.files[0]); };
    const handleChange = (event) => { setRoadID(event.target.value); };

    const submitRoadSing = async (e) => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json'
        };
        const road_sing = { road_id, image, latitude, longitude };
        
        await addRow('/roads/sings', road_sing, headers);
        setTimeout(() => {
            setRoadID('')
            setLatitude('');
            setLongitude('');
            navigate('/roads/sings');
        }, 5000);
    };

    const fetchTableData = useCallback(async () => {
        setLoading(true);

        const read_roads = await readRows('/roads');
        setRoads(read_roads);

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
                        <form className='container' onSubmit={submitRoadSing}>
                            <h1>Создание знака на дороге</h1>
                            <div className='mb-3'>
                                <lable className='form-label'>Имя дороги</lable>
                                <select 
                                    value={road_id}
                                    onChange={handleChange}
                                    class="form-select"
                                    aria-label="Default select example"
                                >
                                    <option value="">Имя дороги</option>
                                    { roads?.items?.map(road => (
                                        <option key={ road.id } value={ road.id }>
                                            { road.name_road }
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-3'>
                                <lable className='form-label'>Изображение</lable>
                                <input
                                    type='file'
                                    name='image'
                                    value={image.image} 
                                    onChange={handelFileChange}
                                    placeholder='image'
                                    required  
                                    multiple
                                />
                            </div>
                            <div className='mb-3'>
                                <lable className='form-label'>Широта</lable>
                                <input 
                                    type='text'
                                    name='latitude' 
                                    value={latitude.latitude} 
                                    onChange={(e) => setLatitude(e.target.value)}
                                    className='form-input'  
                                    placeholder='latitude'
                                    required  
                                />
                            </div>
                            <div className='mb-3'>
                                <lable className='form-label'>Долгота</lable>
                                <input 
                                    type='text'
                                    name='longitude' 
                                    value={longitude.longitude} 
                                    onChange={(e) => setLongitude(e.target.value)}
                                    className='form-input'  
                                    placeholder='longitude'
                                    required  
                                />
                            </div>
                            <button 
                                type='submit' 
                                className='btn btn-primary'
                            >
                                Создать
                            </button>
                            <button 
                                type='submit' 
                                className='btn btn-danger' 
                                onClick={() => navigate('/roads/sings')}
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

export default AddRoadSing;