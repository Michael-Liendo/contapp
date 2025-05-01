import { View, Text, ScrollView } from 'react-native';

import useAuth from '../../hooks/useAuth';

export default function LoginPage() {
	const { user } = useAuth();

	return (
		<ScrollView className='flex-1 bg-white'>
			<View className='flex flex-col justify-center items-center px-6 py-10'>
				<View className='flex flex-row items-center gap-2 mb-4'>
					<Text className='text-xl font-bold'>
						{(user as { email: string }).email}
					</Text>
				</View>
			</View>
		</ScrollView>
	);
}
