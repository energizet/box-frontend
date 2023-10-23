import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import Upload from "./components/Upload";
import Layout from "./components/Layout";
import File from "./components/File";

function App() {
    return (
        <RouterProvider router={createBrowserRouter(
            createRoutesFromElements(
                <Route path="/" element={<Layout/>}>
                    <Route path="upload" element={<Upload/>}/>
                    <Route path="file/:id" element={<File/>}
                           loader={({params}) => File.loader(params)}
                    />
                </Route>
            )
        )}/>
    );
}

export default App;
