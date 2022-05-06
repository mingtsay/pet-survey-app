// import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import {
  DashboardScreen,
  LoginScreen,
  PrivacyScreen,
  SurveyScreen,
  TermsScreen,
} from './screens'

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
        <Route
          path="terms"
          element={<TermsScreen />}
        />
        <Route
          path="privacy"
          element={<PrivacyScreen />}
        />
      </Routes>
    </BrowserRouter>
  </>
)

export default App
