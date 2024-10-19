import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/user/login';
import Signup from '../components/user/signup';
import LeadList from '../components/leads/leadslist';


const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <Signup />,
    },
    {
        path: '/leadslist',
        element: <LeadList />
    },

]);

export default router;