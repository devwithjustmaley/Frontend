const API = import.meta.env.VITE_API + '/user';

export const LogUser = async (phone_number, password) => {
    const response = await fetch(`${API}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone_number,
            password
        })
    })
    const data = await response.json();
    return data;
}

export const SignUpUser = async (lastname, firstname, phone_number, program, level, password) => { 
    const response = await fetch(`${API}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lastname,
            firstname,
            phone_number,
            program,
            level,
            password
        })
    })
    const data = await response.json();
    return data;
}

export const getUserInfos = async(token) => {
    const response = await fetch(`${API}/infos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la récupération des infos');
    }

    const data = await response.json();
    return data.userInfos;
}

export const LogoutUser = async (token) => {
    const response = await fetch(`${API}/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la déconnexion');
    }

    return await response.json();
}

export const LogoutAllDevices = async (token) => {
    const response = await fetch(`${API}/logout-all`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la déconnexion');
    }

    return await response.json();
}
