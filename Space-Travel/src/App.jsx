import './App.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

// Layouts
import RootLayout from './layouts/RootLayout';

// Pages
import HomePage from './pages/HomePage';
import SpacecraftsPage from './pages/SpacecraftsPage';
import SpacecraftPage from './pages/SpacecraftPage';
import ConstructionPage from './pages/ConstructionPage';
import PlanetsPage from './pages/PlanetsPage';

// Contexts
import AppProvider from './providers/AppProvider';

// Routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route index element= {<HomePage/>}/>
      <Route path='spacecrafts' element= {<SpacecraftsPage/>}/>
      <Route path=':spacecraftId' element= {<SpacecraftPage/>}/>
      <Route path='new-spacecraft' element= {<ConstructionPage/>}/>
      <Route path='planets' element= {<PlanetsPage/>}/>
      <Route path='*' element= {<HomePage/>}/> 
    </Route>
  )
)

const App = () => {

  return (
    <AppProvider>
      <RouterProvider router={router}/>
    </AppProvider>          
  );
}

export default App
