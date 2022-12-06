import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import apiClass from "../../utils/api.class";
import { VIEW } from "../../utils/enum";
import { User } from "../../utils/interfaces";
import { ContactView } from "../../views/ContactView";
import { DashboardView } from "../../views/DashboardView";
import { GroupsView } from "../../views/GroupsView";
import { ProfileView } from "../../views/ProfileView";
import { TodosView } from "../../views/TodosView";

export function Dashboard() {
    require("./index.css");
    const [cookies, setCookie] = useCookies(['token']);
    const [view, setView] = useState<VIEW>(VIEW.DASHBOARD);
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    let page;
    
    useEffect(() => {
        apiClass.getUserDetails(cookies).then(({data}) => {
            setUser(data);
            setLoading(false);
        }).catch(err => {
            if (err.response && err.response.status === 401) {
                setLoading(false);
                setError(true);
            }
        });
    }, [cookies]);
    if (loading) {
        return <></>;
    }
    if (error) {
        return <Navigate to="/login"></Navigate>;
    }
    if (view === VIEW.DASHBOARD) {
        page = <DashboardView user={user!}></DashboardView>;
    } else if (view === VIEW.GROUPS) {
        page = <GroupsView></GroupsView>;
    } else if (view === VIEW.PROFILE) {
        page = <ProfileView user={user!}></ProfileView>
    } else if (view === VIEW.TODOS) {
        page = <TodosView></TodosView>
    } else if (view === VIEW.CONTACT) {
        page = <ContactView></ContactView>
    }
    return <div className="app">
        <Navbar setView={setView} user={user!}></Navbar>
        <div className="content">
            {page}
        </div>
    </div>;
}