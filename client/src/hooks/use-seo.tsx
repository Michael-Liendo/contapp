import { useEffect } from 'react';

interface SEOProps {
	title: string;
	description: string;
	keywords?: string;
	author?: string;
	robots?: string;
}

const useSEO = ({ title, description, keywords, author, robots }: SEOProps) => {
	useEffect(() => {
		document.title = title;

		const setMetaTag = (name: string, content: string | undefined) => {
			if (!content) return;
			let element = document.querySelector(
				`meta[name="${name}"]`,
			) as HTMLMetaElement | null;
			if (element) {
				element.setAttribute('content', content);
			} else {
				element = document.createElement('meta') as HTMLMetaElement;
				element.name = name;
				element.content = content;
				document.head.appendChild(element);
			}
		};

		setMetaTag('description', description);
		setMetaTag('keywords', keywords);
		setMetaTag('author', 'Contapp Team');
		setMetaTag('robots', 'index, follow');
	}, [title, description, keywords, author, robots]);
};

export default useSEO;
