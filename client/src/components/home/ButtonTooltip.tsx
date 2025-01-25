import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import { ExternalLink } from 'lucide-react';

interface ButtonTooltipProps {
	link: string;
}

export default function ButtonTooltip({ link }: ButtonTooltipProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<a href={link} rel='noopener noreferrer'>
						<ExternalLink
							className='size-6
					transition-all duration-100 hover:opacity-50 hover:translate-x-1 hover:text-blue-900'
						/>
					</a>
				</TooltipTrigger>
				<TooltipContent>
					<p>Ir a la ruta</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
