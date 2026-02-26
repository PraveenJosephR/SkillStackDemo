import { useState, useEffect } from 'react';
import Login from './components/Login';
import MainApp from './components/MainApp';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isStaff, setIsStaff] = useState<number>(0);

  useEffect(() => {
    const storedLogin = localStorage.getItem('isLoggedIn');
    const storedStaff = localStorage.getItem('isStaff');

    if (storedLogin === 'true') {
      setIsLoggedIn(true);
      setIsStaff(Number(storedStaff));
    }
  }, []);

  const handleLogin = (staffValue: number) => {
    setIsLoggedIn(true);
    setIsStaff(staffValue);

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('isStaff', staffValue.toString());
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsStaff(0);

    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('isStaff');
  };

  return (
    <>
      {isLoggedIn ? (
        <MainApp onLogout={handleLogout} isStaff={isStaff} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;