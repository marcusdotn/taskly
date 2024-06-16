import { IonContent, IonPage, IonRouterLink } from "@ionic/react";
import { loginWithGoogle } from "../lib/auth";

export default function HomePage() {
    const handleGoogleLogin = () => {
        (async () => {
            await loginWithGoogle();
        })();
    }

    return <IonPage className="mt-40 flex flex-col text-center gap-72">
        <h1 className="font-black text-4xl">Stay organized.</h1>

        <IonContent className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Log in to get started</h2>

            <div className="flex flex-col gap-3 items-center">
                <IonRouterLink 
                href="/login-email" 
                className="neutral-border-button px-5 py-2">
                <div className="flex flex-row gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z" fill="black"/>
                    </svg>

                    Login with email
                </div>
                </IonRouterLink>

                <label>OR</label>

                <button 
                onClick={handleGoogleLogin}
                className="neutral-border-button">
                <div className="flex flex-row gap-3 w-full h-full px-5 py-2">
                    <svg className="w-6 h-auto" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>

                    Continue with Google
                </div>
                </button>
            </div>
        </IonContent>
    </IonPage>
}