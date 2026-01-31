import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '@/components/Login';
import SignUp from '@/components/SignUp';
import { useNavigate } from 'react-router-dom';
import { UrlState } from '@/Context';
import RequireAuth from '@/components/RequireAuth';

const Auth = () => {
    const [searchParams] = useSearchParams();
    const longLink = searchParams.get('createNew');
    const navigate = useNavigate();
    const { isAuthenticated, loading } = UrlState();

    useEffect(() => {
        if (isAuthenticated && !loading) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
        }
    }, [isAuthenticated, loading, navigate])

    return (
        <div className='mt-36 flex flex-col items-center gap-10'>
            <h1 className='text-5xl font-extrabold'>
                {searchParams.get('createNew') ? "Hold on! Let's create your account to shorten the URL." : "Login / SignUp to continue"}
            </h1>
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">SignUp</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Login />
                </TabsContent>
                <TabsContent value="signup">
                    <SignUp />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Auth