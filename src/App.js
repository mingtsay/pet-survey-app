// import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { DashboardScreen, LoginScreen, SurveyScreen } from './screens'

const App = () => (
  <>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<SurveyScreen />}
        />
        <Route
          path="login"
          element={<LoginScreen />}
        />
        <Route
          path="dashboard"
          element={<DashboardScreen />}
        />
      </Routes>
    </BrowserRouter>
  </>
)

export default App
