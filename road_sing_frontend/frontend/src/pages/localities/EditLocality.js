import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import BaseTamplateRequest from '../../consts/BaseTemplateRequest';
import { updateRow } from '../../consts/crud';
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css'


function EditLocality() {
    const [name_locality, setName] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    const submitLocality = async (e) => {
        e.preventDefault();
        const headers = null;
        const locality = { name_locality};
        await updateRow('/localities', id, locality, headers);
        setName('');
        navigate('/localities');
    };

    return (
        <div>
            <BaseTamplateRequest />
            <form className='container' onSubmit={submitLocality}>
                <h1>Редактировнаие населенного пункта</h1>
                <div className='mb-3'>
                    <lable className='form-label'>Населенный пункт</lable>
                    <input 
                        type='text'
                        name='name_locality' 
                        value={name_locality.name_locality} 
                        onChange={(e) => setName(e.target.value)}
                        className='form-input'  
                        placeholder='name_locality'
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
                    onClick={() => navigate('/localities')}
                >
                    Назад
                </button>
            </form>
        </div>
    )

};

export default EditLocality;