import { IonContent, IonFooter, IonHeader, IonPage, IonRouterLink, IonToast, IonToolbar, useIonRouter } from "@ionic/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import "../styles/Buttons.css";
import "../styles/Labels.css";
import { useState } from "react";
import { register } from "../lib/auth";




export default function RegisterWithEmailPage() {
    const ionRouter = useIonRouter();
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <h1 className="text-center font-semibold text-xl">Register with email</h1>
                </IonToolbar>
            </IonHeader>
            <IonContent class="ion-padding">
                <>
                <Formik
                initialValues={{email: "", password: "", passwordConfirm: "", server: ""}}
                onSubmit={(values, formikContext) => {
                    (async () => {
                        formikContext.setSubmitting(true);
                        const errData: Record<string, {message: string}> | undefined = await register(values.email, values.password, values.passwordConfirm);
                        formikContext.setSubmitting(false);
                        if (errData) {
                            for (const [key, value] of Object.entries(errData)) {
                                formikContext.setFieldError(key, value?.message);
                            }

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
                    if (!values.password) {
                        errors.password = "Required";
                    } else if (values.password.length < 8) {
                        errors.password = "Password must be at least 6 characters";
                    }

                    if (!values.passwordConfirm) {
                        errors.passwordConfirm = "Required";
                    } else if (values.password !== values.passwordConfirm) {
                        errors.passwordConfirm = "Passwords do not match";
                    }

                    return errors;
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
                            
                            <fieldset>
                                <label className="font-bold" htmlFor="confirm-password">Confirm password</label>
                                <Field 
                                type="password" 
                                name="passwordConfirm"
                                id="confirm-password"
                                placeholder="*********************" 
                                className="
                                w-full
                                block py-1
                                rounded-md 
                                border-solid border-2 border-gray-300" />
                                <ErrorMessage className="error_message" name="passwordConfirm" component="div" />
                            </fieldset>

                            <div className="flex flex-col w-full">
                                <button
                                type="submit"
                                className="black-button w-full py-2"
                                disabled={!dirty || !isValid || isSubmitting}
                                >Register</button>

                                <IonRouterLink 
                                href="/login-email"
                                className="link"
                                >already have an account? log in</IonRouterLink>
                            </div>
                        </Form>
                    )}
                </Formik>
                </>
            </IonContent>
            <IonFooter>
                    <IonToast
                        message="New account created! You are being logged in."
                        color="success"
                        isOpen={showSuccess}
                        duration={3000} 
                        position="bottom"
                    />
            </IonFooter>
        </IonPage>
    );
}
