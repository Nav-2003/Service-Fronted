import SearchResultPage from './componets/SearchResultPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './MainLayout'
import Home from './Home'
import WorkerSignupForm from './ServiceComponent/WorkerSignUpForm'
import WorkerWaitingForCustomer from './ServiceComponent/WorkerWaitingForCustomer'
import LiveTrackingMap from './TrackingSystem/Livetracking'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/service/workerDetail" element={<WorkerSignupForm/>}/>
          <Route path='/service/waitingRoom' element={<WorkerWaitingForCustomer/>}/>
          <Route path='/serivice/liveTracking' element={<LiveTrackingMap/>}/>
           <Route path='search/serivice/liveTracking' element={<LiveTrackingMap/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
