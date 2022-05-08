// import ReactDOM from 'react-dom/client'
import { HashRouter, Route, Routes } from 'react-router-dom'

import {
  DashboardScreen,
  LoginScreen,
  PrivacyScreen,
  SurveyScreen,
  TermsScreen,
} from './screens'

const App = () => (
  <>
    <HashRouter>
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
    </HashRouter>
  </>
)

export default App
