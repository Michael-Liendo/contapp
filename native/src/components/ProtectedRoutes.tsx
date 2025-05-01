import useAuth from '@/hooks/useAuth';
import { Redirect, Slot } from 'expo-router';

type Props = {
	unauthenticated?: boolean;
};

export default function ProtectedRoute({ unauthenticated = false }: Props) {
	const { user, isLoading } = useAuth();

	if (isLoading) return null;

	if (!user && !unauthenticated) {
		return <Redirect href='/(auth)' />;
	}

	if (user && unauthenticated) {
		return <Redirect href='/(app)' />;
	}

	return <Slot />;
}
