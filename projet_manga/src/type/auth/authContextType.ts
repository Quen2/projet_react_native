import {UserType} from "@/type/user/userType";

export interface AuthContextType {
    user: UserType | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
}