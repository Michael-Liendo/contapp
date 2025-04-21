import { SocialLogin } from '@capgo/capacitor-social-login';
import { useFormik } from 'formik';
import { Check, GalleryVerticalEnd, X } from 'lucide-react';
import { Link, useHistory } from 'react-router-dom';

import Divider from '@/components/divider';
import GoogleIcon from '@/components/icons/google';
import { TextField } from '@/components/text-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { EnvConfig } from '@/config/env';
import { AuthRoutesEnum, PrivateRoutesEnum } from '@/data/routesEnums';
import useSEO from '@/hooks/use-seo';
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';
import { type ISignInWithProvider, UserLoginSchema } from '@contapp/shared';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import Services from '../../services';

export default function LoginPage() {
	useSEO({
		title: 'Inicio de sesión',
		description:
			'Inicie sesión en Contapp, la solución para gestionar operaciones contables, balances y plan de cuentas.',
		keywords:
			'contapp, gestionar, operaciones, balances, plan de cuentas, login',
	});
	const { setToken } = useAuth();
	const navigate = useHistory();

	const { values, errors, handleChange, handleSubmit, isSubmitting } =
		useFormik({
			initialValues: { email: '', password: '' },
			validationSchema: toFormikValidationSchema(UserLoginSchema),
			validateOnChange: false,
			validateOnBlur: false,
			onSubmit: async (values) => {
				try {
					const results = await Services.auth.login({
						email: values.email.toLowerCase(),
						password: values.password,
					});
					setToken(results?.data?.token);

					await Services.firebase.signInWithCustomToken(results.data.fb_token);

					await Services.firebase.logEvent('dashboard_login', {
						email: values.email,
					});

					toast({
						description: (
							<div className='flex items-center justify-between w-full space-x-4'>
								<Check className='text-green-600 ml-auto' />
								<span>Inicio de sesión exitoso!</span>
							</div>
						),
					});

					navigate.push(PrivateRoutesEnum.Home);
				} catch (e) {
					toast({
						description: (
							<div className='flex items-center justify-between w-full space-x-4'>
								<X className='text-red-600 ml-auto' />
								<span>Credenciales inválidas</span>
							</div>
						),
					});
					console.error(e);
				}
			},
		});

	useEffect(() => {
		SocialLogin.initialize({
			google: {
				webClientId: EnvConfig().googleWebClientId,
			},
		});
	}, []);

	const googleSignIn = async () => {
		const res = await SocialLogin.login({
			provider: 'google',
			options: { scopes: ['email', 'profile'], forceRefreshToken: true },
		});

		const results = await Services.auth.signInWithProvider(
			res as unknown as ISignInWithProvider,
		);

		setToken(results.data.token);

		await Services.firebase.signInWithCustomToken(results.data.fb_token);

		await Services.firebase.logEvent('login_with_provider', {
			provider: 'google',
		});

		toast({
			description: (
				<div className='flex items-center justify-between w-full space-x-4'>
					<Check className='text-green-600 ml-auto' />
					<span>Inicio de sesión exitoso!</span>
				</div>
			),
		});

		navigate.push(PrivateRoutesEnum.Home);
	};

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
					Inicie sesión y simplifique su gestión financiera
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
								label='Correo'
								value={values.email}
								error={errors.email}
								onChange={handleChange}
								required
							/>

							<TextField
								type='password'
								name='password'
								placeholder='* * * * * * *'
								label='Contraseña'
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
								{isSubmitting ? 'Cargando...' : 'Entrar'}
							</Button>
						</form>
						<Divider className='mt-4'>continua con</Divider>
						<div className='flex items-center justify-center gap-4'>
							<Button variant={'ghost'} size={'icon'} onClick={googleSignIn}>
								<GoogleIcon />
							</Button>
						</div>
					</CardContent>
				</Card>

				<div className='text-center w-full mt-4'>
					{'No tienes una cuenta? '}
					<Link className='underline' to={AuthRoutesEnum.Signup}>
						Regístrate
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
