import ProtectedRoute from '@/components/ProtectedRoutes';

export default function AuthLayout() {
	return <ProtectedRoute unauthenticated={false} />;
}
