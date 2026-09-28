import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '@/type/user/userType';
import { userData } from '@/mock/user/fakeData';

const USERS_KEY = 'users';

export async function getAllUsers(): Promise<UserType[]> {
    const stored = await AsyncStorage.getItem(USERS_KEY);
    if (stored) return JSON.parse(stored);

    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(userData));
    return userData;
}

async function saveAllUsers(users: UserType[]): Promise<void> {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export async function createUser(
    username: string,
    email: string,
    password: string
): Promise<UserType> {
    const users = await getAllUsers();

    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Un compte existe déjà avec cet email');
    }

    const newUser: UserType = { username, email, password, role: 'user' };
    await saveAllUsers([...users, newUser]);
    return newUser;
}

export async function getUser(email: string, password: string): Promise<UserType | undefined> {
    const users = await getAllUsers();
    return users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
}