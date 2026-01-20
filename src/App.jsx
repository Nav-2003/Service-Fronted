import SearchResultPage from './componets/SearchResultPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './MainLayout'
import Home from './Home'
import WorkerSignupForm from './ServiceComponent/WorkerSignUpForm'
import WorkerWaitingForCustomer from './ServiceComponent/WorkerWaitingForCustomer'
import LiveTrackingMap from './TrackingSystem/Livetracking'
import Services from './HeaderComponent/Services'
import HowItWorks from './HeaderComponent/HowItWork'
import AboutUs from './HeaderComponent/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/howitwork" element={<HowItWorks/>} />
          <Route path="/search" element={<SearchResultPage />} />
          <Route path="/about" element={<AboutUs/>} />
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
