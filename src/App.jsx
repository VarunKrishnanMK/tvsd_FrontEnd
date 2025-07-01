import { BrowserRouter, Route, Routes, useNavigate } from 'react-router'
import Login from './app/auth/Login'
import Mainlayout from './Manilayout'
import Dashboard from './app/dashboard/Dashboard'
import NotFound from './app/notFound/NotFound'
import Accounts from './app/account/Accounts'
import Payment from './app/payments/Payment'
import { userContext } from './contexts/UserContext'
import { useContext } from 'react'
import Loader from './components/Loader'

function App() {
  const { loader } = useContext(userContext);

  return (
    <BrowserRouter>
      {loader && <Loader />}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />

        <Route element={<Mainlayout />} >
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/account' element={<Accounts />} />
          <Route path='/payment' element={<Payment />} />
        </Route>

        <Route path='*' element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App
