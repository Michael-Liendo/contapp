import { IonContent, IonPage } from '@ionic/react';

export default function AuthLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<IonPage>
			<IonContent>{children}</IonContent>
		</IonPage>
	);
}
