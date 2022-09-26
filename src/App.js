import './App.css';
import AuthenticatedApp from './components/AuthenticatedApp';
import UnauthenticatedApp from './components/UnauthenticatedApp';
import { useAuth } from './hooks/useAuth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Landing } from './components/Landing';
import { ChatRoom } from './components/ChatRoom';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '/room/:id',
    element: <ChatRoom />,
  },
]);

function App() {
  const { user } = useAuth();

  return (
    <div className='container'>
      <h1>💬 Chat Room</h1>
      {user ? (
        <RouterProvider router={routes}>
          <AuthenticatedApp />
        </RouterProvider>
      ) : (
        <UnauthenticatedApp />
      )}
    </div>
  );
}

export default App;
