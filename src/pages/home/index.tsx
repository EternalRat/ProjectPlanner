import { Header } from "../../components/Header/Header";

export function Home() {
    require("./index.css");
    return <div className="app">
        <Header></Header>
        <div className="content"></div>
    </div>;
}