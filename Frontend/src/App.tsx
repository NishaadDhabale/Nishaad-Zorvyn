
import { Layout } from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {


  return (
    <>
    <div className="min-h-screen flex">


       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout>
        <Dashboard />
      </Layout>} />
  
      </Routes>
    </BrowserRouter>
    </div>
    </>
  )
}

export default App
