import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Check, X } from 'lucide-react';

import { TextField } from '@/components/text-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthRoutesEnum, PrivateRoutesEnum } from '@/data/routesEnums';
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';
import { UserLoginSchema } from '@contapp/shared';
import useAuth from '../../hooks/useAuth';
import Services from '../../services';
import { toast } from '@/components/ui/use-toast';


export default function Login() {
	const { setToken } = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const { values, errors, handleChange, handleSubmit } = useFormik({
		initialValues: { email: '', password: '' },
		validationSchema: toFormikValidationSchema(UserLoginSchema),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			try {
				setLoading(true);
				const results = await Services.auth.login(values);
				setToken(results.data.token);
				navigate(PrivateRoutesEnum.Home);
				toast({
					description: (
						<div className="flex items-center justify-between w-full space-x-4">
							<span>Login Successful!</span>
							<Check className="text-green-600 ml-auto" />
						</div>
					),
				});
			} catch (e) {
				toast({
					description: (
						<div className="flex items-center justify-between w-full space-x-4">
							<span>Invalid credentials</span>
							<X className="text-red-600 ml-auto" />
						</div>
					),
				})
				console.error(e);
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<div className="min-h-screen relative flex justify-center items-center bg-no-repeat bg-cover bg-slate-800 bg-[url('https://images.unsplash.com/photo-1720712738661-9c0dcb92f06d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
			<div className='absolute bg-black rounded-[50%] w-full h-full blur-[23rem]' />
			<div className='flex justify-center items-center z-20'>
				<div className='w-full'>
					<h1 className='text-6xl text-center font-bold text-white mb-16'>
						ContApp
					</h1>

					<Card className='w-96'>
						<CardHeader>
							<CardTitle>Login</CardTitle>
						</CardHeader>
						<CardContent>
							<form className='space-y-4' onSubmit={handleSubmit}>
								<TextField
									type='email'
									placeholder='example@email.com'
									className='w-full'
									autoComplete='email'
									name='email'
									label='Email Address'
									value={values.email}
									onChange={handleChange}
									error={errors.email}
									required
								/>

								<TextField
									className='w-full'
									name='password'
									type='password'
									autoComplete='current-password'
									label='Password'
									placeholder='* * * * * * *'
									value={values.password}
									error={errors.password}
									onChange={handleChange}
									required
								/>
								<Button type='submit' className='w-full mt-4'>
									{loading ? 'Loading...' : 'Login'}
								</Button>
							</form>
						</CardContent>
					</Card>
					<div className='text-center w-full text-white mt-3'>
						{'Do you not have an account? '}
						<Link className='underline' to={AuthRoutesEnum.Signup}>
							Sign Up
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
