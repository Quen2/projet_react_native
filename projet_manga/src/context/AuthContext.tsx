import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserType} from "@/type/user/userType";
import {getUser, updateStoredUser} from "@/api/user/userStorage";
import {AuthContextType} from "@/type/auth/authContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserType | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!token && !!user;

    useEffect(() => {
        loadStoredAuth();
    }, []);

    const loadStoredAuth = async () => {
        try {
            const [storedToken, storedUser] = await Promise.all([
                AsyncStorage.getItem('authToken'),
                AsyncStorage.getItem('user'),
            ]);

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const user = await getUser(email, password);
            if (!user) return false;

            const token = `fake-${Date.now()}-${Math.random().toString(36).slice(2)}`;

            await Promise.all([
                AsyncStorage.setItem('authToken', token),
                AsyncStorage.setItem('user', JSON.stringify(user)),
            ]);

            setToken(token);
            setUser(user);
            return true;
        } catch {
            return false;
        }
    };

    const logout = async () => {
        await Promise.all([
            AsyncStorage.removeItem('authToken'),
            AsyncStorage.removeItem('user'),
        ]);
        setToken(null);
        setUser(null);
    };

    const updateUser = async (changes: Partial<UserType>) => {
        if (!user) return;
        const updated = {...user, ...changes};

        await updateStoredUser(user.email, changes);
        await AsyncStorage.setItem('user', JSON.stringify(updated));
        setUser(updated);
    };

    return (
        <AuthContext.Provider
            value={{ user, token, isAuthenticated, loading, login, logout, updateUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
    return ctx;
};