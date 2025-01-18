import { TextField } from '@/components/text-field';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import useAuth from '@/hooks/useAuth';
import Services from '@/services';
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';
import { UserForUpdateSchema } from '@contapp/shared';
import { useFormik } from 'formik';
import { Check, PencilLine } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
	const { user } = useAuth();

	// cambiar nombre a uno mejor, mas semantico
	const [inputView, setInputView] = useState({
		email: false,
		first_name: false,
		last_name: false,
	});

	const { values, handleChange, handleSubmit } = useFormik({
		initialValues: {
			first_name: user?.first_name,
			last_name: user?.last_name,
			email: user?.email,
			password: undefined,
			old_password: undefined,
		},
		validationSchema: toFormikValidationSchema(UserForUpdateSchema),
		onSubmit: async (values) => {
			const updated = await Services.users.update(values);

			toast({
				title: 'Tu usuario fue actualizado',
			});

			console.log(updated);
		},
	});

	return (
		<Card>
			<CardHeader>
				<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm mb-2'>
					<Avatar className='h-28 w-28 rounded-lg'>
						<AvatarImage alt={user?.first_name} />
						<AvatarFallback className='rounded-l'>
							{user?.first_name.at(0)}
							{user?.last_name.at(0)}
						</AvatarFallback>
					</Avatar>
				</div>
				<CardTitle>Hola, {user?.first_name}</CardTitle>
				<p className='opacity-50'>Edita tu información de perfil</p>
			</CardHeader>
			<form id='create-company' noValidate onSubmit={handleSubmit}>
				<CardContent>
					<div className='flex flex-wrap gap-5'>
						<div className='flex gap-1 w-full sm:w-full lg:w-[35%] space-y-6'>
							<TextField
								label='Correo'
								type='text'
								id='user_email'
								placeholder={user?.email}
								// todo: y esto a los otros input
								readOnly={!inputView.email}
							/>
							<Button
								variant='outline'
								size='icon'
								type='button'
								onClick={() => {
									//hacer esto con los demas, first_name last_name
									setInputView({ ...inputView, email: true });

									// esto se puede hacer luego de que cuando le de click te lleve directamente el input
								}}
							>
								<PencilLine />
							</Button>
						</div>
						<div className='flex gap-1 w-full sm:w-full lg:w-[30%] space-y-6'>
							<TextField
								label='Nombres'
								type='text'
								id='user_first_name'
								value={values.first_name}
								placeholder={user?.first_name}
								readOnly
							/>
							<Button variant='outline' size='icon' type='button'>
								<PencilLine />
							</Button>
						</div>
						<div className='flex gap-1 w-full sm:w-full lg:w-[30%] space-y-6'>
							<TextField
								label='Apellidos'
								type='text'
								id='user_last_name'
								value={values.last_name}
								placeholder={user?.last_name}
								onChange={handleChange}
								readOnly
							/>
							<Button variant='outline' size='icon' type='button'>
								<PencilLine />
							</Button>
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<div className='flex w-full lg:justify-end sm:justify-center'>
						<Button variant='default' size='sm' type='submit'>
							<Check className='opacity-50' />
							Confirmar cambios
						</Button>
					</div>
				</CardFooter>
			</form>
		</Card>
	);
}
