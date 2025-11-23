
const API = import.meta.env.VITE_API + '/course';

const addCourse = async (title, subject, file, token) => {
    const formData = new FormData();
        formData.append("title", title);
        formData.append("subject", subject);
        formData.append("attachment", file);

    const res = await fetch(`${API}/add`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        },
        body: formData
    })

    if(!res.ok) {
        throw new Error('Echec de l\'ajout du cours');
    }
    
    return await res.json();
}

export const getUserCourses = async (userId, token) => {
    const res = await fetch(`${API}/get/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if(!res.ok) {
        throw new Error('Echec de la récupération des cours');
    }
    
    return await res.json();
}

export default addCourse;

