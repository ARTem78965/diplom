import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BaseTamplateRequest from '../../consts/BaseTemplateRequest';
import { updateRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function EditRoad() {
    const [name_road, setName] = useState('');
    const [number_road, setNumber] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const submitRoad = async (e) => {
        e.preventDefault();
        const headers = null;
        const road = { name_road, number_road};
        await updateRow('/roads', id, road, headers);
        setName('');
        setNumber('');
        navigate('/roads');
    };

    return (
        <div>
            <BaseTamplateRequest />
            <form className='container' onSubmit={submitRoad}>
                <h1>Редактироание дороги</h1>
                <div className='mb-3'>
                    <lable className='form-label'>Название дороги</lable>
                    <input 
                        type='text'
                        name='name_road' 
                        value={name_road.name_road} 
                        onChange={(e) => setName(e.target.value)}
                        className='form-input'  
                        placeholder='name_road'
                        required  
                    />
                </div>
                <div className='mb-3'>
                    <lable className='form-label'>Номер дороги</lable>
                    <input 
                        type='text'
                        name='number_road' 
                        value={number_road.number_road} 
                        onChange={(e) => setNumber(e.target.value)}
                        className='form-input'  
                        placeholder='number_road'
                        required  
                    />
                </div>
                <button 
                    type='submit' 
                    class='btn btn-warning'
                >
                    Обновить
                </button>
                <button 
                    type='submit' 
                    className='btn btn-danger' 
                    onClick={() => navigate('/roads')}
                >
                    Назад
                </button>
            </form>
        </div>
    )

};

export default EditRoad;