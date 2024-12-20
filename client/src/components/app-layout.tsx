import { AppSidebar } from '@/components/nav-bar/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className='flex flex-col h-screen'>
				<header className='flex h-16 items-center justify-between px-4'>
					<div className='flex items-center gap-2 px-4'>
						<SidebarTrigger className='-ml-1' />
						<Separator orientation='vertical' className='mr-2 h-4' />
					</div>
				</header>
				<main className='flex flex-col flex-1 overflow-auto gap-4 p-4 pt-0'>
					{children}
				</main>
			</div>
		</SidebarProvider>
	);
}
