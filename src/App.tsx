import { IonReactRouter } from '@ionic/react-router'
import { IonApp, IonRoute, IonRouterOutlet } from '@ionic/react'
import HomePage from './pages/Home'
import LoginWithEmailPage from './pages/LoginWithEmail'
import RegisterWithEmailPage from './pages/RegisterWithEmail'
import DashboardHomePage from './pages/Dashboard'

/* The most important part of an Ionic project with React */
import { setupIonicReact } from '@ionic/react'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

import { useEffect, useState } from 'react'
import pb from './lib/pocketbase'
import ServerErrorPage from './pages/ServerErrorPage'

setupIonicReact();

function App() {
    const [showServerError, setShowServerError] = useState(false);
    useEffect(() => {
        pb.health.check()
        .then(() => {
            setShowServerError(false);
        })
        .catch(() => {
            setShowServerError(true);
        })
    });

    return (
    <IonApp>
        {showServerError ? <ServerErrorPage /> : (
            <IonReactRouter>
                <IonRouterOutlet>
                    <IonRoute exact path='/' render={() => <HomePage />} />
                    <IonRoute path='/login-email' render={() => <LoginWithEmailPage />} />
                    <IonRoute path='/register-email' render={() => <RegisterWithEmailPage />} />

                    <IonRoute path='/dashboard' render={() => <DashboardHomePage />} />
                </IonRouterOutlet>
            </IonReactRouter>
        )}
    </IonApp>
    )
}

export default App
