import { useFormik } from 'formik';
import { Check, GalleryVerticalEnd, X } from 'lucide-react';
import { Link, useHistory } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { AuthRoutesEnum, PrivateRoutesEnum } from '@/data/routesEnums';
import useSEO from '@/hooks/use-seo';
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';
import { UserLoginSchema } from '@contapp/shared';
import { TextField } from '../../components/text-field';
import useAuth from '../../hooks/useAuth';
import Services from '../../services';

export default function Signup() {
	useSEO({
		title: 'Registro | Contapp',
		description:
			'Regístrate en Contapp, la solución para gestionar operaciones contables, balances y plan de cuentas.',
		keywords:
			'contapp, gestionar, operaciones, balances, plan de cuentas, registro',
	});
	const { setToken } = useAuth();
	const navigate = useHistory();

	const { values, errors, handleChange, handleSubmit, isSubmitting } =
		useFormik({
			initialValues: { first_name: '', last_name: '', email: '', password: '' },
			validationSchema: toFormikValidationSchema(UserLoginSchema),
			validateOnChange: false,
			validateOnBlur: false,
			onSubmit: async (values) => {
				try {
					const results = await Services.auth.register({
						...values,
						email: values.email.toLowerCase(),
					});
					setToken(results.data.tokens.token);

					await Services.firebase.signInWithCustomToken(
						results.data.tokens.fb_token,
					);

					await Services.firebase.logEvent('sign_up', {
						id: results.data.user.id,
					});
					navigate.push(PrivateRoutesEnum.Home);

					toast({
						description: (
							<div className='flex items-center justify-between w-full space-x-4'>
								<Check className='text-green-600 ml-auto' />
								<span>Cuenta creada exitosamente!</span>
							</div>
						),
					});
				} catch (e) {
					toast({
						description: (
							<div className='flex items-center justify-between w-full space-x-4'>
								<X className='text-red-600 ml-auto' />
								<span>El usuario ya existe</span>
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
						<CardTitle>Registro</CardTitle>
					</CardHeader>
					<CardContent>
						<form className='space-y-6' onSubmit={handleSubmit}>
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
								<TextField
									name='first_name'
									placeholder='John'
									label='Nombre'
									value={values.first_name}
									error={errors.first_name}
									onChange={handleChange}
									required
								/>
								<TextField
									name='last_name'
									placeholder='Doe'
									label='Apellido'
									value={values.last_name}
									error={errors.last_name}
									onChange={handleChange}
									required
								/>
							</div>

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
								{isSubmitting ? 'Cargando...' : 'Registrarse'}
							</Button>
						</form>
					</CardContent>
				</Card>

				<div className='text-center w-full mt-4'>
					{'Ya tienes una cuenta? '}
					<Link className='underline' to={AuthRoutesEnum.Login}>
						Iniciar Sesión
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
