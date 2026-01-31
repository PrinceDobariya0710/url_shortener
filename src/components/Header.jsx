import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from './ui/avatar';
import { LogOutIcon, LinkIcon } from 'lucide-react';
import { UrlState } from '@/Context';
import useFetch from '@/hooks/useFetch';
import { logout } from '@/db/apiAuth';
import { BarLoader } from 'react-spinners';

const Header = () => {
    const navigate = useNavigate();
    const { user, fetchUser } = UrlState();
    const { loading, fn: fnLogout } = useFetch(logout);

    return (
        <>
            <nav className='py-4 flex justify-between items-center'>
                <Link to="/">
                    <img src="/logo.png" alt="Trimmr Logo" className="h-16" />
                </Link>
                <div>{!user ?
                    <Button onClick={() => {
                        navigate("auth")
                    }}>
                        Login
                    </Button>
                    : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={user?.user_metadata?.profile_pic} alt="@shadcn" className="object-fit-content" />
                                    <AvatarFallback>PD</AvatarFallback>
                                    <AvatarBadge className="bg-green-600 dark:bg-green-800" />
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>{user?.user_metadata?.name}</DropdownMenuLabel>
                                </DropdownMenuGroup>
                                <DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Link to="/dashboard" className="flex items-center">
                                            <LinkIcon className="mr-2 h-4 w-4" />
                                            <span>My Links</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-400">
                                        <LogOutIcon className="mr-2 h-4 w-4" />
                                        <span onClick={() => {
                                            fnLogout().then(() => {
                                                fetchUser();
                                                navigate("/")
                                            })
                                        }}>
                                            Logout
                                        </span>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )
                }
                </div>

            </nav >
            {loading && <BarLoader color="#36d7b7" className='mb-4' width={"100%"} />}
        </>
    )
}

export default Header