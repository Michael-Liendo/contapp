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
					<a
						href={link}
						target='_blank'
						rel='noopener noreferrer'
						className='size-6 ease-in-out duration-200 hover:opacity-70'
					>
						<ExternalLink className='ml-2 mt-6' />
					</a>
				</TooltipTrigger>
				<TooltipContent>
					<p>Ir a la solicitud de extracción (PR)</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
