import './App.css'
import {BrowserRouter} from "react-router-dom";
import PageLayout from "./templates/PageLayout";
import Resources from "./mfe/Resources.tsx";

const App = () => (
    <BrowserRouter>
        <PageLayout>
            <Resources />
        </PageLayout>
    </BrowserRouter>
);

export default App
