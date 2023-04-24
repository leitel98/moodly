import { LoginUserParams } from "<leitel>/types";
import { InputErros } from "<leitel>/types/error";
import { signIn } from "next-auth/react";

export const getErrorMsg = (key: string, errors: InputErros[]) => {
    if(errors.find(err => err.hasOwnProperty(key) !== undefined)) {
        const errorObj = errors.find(err => err.hasOwnProperty(key))
        return errorObj && errorObj[key]
    }
}

export const loginUser = async ({email, password} : LoginUserParams) => {
    const res = await signIn("credentials", {
        redirect: false,
        email,
        password
    })

    return res
}