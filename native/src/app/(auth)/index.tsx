import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ScrollView,
	Alert,
} from 'react-native';
import { useFormik } from 'formik';

import Services from '../../services';
import useAuth from '../../hooks/useAuth';
import { cn } from '@/lib/utils';
import { useRouter } from 'expo-router';

export default function LoginPage() {
	const { setToken } = useAuth();
	const router = useRouter();

	const { values, errors, handleChange, handleSubmit, isSubmitting } =
		useFormik({
			initialValues: { email: '', password: '' },
			validateOnChange: false,
			validateOnBlur: false,
			onSubmit: async (values) => {
				try {
					const results = await Services.auth.login({
						email: values.email.toLowerCase(),
						password: values.password,
					});
					setToken(results?.data?.token);

					Alert.alert('Éxito', 'Inicio de sesión exitoso!');
					router.navigate('/(app)');
				} catch (e) {
					Alert.alert('Error', 'Credenciales inválidas');
					console.error(e);
				}
			},
		});

	return (
		<ScrollView className='flex-1 bg-white'>
			<View className='flex flex-col justify-center items-center px-6 py-10'>
				<View className='flex flex-row items-center gap-2 mb-4'>
					<Text className='text-xl font-bold'>Contapp</Text>
				</View>

				<Text className='text-lg text-center mb-8'>
					Inicie sesión y simplifique su gestión financiera
				</Text>

				<View className='w-full max-w-md bg-gray-100 p-6 rounded-lg'>
					<Text className='text-xl font-semibold mb-4'>Inicio de sesión</Text>

					<TextInput
						className={cn(
							'border border-gray-300 rounded-md p-3 mb-2',
							errors.email && 'border-red-500',
						)}
						placeholder='Correo'
						autoCapitalize='none'
						autoComplete='email'
						keyboardType='email-address'
						value={values.email}
						onChangeText={handleChange('email')}
					/>
					{errors.email && (
						<Text className='text-red-500 mb-2'>{errors.email}</Text>
					)}

					<TextInput
						className={cn(
							'border border-gray-300 rounded-md p-3 mb-2',
							errors.password && 'border-red-500',
						)}
						placeholder='Contraseña'
						secureTextEntry
						autoComplete='password'
						value={values.password}
						onChangeText={handleChange('password')}
					/>
					{errors.password && (
						<Text className='text-red-500 mb-2'>{errors.password}</Text>
					)}

					<TouchableOpacity
						onPress={() => handleSubmit()}
						disabled={isSubmitting}
						className='bg-blue-600 rounded-md py-3 mt-4'
					>
						<Text className='text-white text-center font-semibold'>
							{isSubmitting ? 'Cargando...' : 'Entrar'}
						</Text>
					</TouchableOpacity>

					<View className='my-4 border-t border-gray-300' />
				</View>
			</View>
		</ScrollView>
	);
}
