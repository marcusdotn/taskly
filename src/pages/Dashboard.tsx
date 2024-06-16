import { IonAccordion, IonAccordionGroup, IonCheckbox, IonContent, IonHeader, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonSkeletonText, IonToolbar, useIonRouter, useIonToast } from "@ionic/react";
import pb from "../lib/pocketbase";
import { Dialog } from "@capacitor/dialog";
import { useEffect, useState } from "react";
import CreateUpdateTaskModal from "../components/CreateUpdateTaskModal";
import { Task } from "../lib/types";
import { RecordModel } from "pocketbase";
import { isEqualDateDay } from "../lib/date";


export default function DashboardHomePage() {
    const [present] = useIonToast();
    const ionRouter = useIonRouter();
    const userId: string = pb.authStore!.model!.id as unknown as string;
    const todayDate = new Date();
    const tmrwDate = new Date(todayDate);
    tmrwDate.setDate(todayDate.getDate() + 1);

    const [userData, setUserData] = useState<RecordModel>();

    const [tasks, setTasks] = useState<Task[]>([]);
    const categories: Record<string, Task[]> = {};

    if (tasks) {
        for (const task of tasks) {
            const key = (
                (isEqualDateDay(task.date, todayDate) && "Today")
                ||
                (isEqualDateDay(task.date, tmrwDate) && "Tomorrow")
                || 
                task.date.toDateString()
            );

            if (!categories.hasOwnProperty(key))
                categories[key] = [];
        
            categories[key].push(task);
        }
    }

    const [isNavigating, setIsNavigating] = useState(false);
    const [showCreateUpdateModal, setShowCreateUpdateModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task>();

    useEffect(() => {
        (async () => {
            if (!isNavigating && !pb.authStore.isValid) {
                (async () => {
                    await Dialog.alert({
                        title: "Invalid session",
                        message: "You're not logged in! Please go back and log in.",
                        buttonTitle: "Log in"
                    });
        
                    setIsNavigating(true);
                    ionRouter.push("/", "root", "replace");
                })();
        
                return null;
            }

            const data = await pb
                .collection("users")
                .getOne(userId);
            

            const tasksData = await pb
                .collection("tasks")
                .getFullList({
                    filter: `user ?~ '${userId}'`,
                    expand: "user"
                });

            setTasks((tasksData as unknown as Task[]).map(task => {
                return {...task, date: new Date(task.date)};
            }));
            setUserData(data);
        })();
    }, []);


    const handleDeleteTask = () => {
        const taskId = selectedTask!.id;

        (async () => {
            await pb.collection("tasks")
                .delete(taskId);
        })();

        setTasks(tasks.filter(task => task.id != taskId));
        setShowCreateUpdateModal(false);
        present({
            message: "Task deleted",
            color: "success",
            duration: 1500,
            position: "top"
        });
    }

    const handleSaveTask = (task: Partial<Task>) => {
        setShowCreateUpdateModal(false);
        if (task.title?.trim().length === 0) {
            present({
                message: "Task title cannot be empty",
                color: "danger",
                duration: 1500,
                position: "top"
            });

            return;
        }

        (async () => {
            if (task?.id) {
                await pb
                    .collection("tasks")
                    .update(task?.id, task);


                present({
                    message: "Task updated",
                    color: "success",
                    duration: 1500,
                    position: "top"
                });

                setTasks(tasks.filter(t => t.id != task.id).concat([task]));

                return;
            }

            await pb
                .collection("tasks")
                .create({
                    ...task,
                    user: userData!.id,
                    isDone: false
                });

            present({
                message: "Task created",
                color: "success",
                duration: 1500,
                position: "top"
            });

            setTasks([...tasks, task]);
        })();
    }

    const TaskListItem = ({task}: {task: Task}) => (
        <IonItem 
        onClick={() => {
            setSelectedTask(task);
            setShowCreateUpdateModal(true);
        }}
        className="flex flex-row justify-between py-2">
            <label className="w-full text-left">{task.title}</label>
            <IonCheckbox 
            disabled
            checked={task.isDone}
            style={{
                "--checkbox-background": "var(--ion-checkbox-background)",
                "--checkbox-background-checked": "var(--ion-checkbox-background-checked)",
                "--checkmark-color": "var(--ion-checkbox-checkmark-color)"
            }}
            />
        </IonItem>
    );

    return <>
    <IonPage className="text-center flex flex-col items-center">
        <IonHeader>
            <IonToolbar>
                <h1 className="font-bold text-2xl">Your tasks</h1>
            </IonToolbar>
        </IonHeader>
        <IonContent>
                {userData ? (
                    tasks?.length == 0 ? (
                        <div className="mt-20">
                            <h2 className="font-bold text-2xl">You have no tasks today.</h2>
                            <p className="text-gray-500 text-lg">Add a task to get started.</p>
                        </div>
                    ) : (
                        <IonAccordionGroup class="flex flex-col w-4/5 m-auto gap-6">
                            {
                                Object.keys(categories)
                                .sort((a, b) => a.length - b.length)
                                .map((categoryName, catIndex) => {
                                    const categoryTasks = categories[categoryName];

                                    return <IonAccordion
                                        key={catIndex}
                                    >
                                        <IonItem slot="header" className="
                                        text-center
                                        border-solid border-2 border-gray-300
                                        rounded-xl
                                        ">
                                            <IonLabel>{categoryName}</IonLabel>
                                        </IonItem>
                                        <div className="ion-padding" slot="content">
                                            <IonList>
                                                {categoryTasks.map((task, index) => <TaskListItem key={index} task={task} />)}
                                            </IonList>
                                        </div>
                                    </IonAccordion>
                                })
                            }
      
                        </IonAccordionGroup>
                    )
                ) : (
                    <IonList>
                        <IonListHeader>
                            <IonSkeletonText animated className="w-20" />
                        </IonListHeader>
                        <IonItem>
                            <IonSkeletonText animated />
                            <IonSkeletonText animated />
                            <IonSkeletonText animated />
                        </IonItem>
                    </IonList>
                )}
            <button 
            className="
            fixed bottom-20 left-1/2 -translate-x-1/2 
            h-14 w-14
            button black-button rounded-full 
            text-center text-3xl
            "
            onClick={() => setShowCreateUpdateModal(true)}
            >
                +
            </button>
        </IonContent>
    </IonPage>
    <CreateUpdateTaskModal 
        isOpen={showCreateUpdateModal}
        task={selectedTask}
        onClose={() => setShowCreateUpdateModal(false)}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
    />
    </>
}