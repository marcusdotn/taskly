import { IonContent, IonPage, IonRefresher, IonRefresherContent } from "@ionic/react";

export default function ServerErrorPage() {
    return <IonPage>
        <IonContent>
            <IonRefresher 
            slot="fixed"
            onIonRefresh={()=>{
                window.location.reload();
            }}
            >
            <IonRefresherContent />

            </IonRefresher>
                <div className="flex flex-col gap-8 text-center justify-center  h-full">
                    <h1 className="text-2xl font-black">Oops! We can't connect to the server.</h1>
                    <p>Please check your internet connection or try again later.</p>
                    <p className="text-gray-500">Pull down to refresh</p>
                </div>
        </IonContent>
    </IonPage>
}