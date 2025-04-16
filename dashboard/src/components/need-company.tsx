export function NeedCompany() {
	return (
		<div className='flex flex-col items-center justify-center h-screen'>
			<div className='flex flex-col items-center justify-center'>
				<h1 className='text-3xl font-bold'>
					Necesitas una compañía para poder acceder a esta página
				</h1>
				<p className='text-lg'>
					Para poder acceder a esta página, debes crear una compañía o
					selecciona una existente.
				</p>
			</div>
		</div>
	);
}
