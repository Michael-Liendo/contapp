import useAuth from '@/hooks/useAuth';
import { Redirect, Slot } from 'expo-router';
import { ActivityIndicator } from 'react-native';

type Props = {
	unauthenticated?: boolean;
};

export default function ProtectedRoute({ unauthenticated = false }: Props) {
	const { user, isLoading } = useAuth();

	if (isLoading) return <ActivityIndicator color={'#fff'} size={'large'} />;

	if (!user && !unauthenticated) {
		return <Redirect href='/(auth)' />;
	}

	if (user && unauthenticated) {
		return <Redirect href='/(app)' />;
	}

	return <Slot />;
}
