import React, { useEffect } from 'react'
import { useState } from 'react'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input'
import { Button } from './ui/button'
import { BeatLoader } from 'react-spinners'
import Error from './Error'
import * as Yup from 'yup';
import useFetch from '@/hooks/useFetch'
import { login } from '@/db/apiAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { UrlState } from '@/Context'

const Login = () => {

    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const longLink = searchParams.get('createNew');

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(
            (prevData) => ({
                ...prevData,
                [name]: value
            })
        )
    }
    const { loading, error, fn: fnLogin, data } = useFetch(login, formData);
    const { fetchUser } = UrlState();
    const handleLogin = async () => {
        setErrors([]);
        // Handle login logic here
        try {
            const schema = Yup.object().shape({
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            });
            await schema.validate(formData, { abortEarly: false });
            await fnLogin();
            // If validation passes, proceed with login with api call
        } catch (error) {
            const newErrors = {};

            error?.errors?.forEach((err) => {
                newErrors[err.path] = err.message;
            });
            setErrors(newErrors);
        }
    }

    useEffect(() => {
        // console.log(data);
        if (error === null && data) {
            navigate(`/dashboard?${longLink ? `createNew=${longLink}` : ''}`);
            fetchUser();
        }
    }, [data, error]);
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account
                    </CardTitle>
                    <CardDescription>Enter your email below to login to your account
                    </CardDescription>
                    <CardAction>SignUp</CardAction>
                    {error && <Error message={error.message} />}
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
                        {errors.email && <Error message={errors.email} />}
                    </div>
                    <div className="space-y-1">
                        <Input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
                        {errors.password && <Error message={errors.password} />}
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleLogin}>
                        {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Login