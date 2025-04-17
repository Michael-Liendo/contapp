import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import Services from '@/services';
import { toFormikValidationSchema } from '@/utils/toFormikValidationSchema';
import {
	type IUser,
	MasterNameEnum,
	type TUserRole,
	UserRoleEnum,
	UserSchema,
} from '@contapp/shared';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { TextField } from '../text-field';
import { Checkbox } from '../ui/checkbox';
import { DatePicker } from '../ui/date-picker';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select';
import { useToast } from '../ui/use-toast';

export function UsersModalMutate({
	open,
	setOpen,
	isEdit,
}: {
	open: boolean;
	setOpen: (open: boolean) => void;
	isEdit?: IUser;
}) {
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const update = useMutation({
		mutationFn: (user: IUser) => {
			if (!isEdit?.id) throw new Error('Account plan id is required');
			return Services.admin.update(
				MasterNameEnum.Values.users,
				isEdit?.id,
				user,
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(MasterNameEnum.Values.users);
		},
	});

	const create = useMutation({
		mutationFn: (user: IUser) => {
			return Services.admin.create(MasterNameEnum.Values.users, user);
		},
		onSuccess: () => {
			queryClient.invalidateQueries(MasterNameEnum.Values.users);
		},
	});

	const {
		values,
		errors,
		handleChange,
		isSubmitting,
		handleSubmit,
		setValues,
	} = useFormik({
		initialValues: {
			...isEdit,
		},
		validationSchema: toFormikValidationSchema(UserSchema),
		validateOnChange: false,
		validateOnBlur: false,
		onSubmit: async (values, { resetForm }) => {
			if (isEdit) {
				const dto = await UserSchema.parse({
					id: isEdit.id,
					...values,
				});
				update.mutate(dto);
			} else {
				const dto = await UserSchema.parse(values);

				create.mutate(dto);
			}

			setOpen(false);
			resetForm();

			toast({
				title: isEdit ? 'Usuario editado' : 'Usuario creado',
			});
		},
	});

	useEffect(() => {
		if (isEdit) {
			setValues({
				...isEdit,
			});
		}
	}, [isEdit]);

	return (
		<Dialog
			open={open}
			onOpenChange={(open) => {
				setOpen(open);
			}}
		>
			<DialogContent className='sm:max-w-[425px]'>
				<form
					id='mutate-users'
					className='space-y-4'
					onSubmit={handleSubmit}
					noValidate
				>
					<DialogHeader>
						<DialogTitle>
							{isEdit ? 'Editar usuario' : 'Crear usuario'}
						</DialogTitle>
						<DialogDescription>
							Escribe los datos del usuario que deseas{' '}
							{isEdit ? 'editar' : 'crear'}.
						</DialogDescription>
					</DialogHeader>
					<div className='space-y-4'>
						<TextField
							label='Nombre'
							type='text'
							id='first_name'
							name='first_name'
							placeholder='Nombre'
							autoComplete='off'
							value={values.first_name}
							error={errors.first_name}
							onChange={handleChange}
							required
						/>
						<TextField
							label='Apellido'
							type='text'
							id='last_name'
							name='last_name'
							placeholder='Apellido'
							autoComplete='off'
							value={values.last_name}
							error={errors.last_name}
							onChange={handleChange}
							required
						/>
						<TextField
							label='Correo'
							type='text'
							id='email'
							name='email'
							placeholder='Correo'
							autoComplete='off'
							value={values.email}
							error={errors.email}
							onChange={handleChange}
							required
						/>
						<TextField
							label='Contraseña'
							type='password'
							id='password'
							name='password'
							placeholder='Contraseña'
							autoComplete='off'
							value={values.password}
							error={errors.password}
							onChange={handleChange}
							required
						/>

						{/* here the new forms: */}
						<Checkbox
							label='Activo'
							id='active'
							name='active'
							checked={values.active}
							onCheckedChange={(e) =>
								setValues({ ...values, active: Boolean(e) })
							}
						/>
						<div>
							<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
								Email verificado
							</label>
							<DatePicker
								date={values.email_confirmed_at}
								setDate={(date) =>
									setValues({ ...values, email_confirmed_at: date })
								}
							/>
						</div>

						<div>
							<label className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'>
								Términos y condiciones
							</label>
							<DatePicker
								date={values.terms_accepted_at}
								setDate={(date) =>
									setValues({ ...values, email_confirmed_at: date })
								}
							/>
						</div>

						<Select
							value={values.role}
							onValueChange={(value) =>
								setValues({ ...values, role: value as TUserRole })
							}
						>
							<SelectTrigger>
								<SelectValue placeholder='Seleccionar...' />
							</SelectTrigger>
							<SelectContent>
								{UserRoleEnum.options.map((option) => (
									<SelectItem key={option} value={option}>
										{option}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<Checkbox
							label='Notificaciones - Información'
							id='notifications.information'
							name='notifications.information'
							checked={values?.notifications?.information}
							onChange={handleChange}
						/>
						<Checkbox
							label='Notificaciones - General'
							id='notifications.general'
							name='notifications.general'
							checked={values?.notifications?.general}
							onChange={handleChange}
						/>
					</div>
					<DialogFooter>
						<Button form='mutate-users' type='submit' disabled={isSubmitting}>
							{isEdit ? 'Editar Usuario' : 'Crear Usuario'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
