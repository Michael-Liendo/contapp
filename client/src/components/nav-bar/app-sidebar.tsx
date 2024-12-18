'use client';

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
import { PrivateRoutesEnum } from '@/Routes';
import {
	BookUser,
	ClipboardMinus,
	History,
	Home,
	Notebook,
} from 'lucide-react';

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
					url: '#',
					icon: BookUser,
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
									<SidebarMenuItem key={item.title}>
										<SidebarMenuButton asChild>
											<a href={item.url}>
												{item.icon && <item.icon />}
												<span>{item.title}</span>
											</a>
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
