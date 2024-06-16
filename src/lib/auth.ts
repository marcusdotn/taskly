import { type RecordAuthResponse, type RecordModel } from "pocketbase";
import pb from "./pocketbase";

export async function register(email: string, password: string, confirmPassword: string): Promise<any> {
    let errReason: Record<string, {data: {data: string}}> | undefined;
    
    await pb
    .collection("users")
    .create({
        email: email,
        password: password,
        passwordConfirm: confirmPassword
    })
    .catch(err => errReason = err);
    if (errReason) return errReason?.data?.data;

    await login(email, password);
}

export async function login(email: string, password: string): Promise<any> {
    let errReason: Record<string, any> | undefined;

    const authData: RecordAuthResponse<RecordModel> = await pb
    .collection("users")
    .authWithPassword(email, password)
    .catch(err => errReason = err);
    if (errReason) return errReason?.data?.data || errReason;

    pb.authStore.save(authData.token, {id: authData.record.id});
}

export async function loginWithGoogle() {
    let wasSuccess = true;

    await pb
        .collection("users")
        .authWithOAuth2({ provider: "google" })
        .catch(()=>wasSuccess=false);

    return wasSuccess;
}

export function logout() {
    pb.authStore.clear();
}