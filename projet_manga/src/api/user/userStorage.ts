import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '@/type/user/userType';
import { userData } from '@/mock/user/fakeData';

const URL = 'https://api.tenrai.org/v1/users';
const USERS_KEY = 'users';

async function callApi(path: string, method: string, body?: object): Promise<void> {
    try {
        const response = await fetch(`${URL}${path}`, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }
    } catch (error) {
        console.log(error);
    }
}

async function readUsers(): Promise<UserType[]> {
    const stored = await AsyncStorage.getItem(USERS_KEY);
    if (stored) return JSON.parse(stored);

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(userData));
    return userData;
}

async function saveUsers(users: UserType[]): Promise<void> {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function getAllUsers(): Promise<UserType[]> {
    await callApi('', 'GET');
    return readUsers();
}

export async function createUser(
    username: string,
    email: string,
    password: string
): Promise<UserType> {
    const users = await readUsers();

    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Un compte existe déjà avec cet email');
    }

    const newUser: UserType = { username, email, password, role: 'user' };
    await callApi('', 'POST', { username, email, role: newUser.role });
    await saveUsers([...users, newUser]);
    return newUser;
}

export async function getUser(email: string, password: string): Promise<UserType | undefined> {
    await callApi(`/${encodeURIComponent(email)}`, 'GET');

    const users = await readUsers();
    return users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );
}

export async function updateStoredUser(email: string, changes: Partial<UserType>): Promise<void> {
    await callApi(`/${encodeURIComponent(email)}`, 'PATCH', changes);

    const users = await readUsers();
    await saveUsers(users.map((user) => (user.email === email ? {...user, ...changes} : user)));
}

export async function deleteStoredUser(email: string): Promise<void> {
    await callApi(`/${encodeURIComponent(email)}`, 'DELETE');

    const users = await readUsers();
    await saveUsers(users.filter((user) => user.email !== email));
}
