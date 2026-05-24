import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BaseTamplateRequest from '../../consts/BaseTemplateRequest';
import { updateRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function EditSing() {
    const [name_sing, setName] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const submitSing = async (e) => {
        e.preventDefault();
        const headers = null;
        const sing = { name_sing };
        await updateRow('/sings', id, sing, headers);
        setName('');
        navigate('/sings');
    };

    return (
        <div>
            <BaseTamplateRequest />
            <form className='container' onSubmit={submitSing}>
                <h1>Редактировнаие дорожного знака</h1>
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
                    class='btn btn-warning'
                >
                    Обновить
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

export default EditSing;