import { PrivateRoutesEnum } from '@/data/routesEnums';
import { cn } from '@/lib/utils';
import { Link, useLocation } from 'react-router-dom';

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
