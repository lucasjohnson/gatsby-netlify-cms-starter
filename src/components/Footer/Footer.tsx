import React from 'react';
import BreadcrumbNavigation from '../Navigation/BreadcrumbNavigation';
import FooterNavigation from '../Navigation/FooterNavigation';
import LegalNavigation from '../Navigation/LegalNavigation';
import CompanyInformation from './CompanyInformation';

const Footer: React.FC = () => {
	return (
		<footer className="Footer">
			<div className="block">
				<BreadcrumbNavigation />
				<FooterNavigation />
				<CompanyInformation />
				<LegalNavigation />
			</div>
		</footer>
	);
};

export default Footer;
