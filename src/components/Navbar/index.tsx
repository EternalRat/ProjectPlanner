export function Navbar() {
    require("./index.css");
    return <div className="navbar">
        <div className="header">
            <div className="user">ze</div>
        </div>
        <hr></hr>
        <div className="sections">
            <div className="section">
                <span>Dashboard</span>
            </div>
            <div className="section">
                <span>Groups</span>
            </div>
            <div className="section">
                <span>Todo</span>
            </div>
        </div>
        <div className="footer">
            <div className="contact">?</div>
        </div>
    </div>;
}