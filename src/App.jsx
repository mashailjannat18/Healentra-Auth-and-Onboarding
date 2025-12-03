import React from 'react';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { authStore } from './redux/store/authStore';
import SignUp from './app/(auth)/signup/SignUp';
import Login from './app/(auth)/login/Login';
import Home from './app/(home)/Home';

function App() {
  return (
    <Provider store={authStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Toaster 
          position="top-center" 
          richColors 
          closeButton 
          expand={true}
        />
      </BrowserRouter>
    </Provider>
  );
}

export default App;