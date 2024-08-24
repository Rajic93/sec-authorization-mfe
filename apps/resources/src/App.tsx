import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import {BrowserRouter} from "react-router-dom";
import Resources from "./mfe/Resources.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Resources formConfig={{ navigateBackOnEdit: true }} />
        </BrowserRouter>
    </StrictMode>,
)
