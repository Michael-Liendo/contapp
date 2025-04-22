import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { AuthRoutesEnum } from '@/data/routesEnums';
import { APP_NAME_CAPITALIZED } from '@contapp/shared';
import { IonContent, IonPage } from '@ionic/react';
import {
	Check,
	ChevronRight,
	Clock,
	Code,
	Github,
	Instagram,
	Linkedin,
	Twitter,
	Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
	return (
		<IonPage>
			<IonContent>
				<div className='flex min-h-screen flex-col'>
					<header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
						<div className='container flex h-16 items-center justify-between'>
							<div className='flex items-center gap-2'>
								<span className='text-xl font-bold'>
									{APP_NAME_CAPITALIZED}
								</span>
							</div>
							<nav className='hidden md:flex gap-6'>
								<Link
									to='#features'
									className='text-sm font-medium hover:text-primary transition-colors'
								>
									Funcionalidades
								</Link>
								<Link
									to='#testimonials'
									className='text-sm font-medium hover:text-primary transition-colors'
								>
									Testimonios
								</Link>
								<Link
									to='#pricing'
									className='text-sm font-medium hover:text-primary transition-colors'
								>
									Planes
								</Link>
							</nav>
							<div className='flex items-center gap-4'>
								<Link
									to={AuthRoutesEnum.Login}
									className='text-sm font-medium hover:underline underline-offset-4 hidden sm:block'
								>
									Sign In
								</Link>
								<Link to={AuthRoutesEnum.Signup}>
									<Button>Get Started</Button>
								</Link>
							</div>
						</div>
					</header>

					<main className='flex-1'>
						{/* Sección Principal (Hero) */}
						<section className='w-full py-12 md:py-24 lg:py-32 xl:py-48'>
							<div className='container px-4 md:px-6'>
								<div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
									<div className='flex flex-col justify-center space-y-4'>
										<div className='space-y-2'>
											<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
												{APP_NAME_CAPITALIZED}: Tu contabilidad en orden, tu
												negocio en control
											</h1>
											<p className='max-w-[600px] text-muted-foreground md:text-xl'>
												La plataforma todo-en-uno para llevar la contabilidad de
												tus empresas: crea compañías, configura planes de
												cuentas, registra asientos y genera reportes financieros
												al instante.
											</p>
										</div>
										<div className='flex flex-col gap-2 min-[400px]:flex-row'>
											<Link to={AuthRoutesEnum.Signup}>
												<Button>
													Comenzar prueba gratis
													<ChevronRight className='ml-2 h-4 w-4' />
												</Button>
											</Link>
											<Button variant='outline'>Ver demostración</Button>
										</div>
										{/* 	<div className='flex items-center space-x-4 text-sm'>
											<div className='flex -space-x-2'>
												{[1, 2, 3, 4].map((i) => (
													<div
														key={i}
														className='inline-block h-8 w-8 rounded-full bg-gray-200 ring-2 ring-background'
													/>
												))}
											</div>
											<div className='text-muted-foreground'>
												<span className='font-medium'>2,000+</span> empresas ya
												confían en nosotros
											</div>
										</div> */}
									</div>
									<img
										src='/image.png'
										width={550}
										height={550}
										alt='Vista previa del panel contable'
										className='mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last'
									/>
								</div>
							</div>
						</section>

						{/* Sección de Funcionalidades */}
						<section
							id='features'
							className='w-full py-12 md:py-24 lg:py-32 bg-muted'
						>
							<div className='container px-4 md:px-6'>
								<div className='flex flex-col items-center justify-center space-y-4 text-center'>
									<div className='space-y-2'>
										<div className='inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-accent'>
											Funcionalidades
										</div>
										<h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
											Todo lo que necesitas para llevar tu contabilidad
										</h2>
										<p className='max-w-[900px] text-muted-foreground md:text-xl'>
											Nuestra plataforma te brinda las herramientas esenciales
											para administrar compañías, estructurar planes de cuentas,
											registrar asientos contables y generar reportes
											financieros con claridad.
										</p>
									</div>
								</div>
								<div className='mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3'>
									<Card>
										<CardHeader>
											<Zap className='h-10 w-10 text-primary mb-2' />
											<CardTitle>Gestión Rápida y Eficiente</CardTitle>
											<CardDescription>
												Crea compañías y configura su contabilidad en minutos.
											</CardDescription>
										</CardHeader>
										<CardContent>
											<p className='text-sm text-muted-foreground'>
												Nuestra interfaz intuitiva y veloz te permite gestionar
												múltiples empresas sin complicaciones y con total
												fluidez.
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<Code className='h-10 w-10 text-primary mb-2' />
											<CardTitle>Plan de Cuentas Flexible</CardTitle>
											<CardDescription>
												Organiza tu contabilidad con un plan de cuentas
												personalizable.
											</CardDescription>
										</CardHeader>
										<CardContent>
											<p className='text-sm text-muted-foreground'>
												Define cuentas contables según tu estructura
												organizativa, crea jerarquías y ten control total sobre
												la nomenclatura y la naturaleza de cada cuenta.
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<Clock className='h-10 w-10 text-primary mb-2' />
											<CardTitle>Reportes en Tiempo Real</CardTitle>
											<CardDescription>
												Consulta balances y movimientos contables con solo unos
												clics.
											</CardDescription>
										</CardHeader>
										<CardContent>
											<p className='text-sm text-muted-foreground'>
												Genera reportes como el Balance de Comprobación para
												visualizar saldos iniciales, débitos, créditos y saldos
												finales por período y por cuenta.
											</p>
										</CardContent>
									</Card>
								</div>
							</div>
						</section>

						{/* Sección de Testimonios */}
						<section
							id='testimonios'
							className='w-full py-12 md:py-24 lg:py-32'
						>
							<div className='container px-4 md:px-6'>
								<div className='flex flex-col items-center justify-center space-y-4 text-center'>
									<div className='space-y-2'>
										<div className='inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-accent'>
											Testimonios
										</div>
										<h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
											Amado por contadores y empresas alrededor del mundo
										</h2>
										<p className='max-w-[900px] text-muted-foreground md:text-xl'>
											No lo decimos solo nosotros. Esto es lo que opinan
											nuestros usuarios sobre {APP_NAME_CAPITALIZED}.
										</p>
									</div>
								</div>
								<div className='mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2'>
									<Card>
										<CardHeader>
											<div className='flex items-center gap-4'>
												<div className='h-12 w-12 rounded-full bg-gray-200' />
												<div>
													<CardTitle>Ana Morales</CardTitle>
													<CardDescription>
														Contadora Independiente
													</CardDescription>
												</div>
											</div>
										</CardHeader>
										<CardContent>
											<p className='text-muted-foreground'>
												"{APP_NAME_CAPITALIZED} ha simplificado completamente el
												manejo contable de nuestras empresas. Los reportes son
												claros y rápidos, y el registro de asientos nunca fue
												tan ágil."
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<div className='flex items-center gap-4'>
												<div className='h-12 w-12 rounded-full bg-gray-200' />
												<div>
													<CardTitle>Jorge Pérez</CardTitle>
													<CardDescription>CFO en NovaStart</CardDescription>
												</div>
											</div>
										</CardHeader>
										<CardContent>
											<p className='text-muted-foreground'>
												"La integración con nuestras operaciones fue inmediata.
												Ahora todo nuestro flujo contable pasa por{' '}
												{APP_NAME_CAPITALIZED}, desde los movimientos bancarios
												hasta los balances."
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<div className='flex items-center gap-4'>
												<div className='h-12 w-12 rounded-full bg-gray-200' />
												<div>
													<CardTitle>Lucía Fernández</CardTitle>
													<CardDescription>
														Asesora contable independiente
													</CardDescription>
												</div>
											</div>
										</CardHeader>
										<CardContent>
											<p className='text-muted-foreground'>
												"Trabajo con varios clientes al mismo tiempo, y esta
												plataforma me permite gestionar todas sus contabilidades
												desde un solo lugar. Es intuitiva, rápida y muy
												completa."
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader>
											<div className='flex items-center gap-4'>
												<div className='h-12 w-12 rounded-full bg-gray-200' />
												<div>
													<CardTitle>Diego Ramírez</CardTitle>
													<CardDescription>CEO de ContabiNet</CardDescription>
												</div>
											</div>
										</CardHeader>
										<CardContent>
											<p className='text-muted-foreground'>
												"Hemos probado muchas soluciones contables, pero{' '}
												{APP_NAME_CAPITALIZED} es la más robusta y fácil de
												usar. La curva de aprendizaje fue mínima y los
												beneficios son enormes."
											</p>
										</CardContent>
									</Card>
								</div>
							</div>
						</section>
						<section
							id='pricing'
							className='w-full py-12 md:py-24 lg:py-32 bg-muted'
						>
							<div className='container px-4 md:px-6'>
								<div className='flex flex-col items-center justify-center space-y-4 text-center'>
									<div className='space-y-2'>
										<div className='inline-block rounded-lg bg-foreground px-3 py-1 text-sm text-accent'>
											Planes
										</div>
										<h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
											Precios simples y transparentes
										</h2>
										<p className='max-w-[900px] text-muted-foreground md:text-xl'>
											Sin cargos ocultos, sin sorpresas. Elige el plan que mejor
											se adapte a tu negocio.
										</p>
									</div>
								</div>
								<div className='mx-auto grid max-w-4xl gap-6 py-12 lg:grid-cols-2'>
									<Card>
										<CardHeader>
											<CardTitle>Gratis</CardTitle>
											<div className='text-4xl font-bold'>
												$0
												<span className='text-sm font-normal text-muted-foreground'>
													/mes
												</span>
											</div>
											<CardDescription>
												Ideal para usuarios individuales o para comenzar a
												probar la plataforma.
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-2 text-sm'>
												{[
													'Hasta 1 empresa por usuario',
													'Hasta 1,000 cuentas contables por empresa',
													'Hasta 100 asientos contables por empresa',
													'Visualización del Balance de Comprobación',
													'Acceso a soporte básico por correo',
												].map((feature) => (
													<li key={feature} className='flex items-center'>
														<Check className='mr-2 h-4 w-4 text-primary' />
														{feature}
													</li>
												))}
											</ul>
										</CardContent>
										<CardFooter>
											<Link to={AuthRoutesEnum.Signup}>
												<Button className='w-full'>Comenzar gratis</Button>
											</Link>
										</CardFooter>
									</Card>

									<Card className='border-2 border-primary'>
										<CardHeader>
											<div className='flex items-center justify-between'>
												<CardTitle>Pro</CardTitle>
												<div className='rounded-full bg-primary px-3 py-1 text-xs text-accent'>
													Más popular
												</div>
											</div>
											<div className='text-4xl font-bold'>
												$29
												<span className='text-sm font-normal text-muted-foreground'>
													/mes
												</span>
											</div>
											<CardDescription>
												Para usuarios avanzados y empresas que necesitan mayor
												capacidad.
											</CardDescription>
										</CardHeader>
										<CardContent>
											<ul className='space-y-2 text-sm'>
												{[
													'Hasta 10 empresas por usuario',
													'Hasta 10,000 cuentas contables por empresa',
													'Asientos contables ilimitados por empresa',
													'Visualización y descarga de Balance de Comprobación',
													'Soporte prioritario por correo',
													'Acceso anticipado a nuevas funcionalidades',
												].map((feature) => (
													<li key={feature} className='flex items-center'>
														<Check className='mr-2 h-4 w-4 text-primary' />
														{feature}
													</li>
												))}
											</ul>
										</CardContent>
										<CardFooter>
											<Link to={AuthRoutesEnum.Signup}>
												<Button className='w-full bg-primary hover:bg-primary'>
													Empieza gratis
												</Button>
											</Link>
										</CardFooter>
									</Card>
								</div>
							</div>
						</section>

						{/* Final CTA Section */}
						<section className='w-full py-12 md:py-24 lg:py-32'>
							<div className='container px-4 md:px-6'>
								<div className='flex flex-col items-center justify-center space-y-4 text-center'>
									<div className='space-y-2'>
										<h2 className='text-3xl font-bold tracking-tighter md:text-4xl'>
											¿Listo para transformar tu flujo contable con{' '}
											{APP_NAME_CAPITALIZED}?
										</h2>
										<p className='text-muted-foreground md:text-xl'>
											Súmate a miles de equipos que ya han optimizado su gestión
											financiera.
										</p>
									</div>
									<div className='flex flex-col gap-2 min-[400px]:flex-row'>
										<Link to={AuthRoutesEnum.Signup}>
											<Button>
												Comenzar prueba gratis
												<ChevronRight className='ml-2 h-4 w-4' />
											</Button>
										</Link>
										{/* <Button variant='outline'>Ver demostración</Button> */}
									</div>
									<p className='text-sm text-muted-foreground'>
										No es necesario tener una tarjeta de crédito. Puedes
										cancelar la prueba en cualquier momento.
									</p>
								</div>
							</div>
						</section>
					</main>

					{/* Footer */}
					<footer className='w-full border-t py-12 md:py-16 lg:py-20'>
						<div className='container px-4 md:px-6'>
							<div className='grid gap-8 lg:grid-cols-4'>
								<div className='space-y-4'>
									<div className='flex items-center gap-2'>
										<span className='text-xl font-bold'>
											{APP_NAME_CAPITALIZED}
										</span>
									</div>
									<p className='text-sm text-muted-foreground'>
										{APP_NAME_CAPITALIZED} potencia tu flujo de trabajo y mejora
										tu productividad. La plataforma todo-en-uno para equipos
										modernos.
									</p>
									<div className='flex gap-4'>
										<Link
											to='#'
											className='text-muted-foreground hover:text-foreground'
										>
											<Twitter className='h-5 w-5' />
											<span className='sr-only'>Twitter</span>
										</Link>
										<Link
											to='#'
											className='text-muted-foreground hover:text-foreground'
										>
											<Linkedin className='h-5 w-5' />
											<span className='sr-only'>LinkedIn</span>
										</Link>
										<Link
											to='#'
											className='text-muted-foreground hover:text-foreground'
										>
											<Github className='h-5 w-5' />
											<span className='sr-only'>GitHub</span>
										</Link>
										<Link
											to='#'
											className='text-muted-foreground hover:text-foreground'
										>
											<Instagram className='h-5 w-5' />
											<span className='sr-only'>Instagram</span>
										</Link>
									</div>
								</div>
								<div className='space-y-4'>
									<h3 className='text-sm font-medium'>Producto</h3>
									<ul className='space-y-2 text-sm'>
										{[
											'Características',
											'Integraciones',
											'Precios',
											'Cambios',
											'Hoja de ruta',
										].map((item) => (
											<li key={item}>
												<Link
													to='#'
													className='text-muted-foreground hover:text-foreground'
												>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</div>
								<div className='space-y-4'>
									<h3 className='text-sm font-medium'>Compañía</h3>
									<ul className='space-y-2 text-sm'>
										{[
											'Acerca de',
											'Blog',
											'Trabaja con nosotros',
											'Clientes',
											'Prensa',
										].map((item) => (
											<li key={item}>
												<Link
													to='#'
													className='text-muted-foreground hover:text-foreground'
												>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</div>
								<div className='space-y-4'>
									<h3 className='text-sm font-medium'>Recursos</h3>
									<ul className='space-y-2 text-sm'>
										{[
											'Documentación',
											'Centro de ayuda',
											'Comunidad',
											'Soporte',
											'Contacto',
										].map((item) => (
											<li key={item}>
												<Link
													to='#'
													className='text-muted-foreground hover:text-foreground'
												>
													{item}
												</Link>
											</li>
										))}
									</ul>
								</div>
							</div>
							<div className='mt-12 border-t pt-8 text-center text-sm text-muted-foreground'>
								<p>
									© {new Date().getFullYear()} {APP_NAME_CAPITALIZED}. Todos los
									derechos reservados.
								</p>
							</div>
						</div>
					</footer>
				</div>
			</IonContent>
		</IonPage>
	);
}
