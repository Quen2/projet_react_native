import {UserType} from "@/type/user/userType";
import {userData} from "@/mock/user/fakeData";

export function getUser(email: string, password: string): UserType | undefined {
    return userData.find((data) =>
        data.email === email && data.password === password
    );
}