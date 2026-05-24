import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BaseTamplateRequest from '../../consts/BaseTemplateRequest';
import { addRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function AddSing() {
    const [name_sing, setName] = useState('');
    const navigate = useNavigate();

    const submitSing = async (e) => {
        e.preventDefault();
        const headers = null;
        const sing = { name_sing };
        await addRow('/sings', sing, headers);
        setName('');
        navigate('/sings');
    };

    return (
        <div>
            <BaseTamplateRequest />
            <form className='container' onSubmit={submitSing}>
                <h1>Создание дорожного знака</h1>
                <div className='mb-3'>
                    <lable className='form-label'>Название дорожного знака</lable>
                    <input 
                        type='text'
                        name='name_sing' 
                        value={name_sing.name_sing} 
                        onChange={(e) => setName(e.target.value)}
                        className='form-input'  
                        placeholder='name_sing'
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
                    onClick={() => navigate('/sings')}
                >
                    Назад
                </button>
            </form>
        </div>
    )

};

export default AddSing;