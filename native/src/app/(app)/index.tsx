import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import useAuth from '../../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginPage() {
	const { user } = useAuth();

	return (
		<ScrollView className='flex-1 bg-white'>
			<View className='flex flex-col justify-center items-center px-6 py-10'>
				<View className='flex items-center gap-2 mb-4'>
					<Text className='text-xl font-bold'>Contapp</Text>
					{/* the name of the user and the last name*/}
					<Text className='text-2xl font-bold'>
						{user.first_name} {user.last_name}
					</Text>
					<Text className='text-xl font-bold'>
						{(user as { email: string }).email}
					</Text>

					<TouchableOpacity
						onPress={async () => AsyncStorage.removeItem('token')}
						className='bg-blue-600 rounded-md py-3 px-4 mt-4'
					>
						<Text className='text-white text-center font-semibold'>
							Cerrar sesión
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	);
}
