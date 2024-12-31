import { Link, useNavigate } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { useState } from 'react';
import { useFormik } from 'formik';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthRoutesEnum, PrivateRoutesEnum } from '@/data/routesEnums';
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';
import { UserLoginSchema } from '@contapp/shared';
import { TextField } from '../../components/text-field';
import useAuth from '../../hooks/useAuth';
import Services from '../../services';
import { toast } from '@/components/ui/use-toast';

export default function Signup() {

	const [loading, setLoading] = useState(false);

	const { values, errors, handleChange, handleSubmit } = useFormik({
		initialValues: { first_name: '', last_name: '', email: '', password: '' },
		validationSchema: toFormikValidationSchema(UserLoginSchema),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values) => {
			try {
				setLoading(true);
				const results = await Services.auth.register(values);
				console.log(results);
				setToken(results.data.token);
				navigate(PrivateRoutesEnum.Home);
				toast({
					description: (
						<div className="flex items-center justify-between w-full space-x-4">
							<span>Account created successful!</span>
							<Check className="text-green-600 ml-auto" />
						</div>
					),
				});
			} catch (e) {
				toast({
					description: (
						<div className="flex items-center justify-between w-full space-x-4">
							<span>User Already exist</span>
							<X className="text-red-600 ml-auto" />
						</div>
					),
				})
			} finally {
				setLoading(false);
			}
		},
	});

	const { setToken } = useAuth();
	const navigate = useNavigate();

	return (
		<div className="min-h-screen relative flex justify-center items-center bg-no-repeat bg-cover bg-slate-800 bg-[url('https://images.unsplash.com/photo-1720712738661-9c0dcb92f06d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]">
			<div className='absolute bg-black rounded-[50%] w-full h-full blur-[23rem]' />
			<div className='flex justify-center items-center z-20'>
				<div className='w-full'>
					<h1 className='text-6xl text-center font-bold text-white mb-16'>
						Contapp
					</h1>

					<Card className='w-96'>
						<CardHeader>
							<CardTitle>Sign up</CardTitle>
						</CardHeader>
						<CardContent>
							<form className='space-y-4' onSubmit={handleSubmit}>
								<div className='flex justify-center w-full items-center space-x-3'>
									<TextField
										className='w-full'
										name='first_name'
										placeholder='John'
										label='First Name'
										value={values.first_name}
										error={errors.first_name}
										onChange={handleChange}
										required
									/>
									<TextField
										className='w-full'
										name='last_name'
										placeholder='Doe'
										label='Last Name'
										value={values.last_name}
										error={errors.last_name}
										onChange={handleChange}
										required
									/>
								</div>
								<TextField
									type='email'
									placeholder='example@email.com'
									className='w-full'
									name='email'
									label='Email'
									value={values.email}
									error={errors.email}
									onChange={handleChange}
									required
								/>
								<TextField
									label='Password'
									className='w-full'
									name='password'
									type='password'
									placeholder='* * * * * * *'
									value={values.password}
									error={errors.password}
									onChange={handleChange}
									required
								/>
								<Button type='submit' className='w-full mt-4'>
									{loading ? 'Loading...' : 'Sign Up'}
								</Button>
							</form>
						</CardContent>
					</Card>

					<div className='text-center w-full text-white mt-3'>
						{'Do you have an account? '}
						<Link className='underline' to={AuthRoutesEnum.Login}>
							Log In
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
