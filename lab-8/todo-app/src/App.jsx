import './App.css'
import { useEffect, useState } from 'react'
import Login from './pages/Login'
import Todo from './pages/Todo';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if(savedUser) 
      setUser(savedUser);
  }, []);

  useEffect(() => {
    if(user){
      localStorage.setItem("user", user);
    }else{
      localStorage.removeItem("user");
    }
  }, [user]);

   const logout = () => {
    setUser(null);
  }

  return (
    <div className='app-container'>
      {user ? (
        <>
          <h3>Welcome, {user}</h3>
          <button onClick={logout}>Logout</button>
          <Todo />
        </>
      )  : (<Login onLogin={setUser} />)}
    </div>
  )
}

export default App
