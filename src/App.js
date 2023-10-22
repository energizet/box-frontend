import {BrowserRouter, Route, Routes} from "react-router-dom";
import Auth from "./components/Auth";
import Upload from "./components/Upload";
import Layout from "./components/Layout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route path="upload" element={<Upload/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
