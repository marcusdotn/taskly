import { IonContent, IonFooter, IonHeader, IonPage, IonRouterLink, IonToast, IonToolbar, useIonRouter } from "@ionic/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../styles/Buttons.css";
import "../styles/Labels.css";
import { useState } from "react";
import { login } from "../lib/auth";




export default function LoginWithEmailPage() {
    const ionRouter = useIonRouter();
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <h1 className="text-center font-semibold text-xl">Login with email</h1>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <>
                <Formik
                initialValues={{email: "", password: "", server: ""}}
                onSubmit={(values, formikContext) => {
                    (async () => {
                        formikContext.setSubmitting(true);
                        const errReason = await login(values.email, values.password);
                        formikContext.setSubmitting(false);

                        if (errReason) {
                            formikContext.setErrors({
                                password: "Incorrect email or password"
                            });

                            return;
                        }

                        setShowSuccess(true);
                        formikContext.resetForm();
                        ionRouter.push("/dashboard", "root", "replace");
                    })();
                }}
                validate={values => {
                    const errors: Record<string, string> = {};

                    if (!values.email) {
                        errors.email = "Required";
                    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                        errors.email = "Invalid email address";
                    }
                }}
                >
                    {({isSubmitting, isValid, dirty}) => (
                        <Form className="
                        flex flex-col items-center self-center
                        gap-10 w-1/2
                        m-auto mt-52">
                            <fieldset>
                                <label className="font-bold" htmlFor="email">Email</label>
                                <Field 
                                type="email" 
                                name="email" 
                                id="email"
                                placeholder="your@email.com"
                                className="
                                w-full
                                block py-1
                                rounded-md 
                                border-solid border-2 border-gray-300" />
                                <ErrorMessage className="error_message" name="email" component="div" />
                            </fieldset>

                            <fieldset>
                                <label className="font-bold" htmlFor="password">Password</label>
                                <Field 
                                type="password" 
                                name="password"
                                id="password"
                                placeholder="*********************" 
                                className="
                                w-full
                                block py-1
                                rounded-md 
                                border-solid border-2 border-gray-300" />
                                <ErrorMessage className="error_message" name="password" component="div" />
                            </fieldset>                            
                            
                            <div className="flex flex-col w-full">
                                <button
                                type="submit"
                                className="black-button w-full py-2"
                                disabled={!dirty || !isValid || isSubmitting}
                                >Log in</button>

                                <IonRouterLink 
                                href="/register-email"
                                className="link"
                                >don't have an account? register</IonRouterLink>
                            </div>
                        </Form>
                    )}
                </Formik>
                </>
            </IonContent>
            <IonFooter>
                    <IonToast
                        message="Successfully logged in!"
                        color="success"
                        isOpen={showSuccess}
                        duration={3000} 
                        position="bottom"
                    />
            </IonFooter>
        </IonPage>
    );
}
