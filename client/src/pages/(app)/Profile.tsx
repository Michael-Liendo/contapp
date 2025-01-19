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
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

export default function Profile() {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	const [fieldEditMode, setFieldEditMode] = useState({
		email: false,
		first_name: false,
		last_name: false,
	});

	const toggleEditField = (field: keyof typeof fieldEditMode) => {
		const input = document.querySelector(
			`[name="${field}"]`,
		) as HTMLInputElement;
		if (input) {
			input.focus();
		}
		setFieldEditMode((prev) => ({
			...prev,
			[field]: !prev[field],
		}));
	};

	const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
		initialValues: {
			first_name: user?.first_name,
			last_name: user?.last_name,
			email: user?.email,
			password: undefined,
			old_password: undefined,
		},
		validationSchema: toFormikValidationSchema(UserForUpdateSchema),
		onSubmit: async (values) => {
			const updated = await Services.users.update(
				UserForUpdateSchema.parse(values),
			);

			if (!updated) return console.error('Error updating user');

			toast({
				title: 'Tu usuario fue actualizado',
			});

			queryClient.invalidateQueries('user');
		},
	});

	useEffect(() => {
		resetForm({
			values: {
				first_name: user?.first_name,
				last_name: user?.last_name,
				email: user?.email,
				password: undefined,
				old_password: undefined,
			},
		});
	}, [user]);

	return (
		<Card>
			<CardHeader>
				<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm mb-2'>
					<Avatar className='h-28 w-28 rounded-full'>
						<AvatarImage alt={user?.first_name} />
						<AvatarFallback className='rounded-full'>
							{user?.first_name.at(0)}
							{user?.last_name.at(0)}
						</AvatarFallback>
					</Avatar>
				</div>
				<CardTitle>
					Hola, {user?.first_name} {user?.last_name}
				</CardTitle>
				<p className='opacity-50'>Edita tu información de perfil</p>
			</CardHeader>
			<form noValidate onSubmit={handleSubmit}>
				<CardContent>
					<div className='flex flex-wrap gap-5'>
						{[
							{
								label: 'Correo',
								id: 'user_email',
								name: 'email',
								value: values.email,
								placeholder: user?.email,
								error: errors.email,
								isEditable: fieldEditMode.email,
								onEdit: () => toggleEditField('email'),
							},
							{
								label: 'Nombres',
								id: 'user_first_name',
								name: 'first_name',
								value: values.first_name,
								error: errors.first_name,
								placeholder: user?.first_name,
								isEditable: fieldEditMode.first_name,
								onEdit: () => toggleEditField('first_name'),
							},
							{
								label: 'Apellidos',
								id: 'user_last_name',
								name: 'last_name',
								value: values.last_name,
								error: errors.last_name,
								placeholder: user?.last_name,
								isEditable: fieldEditMode.last_name,
								onEdit: () => toggleEditField('last_name'),
							},
						].map(
							({
								name,
								label,
								id,
								value,
								placeholder,
								error,
								isEditable,
								onEdit,
							}) => (
								<div
									key={id}
									className='flex gap-1 w-full sm:w-full lg:w-[30%] space-y-6'
								>
									<TextField
										label={label}
										type='text'
										id={id}
										name={name}
										error={error}
										value={value}
										placeholder={placeholder}
										readOnly={!isEditable}
										onChange={handleChange}
									/>
									<Button
										variant='outline'
										size='icon'
										type='button'
										onClick={onEdit}
									>
										<PencilLine />
									</Button>
								</div>
							),
						)}
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
