'use client';

import {
	BookUser,
	ClipboardMinus,
	History,
	Home,
	Notebook,
} from 'lucide-react';

import { CompanySwitcher } from '@/components/nav-bar/company-switcher';
import { NavUser } from '@/components/nav-bar/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from '@/components/ui/sidebar';
import { PrivateRoutesEnum } from '@/data/routesEnums';
import { Link, useLocation } from 'react-router-dom';

const data = {
	navMain: [
		{
			title: 'General',
			items: [
				{
					title: 'Inicio',
					url: PrivateRoutesEnum.Home,
					icon: Home,
				},
			],
		},
		{
			title: 'Operaciones Contables',
			items: [
				{
					title: 'Registrar Asiento Contable',
					url: '#',
					icon: Notebook,
				},
				{
					title: 'Historial de Asientos',
					url: '#',
					icon: History,
				},
			],
		},
		{
			title: 'Reportes',
			items: [
				{
					title: 'Balance de Comprobación',
					url: '#',
					icon: ClipboardMinus,
				},
				{
					title: 'Exportar a Excel',
					url: '#',
					icon: Notebook,
				},
			],
		},
		{
			title: 'Configuración Contable',
			items: [
				{
					title: 'Plan de Cuentas',
					url: PrivateRoutesEnum.AccountsPlan,
					icon: BookUser,
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { pathname } = useLocation();
	return (
		<Sidebar collapsible='icon' {...props}>
			<SidebarHeader>
				<CompanySwitcher />
			</SidebarHeader>
			<SidebarContent>
				{data.navMain.map((item) => (
					<SidebarGroup key={item.title}>
						<SidebarGroupLabel>{item.title}</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{item.items.map((item) => (
									<SidebarMenuItem
										key={item.title}
										className={item.url === pathname ? 'bg-sidebar-accent' : ''}
									>
										<SidebarMenuButton asChild>
											<Link to={item.url}>
												{item.icon && <item.icon />}
												<span>{item.title}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
