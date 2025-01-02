import { useFormik } from 'formik';
import { Check, GalleryVerticalEnd, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { TextField } from '@/components/text-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { AuthRoutesEnum, PrivateRoutesEnum } from '@/data/routesEnums';
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';
import { UserLoginSchema } from '@contapp/shared';
import useAuth from '../../hooks/useAuth';
import Services from '../../services';

export default function LoginPage() {
	const { setToken } = useAuth();
	const navigate = useNavigate();

	const { values, errors, handleChange, handleSubmit, isSubmitting } =
		useFormik({
			initialValues: { email: '', password: '' },
			validationSchema: toFormikValidationSchema(UserLoginSchema),
			validateOnChange: false,
			validateOnBlur: false,
			onSubmit: async (values) => {
				try {
					const results = await Services.auth.login(values);
					setToken(results.data.token);
					navigate(PrivateRoutesEnum.Home);
					toast({
						description: (
							<div className='flex items-center justify-between w-full space-x-4'>
								<Check className='text-green-600 ml-auto' />
								<span>Login Successful!</span>
							</div>
						),
					});
				} catch (e) {
					toast({
						description: (
							<div className='flex items-center justify-between w-full space-x-4'>
								<X className='text-red-600 ml-auto' />
								<span>Invalid credentials</span>
							</div>
						),
					});
					console.error(e);
				}
			},
		});

	return (
		<div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
			<div className='flex flex-col justify-center items-center p-8'>
				<div className='flex items-center gap-2 font-medium'>
					<div className='flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground'>
						<GalleryVerticalEnd className='size-4' />
					</div>
					<h1 className='text-xl font-bold'>ContApp</h1>
				</div>
				<br />
				<p className='text-lg mb-10 text-center'>
					Unase a nosotros y simplifique su gestión financiera
				</p>

				<Card className='w-full max-w-md'>
					<CardHeader>
						<CardTitle>Inicio de sesión</CardTitle>
					</CardHeader>
					<CardContent>
						<form className='space-y-6' onSubmit={handleSubmit}>
							<TextField
								type='email'
								name='email'
								placeholder='example@email.com'
								label='Email Address'
								value={values.email}
								error={errors.email}
								onChange={handleChange}
								required
							/>

							<TextField
								type='password'
								name='password'
								placeholder='* * * * * * *'
								label='Password'
								value={values.password}
								error={errors.password}
								onChange={handleChange}
								required
							/>

							<Button
								type='submit'
								className='w-full mt-4'
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Loading...' : 'Login'}
							</Button>
						</form>
					</CardContent>
				</Card>

				<div className='text-center w-full mt-4'>
					{"Don't have an account? "}
					<Link className='underline' to={AuthRoutesEnum.Signup}>
						Sign Up
					</Link>
				</div>
			</div>

			<div className='relative hidden bg-muted lg:block'>
				<img
					src='https://images.unsplash.com/photo-1720712738661-9c0dcb92f06d?q=80&w=2070&auto=format&fit=crop'
					alt='Background'
					className='absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale'
				/>
			</div>
		</div>
	);
}
