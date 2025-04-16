import { MainNav } from './nav-bar/nav-main';
import { Search } from './nav-bar/search';
import { UserNav } from './nav-bar/nav-user';

export function LApp({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex-col md:flex'>
			<div className='border-b'>
				<div className='flex h-16 items-center px-8'>
					<MainNav />
					<div className='ml-auto flex items-center space-x-4'>
						<Search />
						<UserNav />
					</div>
				</div>
			</div>
			<main className='flex-1 p-8 pt-6'>{children}</main>
		</div>
	);
}

export function LAuth({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
