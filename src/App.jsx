import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import ProfileProvider from './context/ProfileProvider';
import CheckInProvider from './context/CheckInProvider';

const App = () => {
  return (
    <ProfileProvider>
      <CheckInProvider>
        <Outlet />
        <Footer />
      </CheckInProvider>
    </ProfileProvider>
  );
};

export default App;
