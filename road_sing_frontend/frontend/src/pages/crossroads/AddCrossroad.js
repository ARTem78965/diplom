import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplateRequest from '../../consts/BaseTemplateRequest';
import { addRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function AddCrossroad() {
    const [type_crossroad, setTypeCrossroad] = useState('');
    const navigate = useNavigate();

    const submitCrossroad = async (e) => {
        e.preventDefault();
        const headers = null;
        const crossroad = { type_crossroad };
        await addRow('/crossroads', crossroad, headers);
        setTypeCrossroad('');
        navigate('/crossroads');
    };

    return (
        <div>
            <BaseTamplateRequest />
            <form className='container' onSubmit={submitCrossroad}>
                <h1>Создание перекрестка.</h1>
                <div className='mb-3'>
                    <lable className='form-label'>Тип перекрестка</lable>
                    <input 
                        type='text'
                        name='type_crossroad' 
                        value={type_crossroad.type_crossroad} 
                        onChange={(e) => setTypeCrossroad(e.target.value)}
                        className='form-input'  
                        placeholder='type_crossroad'
                        required  
                    />
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
                    onClick={() => navigate('/crossroads')}
                >
                    Назад
                </button>
            </form>
        </div>
    )

};

export default AddCrossroad;