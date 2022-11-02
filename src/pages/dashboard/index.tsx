import { Navbar } from "../../components/Navbar";

export function Dashboard() {
    require("./index.css");
    return <div className="app">
        <Navbar></Navbar>
        <div className="content"></div>
    </div>;
}