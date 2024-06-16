import { IonButton, IonDatetime, IonInput, IonModal, IonTextarea } from "@ionic/react";
import { useEffect, useState } from "react";
import { Task } from "../lib/types";
import { isEqualDateDay, tomorrrowDate } from "../lib/date";
import { Dialog } from "@capacitor/dialog";

interface ToggleButtonProps {
    isToggled: boolean
    onClick: () => void
    className?: string
    children?: React.ReactNode
}

interface CreateUpdateTaskModalProps {
    isOpen: boolean
    task?: Task
    onClose: () => void
    onDelete: () => void
    onSave: (task: Task | Partial<Task>) => void | undefined
}

export default function CreateUpdateTaskModal({task, ...props}: CreateUpdateTaskModalProps) {
    const todayDate = new Date();
    const tmrwDate = tomorrrowDate();

    const [activeDate, setActiveDate] = useState<Date | null>(todayDate);
    const [showDateTime, setShowDateTime] = useState(false);

    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (!task) return;

        setTitle(task.title);
        setNotes(task.note);
        setIsDone(task.isDone);
        setActiveDate(task.date);
    }, [task]);

    const handleDelete = () => {
        Dialog.confirm({
            title: "Delete task",
            message: "Are you sure you want to delete this task?",
            okButtonTitle: "Delete"
        }).then(value => {
            if (value) {
                props.onDelete();
            }
        });

    }

    const handleSave = () => {
        props.onSave({
            id: task?.id,
            date: activeDate as Date,
            title: title,
            note: notes,
            isDone: isDone
        });
    }

    const ToggleButton = ({isToggled, onClick, children}: ToggleButtonProps) => (
        <IonButton
        color={isToggled ? "light" : "dark"}
        onClick={onClick}
        >
            {children}
        </IonButton>
    )

    return <IonModal 
    onDidDismiss={props.onClose}
    isOpen={props.isOpen}
    initialBreakpoint={1}
    breakpoints={[0, 1]}
    style={{
        "--height": "50%"
    }}
    >
        {props.isOpen ? (
            <div className="flex flex-col ion-padding">
                <div className="flex flex-row justify-between">
                    {task != null ? (
                        <button 
                        onClick={handleDelete}
                        className="text-red-500 bg-transparent"
                        >Delete</button>
                    ) : <span />}


                    <button 
                    onClick={handleSave}
                    className="text-blue-500 bg-transparent"
                    >Save</button>
                </div>

                <div className="flex flex-col gap-8 w-full">
                    <div className="flex flex-col gap-2">
                        <IonInput 
                        type="text"
                        placeholder="Walk the dog..."
                        className="text-xl w-full" 
                        onIonChange={(e) => setTitle(e.detail?.value as string)}
                        value={title}
                        />

                        <ul className="flex flex-row gap-1">
                            <ToggleButton 
                            isToggled={isEqualDateDay(activeDate, todayDate)}
                            onClick={() => setActiveDate(todayDate)}
                            >
                                Today
                            </ToggleButton>

                            <ToggleButton 
                            isToggled={isEqualDateDay(activeDate, tmrwDate)}
                            onClick={() => {
                                setActiveDate(tmrwDate);
                            }}
                            >
                                Tomorrow
                            </ToggleButton>

                            <ToggleButton 
                            className="flex flex-row gap-4 items-center"
                            isToggled={!isEqualDateDay(activeDate, tmrwDate) && !isEqualDateDay(activeDate, todayDate)}
                            onClick={() => setShowDateTime(true)}
                            >
                                <svg className="stroke-white stroke" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1V3H15V1H17V3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9ZM20 11H4V19H20V11ZM7 5H4V9H20V5H17V7H15V5H9V7H7V5Z" fill="black"/>
                                </svg>

                                Specific date
                            </ToggleButton>
                        </ul>
                    </div>

                    <IonModal
                    initialBreakpoint={0.5}
                    isOpen={showDateTime}
                    onDidDismiss={() => setShowDateTime(false)}
                    >
                        <IonDatetime
                        style={{
                            "--background": "--ion-datetime-background"
                        }}
                        min={todayDate.toDateString()}
                        showDefaultTimeLabel={false}
                        presentation="date"
                        value={activeDate?.toISOString()}
                        onIonChange={e => {
                            setActiveDate(new Date(e.detail.value as string));
                            setShowDateTime(false)
                        }}
                        />
                    </IonModal>
                </div>

                <div className="flex flex-col w-full mt-10">
                    <label>Notes</label>
                    <IonTextarea
                    rows={4}
                    placeholder="Remember to walk the dog later..."
                    onIonChange={(e) => setNotes(e.detail?.value as string)}
                    className="
                    border-solid border-2 border-gray-300
                    rounded-md
                    "
                    value={notes}
                    />
                </div>

                {!!task && (
                    <button
                    onClick={() => setIsDone(!isDone)}
                    className={`
                    mt-5
                    border-solid border-2
                    ${isDone ? "text-green-500 border-green-500" : "text-gray-500 border-gray-400"}
                    px-5
                    py-1
                    rounded-md
                    duration-200
                    `}
                    >
                        {isDone ? (
                            <span className="flex flex-row gap-3 duration-200">
                                <svg className="inline w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"></path></svg>
                                Done
                            </span>)
                             : (
                            <span className="flex flex-row gap-3 duration-200">
                                <svg className="inline w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM5 5V19H19V5H5Z"></path></svg>
                                Not done
                            </span>
                            )}
                    </button>
                )}
            </div>
        ) : (
            <div></div>
        )}
    </IonModal>
}