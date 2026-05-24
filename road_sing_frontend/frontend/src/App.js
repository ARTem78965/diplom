import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'

import Home from './pages/Home'

import Road from './pages/roads/Roads'
import AddRoad from './pages/roads/AddRoad'
import EditRoad from './pages/roads/EditRoad'

import Sing from './pages/sings/Sings'
import AddSing from './pages/sings/AddSing'
import EditSing from './pages/sings/EditSing'

import RoadsSings from './pages/roads_sings/RoadsSings'
import AddRoadSing from './pages/roads_sings/AddRoadSing'
import EditRoadSing from './pages/roads_sings/EditRoadSing'

import Crossroads from './pages/crossroads/Crossroads'
import AddCrossroad from './pages/crossroads/AddCrossroad'
import EditCrossroad from './pages/crossroads/EditCrossroad'
import CrossroadRoadSing from './pages/crossroads/CrossroadRoadSing'
import AddCrossroadRoadSing from './pages/crossroads/AddCrossroadRoadSing'
import EditCrossroadRoadSing from './pages/crossroads/EditCrossroadRoadSing'

import Localities from './pages/localities/Localities'
import AddLocality from './pages/localities/AddLocality'
import EditLocality from './pages/localities/EditLocality'
import LocalitiesCrossroads from './pages/localities/LocalitiesCrossroads'
import AddLocalityCrossroad from './pages/localities/AddLocalityCrossroad'
import EditLocalityCrossroad from './pages/localities/EditLocalityCrossroad'

import Auth from './pages/auth/Auth'
import Users from './pages/users/User'
import AddUser from './pages/users/AddUser'
import EditUser from './pages/users/EditUser'
import Privilege from './pages/privileges/Privilege'

import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to='/login' replace />} />

        <Route path='/login' element={<Auth />} />

        <Route path='/main' element={<Home />} />

        <Route path='/users' element={<Users />} />
        <Route path='/user/add' element={<AddUser />} />
        <Route path='/user/edit/:id' element={<EditUser />} />
        <Route path='/privileges' element={<Privilege />} />

        <Route path='/roads' element={<Road />} />
        <Route path='/road/add' element={<AddRoad />} />
        <Route path='/road/edit/:id' element={<EditRoad />} />
        <Route path='/sings' element={<Sing />} />
        <Route path='/sing/add' element={<AddSing />} />
        <Route path='/sing/edit/:id' element={<EditSing />} />
        <Route path='/roads/sings' element={<RoadsSings />} />
        <Route path='/road/sing/add' element={<AddRoadSing />} />
        <Route path='/road/sing/edit/:id' element={<EditRoadSing />} />

        <Route path='/crossroads' element={<Crossroads />} />
        <Route path='/crossroad/add' element={<AddCrossroad />} />
        <Route path='/crossroad/edit/:id' element={<EditCrossroad />} />
        <Route path='/crossroads/roads/sings' element={<CrossroadRoadSing />} />
        <Route path='/crossroad/road/sing/add' element={<AddCrossroadRoadSing />} />
        <Route path='/crossroad/road/sing/edit/:id' element={<EditCrossroadRoadSing />} />

        <Route path='/localities' element={<Localities />} />
        <Route path='/locality/add' element={<AddLocality />} />
        <Route path='/locality/edit/:id' element={<EditLocality />} />
        <Route path='/localities/crossroads/roads/sings' element={<LocalitiesCrossroads />} />
        <Route path='/locality/crossroad/road/sing/add' element={<AddLocalityCrossroad />} />
        <Route path='/locality/crossroad/road/sing/edit/:id' element={<EditLocalityCrossroad />} />
      </Routes>
    </Router>
  );
}

export default App;
