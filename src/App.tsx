import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListResources from "./pages/ListResources.tsx";
import ResourcesCreate from "./pages/CreateResource.tsx";
import ResourcesEdit from "./pages/EditResources.tsx";
import PageLayout from "./templates/PageLayout";

const App = () => (
    <BrowserRouter>
        <PageLayout>
            <Routes>
                <Route path="/" element={"Welcome to authorization"}/>
                <Route path="/resources" element={<ListResources/>}/>
                <Route path="/resources/create" element={<ResourcesCreate/>}/>
                <Route path="/resources/:id" element={<ResourcesEdit/>}/>
            </Routes>
        </PageLayout>
    </BrowserRouter>
);

export default App
