import { UrlState } from '@/Context'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners'


function RequireAuth({ children }) {
    const { isAuthenticated, loading } = UrlState();
    const navigate = useNavigate();

    useEffect(() => {
        if (loading === false && !isAuthenticated) {
            navigate('/auth');
        }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
        return (
            <div className='flex h-screen w-full items-center justify-center'>
                <BarLoader color="#36d7b7" />
            </div>
        )
    }

    if (isAuthenticated) {
        return children;
    }

    return null;
}

export default RequireAuth