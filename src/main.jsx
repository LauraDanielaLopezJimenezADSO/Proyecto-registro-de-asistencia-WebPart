import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {AuthProvider} from "./context/API/APISessionManager/userSession.jsx";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { esES } from '@mui/x-date-pickers/locales';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDateFns} localeText={esES.components.MuiLocalizationProvider.defaultProps.localeText}>
          <AuthProvider>
              <App />
          </AuthProvider>
      </LocalizationProvider>
  </React.StrictMode>,
)
