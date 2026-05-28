const API_URL = 'http://localhost:8080/api/users';

export const getUsers = async () => {

    const response = await fetch(API_URL);

    return await response.json();
};

export const createUser = async (user: any) => {

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    return await response.json();
};

export const updateUserApi = async (
    id: number,
    user: any
) => {

    const response = await fetch(
        `${API_URL}/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        }
    );

    return await response.json();
};

export const deleteUserApi = async (
    id: number
) => {

    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
};