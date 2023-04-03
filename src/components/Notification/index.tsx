import { useEffect, useState } from "react";

interface INotif {
    header: string;
    body: string;
    additionnalClass: string;
    timer: number;
    setNotification: any;
}

export function Notification({timer, header, body, additionnalClass, setNotification}: INotif) {
    require("./index.css");
    const [progress, setProgress] = useState<Number>(0);
    const [erase, setErase] = useState<Boolean>(false);

    useEffect(() => {
        let prog = 0;
        let interval = setInterval(() => {
            setProgress(prog * 100 / timer);
            prog += 0.1;
            if (prog >= timer)
                setErase(true);
        }, 100);
        return () => {
            setTimeout(() => {
                clearInterval(interval);
                setNotification(false);
            }, timer * 1000)
        }
    }, [setNotification, timer]);

    return <div className={`app-notification ${additionnalClass ? additionnalClass : ""}`}>
            <div className={`notification ${erase === true ? "erased" : ""}`}>
                <div className="notification-header">
                    <div className="notification-header-text">
                        {header}
                    </div>
                </div>
                <hr className="separator"></hr>
                <div className="notification-body">
                    <div className="notification-body-text">
                        {body}
                    </div>
                </div>
                <div className="notification-progress-bar">
                    <div className="notification-progress-bar-fill" style={{width: `${progress}%`}}></div>
                </div>
            </div>
        </div>;
}