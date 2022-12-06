import { User } from "../utils/interfaces";

interface props {
    user: User;
}

export function ProfileView(props: props) {
    return <div className="profile-view">
        <div className="profile-content">
            <div className="profile-avatar">
                {/* <img  */}
            </div>
            <div className="profile-informations"></div>
        </div>
    </div>;
}