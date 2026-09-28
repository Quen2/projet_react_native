import {UserType} from "@/type/user/userType";
import {userData} from "@/mock/user/fakeData";

export function createUser(username: string, email: string, password: string): UserType | undefined | string {
    userData.push({
        username: username,
        email: email,
        password: password,
        role: "user"
    })
    return userData.find((data) =>
        data.username === username && data.email === email && data.password === password
    );
}