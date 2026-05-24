import constFlaskURL from './constFlaskURL'

export const addRow = async (endpoint, data, header) => { 
    const response = await constFlaskURL.post(endpoint, data, { headers: header });

    if (response.status === 201) {
        return response;
    }
}

export const readRows = async (endpoint) => {
    const response = await constFlaskURL.get(endpoint);
        
    if (response.status === 200) {
        return response.data;
    } 
}

export const getRow = async (endpoint, id_row) => {
    const response = await constFlaskURL.get(`${endpoint}?id=${id_row}`);
        
    if (response.status === 200) {
        return response;
    }
}

export const updateRow = async (endpoint, id_row, data, header) => {
    const response = await constFlaskURL.put(`${endpoint}?id=${id_row}`, data, { headers: header });

    if (response.status === 200) {
        return response;
    }
}

export const deleteRow = async (endpoint, id_row) => {
    const response = await constFlaskURL.delete(`${endpoint}?id=${id_row}`);

    if (response.status === 204) {
        return response;
    }
}