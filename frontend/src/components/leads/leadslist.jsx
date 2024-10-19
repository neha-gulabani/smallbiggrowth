import { useState } from 'react';
import LeadCard from './leadcard.tsx';
import Pagination from '../common/pagination';

export default function LeadList() {
    const [currentPage, setCurrentPage] = useState(1);
    const leadsPerPage = 6; // 2 rows × 3 columns

    // Hardcoded lead data
    const leads = [
        {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            company: 'TechCorp',
            jobTitle: 'Software Engineer',
            email: 'john.doe@techcorp.com',
            linkedinProfile: 'https://www.linkedin.com/in/johndoe',
        },
        {
            id: 2,
            firstName: 'Jane',
            lastName: 'Smith',
            company: 'BizInc',
            jobTitle: 'Marketing Manager',
            email: 'jane.smith@bizinc.com',
            linkedinProfile: 'https://www.linkedin.com/in/janesmith',
        },
        {
            id: 3,
            firstName: 'Alice',
            lastName: 'Johnson',
            company: 'InnovateX',
            jobTitle: 'Product Manager',
            email: 'alice.johnson@innovatex.com',
            linkedinProfile: 'https://www.linkedin.com/in/alicejohnson',
        },
        {
            id: 4,
            firstName: 'Bob',
            lastName: 'Wilson',
            company: 'DataCo',
            jobTitle: 'Data Scientist',
            email: 'bob.wilson@dataco.com',
            linkedinProfile: 'https://www.linkedin.com/in/bobwilson',
        },
        {
            id: 5,
            firstName: 'Carol',
            lastName: 'Brown',
            company: 'CloudTech',
            jobTitle: 'Cloud Architect',
            email: 'carol.brown@cloudtech.com',
            linkedinProfile: 'https://www.linkedin.com/in/carolbrown',
        },
        {
            id: 6,
            firstName: 'David',
            lastName: 'Miller',
            company: 'SecureNet',
            jobTitle: 'Security Engineer',
            email: 'david.miller@securenet.com',
            linkedinProfile: 'https://www.linkedin.com/in/davidmiller',
        },
        {
            id: 7,
            firstName: 'Eva',
            lastName: 'Garcia',
            company: 'AILabs',
            jobTitle: 'ML Engineer',
            email: 'eva.garcia@ailabs.com',
            linkedinProfile: 'https://www.linkedin.com/in/evagarcia',
        },
    ];

    // Calculate pagination values
    const totalPages = Math.ceil(leads.length / leadsPerPage);
    const startIndex = (currentPage - 1) * leadsPerPage;
    const endIndex = startIndex + leadsPerPage;
    const currentLeads = leads.slice(startIndex, endIndex);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top of leads section
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Leads</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {currentLeads.map(lead => (
                    <LeadCard key={lead.id} lead={lead} />
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}