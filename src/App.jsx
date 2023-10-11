import TodoList from './components/TodoList'
import './App.css'
import TabApp from './components/TabApp'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TabApp />
    </LocalizationProvider>
  )
}

export default App