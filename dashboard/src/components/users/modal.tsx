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
	AccountPlanForCreateSchema,
	type IUser,
	MasterNameEnum,
	UserSchema,
} from '@contapp/shared';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
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
		mutationFn: (accountPlan: IUser) => {
			if (!isEdit?.id) throw new Error('Account plan id is required');
			return Services.admin.update(
				MasterNameEnum.Values.users,
				isEdit?.id,
				accountPlan,
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries('users');
		},
	});

	const create = useMutation({
		mutationFn: (user: IUser) => {
			return Services.admin.create(MasterNameEnum.Values.users, user);
		},
		onSuccess: () => {
			queryClient.invalidateQueries('users');
		},
	});

	const { handleSubmit } = useFormik({
		initialValues: {},
		validationSchema: toFormikValidationSchema(AccountPlanForCreateSchema),
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
				title: isEdit ? 'Plan de cuentas editado' : 'Plan de cuentas creado',
			});
		},
	});

	useEffect(() => {
		if (isEdit) {
			// todo: check this
			// setValues({ ...UserSchema.omit({ id: true }).parse({}) });
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
						<DialogTitle>{isEdit ? 'Editar users' : 'Crear user'}</DialogTitle>
						<DialogDescription>
							Escribe los datos del users que deseas{' '}
							{isEdit ? 'editar' : 'crear'}.
						</DialogDescription>
					</DialogHeader>
					<div>
						{/* 		<TextField
							label='Código de cuenta contable'
							type='text'
							id='nomenclature'
							name='nomenclature'
							placeholder='Nomenclatura del users'
							autoComplete='off'
							value={values.email}
							error={errors.email}
							onChange={handleChange}
							required
						/> */}
					</div>
					<DialogFooter>
						<Button form='mutate-users' type='submit'>
							{isEdit ? 'Editar users' : 'Crear users'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
