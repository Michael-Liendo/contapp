import { AuthRoutesEnum, PrivateRoutesEnum } from '@/data/routesEnums';
import { cn } from '@/lib/utils';
import { Link, useHistory, useLocation } from 'react-router-dom';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuItem,
} from './ui/dropdown-menu';
import { Input } from './ui/input';
import useAuth from '@/hooks/useAuth';
import { LogOut, UserPen } from 'lucide-react';

const data = [
	{
		title: 'Inicio',
		url: PrivateRoutesEnum.Home,
	},
];

function NavLink({ children, to }: { children: React.ReactNode; to: string }) {
	const { pathname } = useLocation();

	return (
		<Link
			to={to}
			className={cn(
				'text-sm font-medium transition-colors hover:text-primary',
				{
					'text-muted-foreground': pathname === to,
				},
			)}
		>
			{children}
		</Link>
	);
}

export function UserNav() {
	const { user, logout } = useAuth();

	const navigate = useHistory();

	function handleLogout() {
		logout();
		navigate.push(AuthRoutesEnum.Login);
	}

	function handleProfile() {
		navigate.push(PrivateRoutesEnum.Profile);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='relative h-8 w-8 rounded-full'>
					<Avatar className='h-8 w-8'>
						<AvatarImage src='/avatars/01.png' alt={user?.first_name} />
						<AvatarFallback>
							{user?.first_name?.charAt(0)} {user?.last_name?.charAt(0)}
							<span className='sr-only'>{user?.first_name}</span>
						</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
				side={'bottom'}
				align='end'
				sideOffset={4}
			>
				<DropdownMenuLabel className='p-0 font-normal'>
					<div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
						<Avatar className='h-8 w-8 rounded-lg'>
							<AvatarImage alt={user?.first_name} />
							<AvatarFallback className='rounded-lg'>
								{user?.first_name.at(0)}
								{user?.last_name.at(0)}
							</AvatarFallback>
						</Avatar>
						<div className='grid flex-1 text-left text-sm leading-tight'>
							<span className='truncate font-semibold'>
								{user?.first_name} {user?.last_name}
							</span>
							<span className='truncate text-xs'>{user?.email}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => handleProfile()}>
					<UserPen className='size-4 mr-1' />
					Editar perfil
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={() => handleLogout()}>
					<LogOut className='size-4 mr-1' />
					Cerrar sesión
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export function Search() {
	return (
		<div>
			<Input
				type='search'
				placeholder='Search...'
				className='md:w-[100px] lg:w-[300px]'
			/>
		</div>
	);
}

export function MainNav({
	className,
	...props
}: React.HTMLAttributes<HTMLElement>) {
	return (
		<nav
			className={cn('flex items-center space-x-4 lg:space-x-6', className)}
			{...props}
		>
			{data.map((item) => (
				<NavLink key={item.title} to={item.url}>
					{item.title}
				</NavLink>
			))}
		</nav>
	);
}
