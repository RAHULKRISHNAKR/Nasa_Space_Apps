document.addEventListener('DOMContentLoaded', () => {
    const teamMembers = [
        {
            id: 1,
            name: 'John Doe',
            role: 'Lead Developer',
            bio: 'John is a full-stack developer with over 10 years of experience building scalable web applications.'
        },
        {
            id: 2,
            name: 'Jane Smith',
            role: 'UI/UX Designer',
            bio: 'Jane specializes in creating beautiful and intuitive user interfaces that provide an exceptional user experience.'
        },
        {
            id: 3,
            name: 'Alex Johnson',
            role: 'Data Scientist',
            bio: 'Alex has a strong background in machine learning and data analysis, turning data into actionable insights.'
        },
        {
            id: 4,
            name: 'Sara Williams',
            role: 'Project Manager',
            bio: 'Sara ensures that all projects are delivered on time and within scope by managing team members and resources efficiently.'
        },
        {
            id: 5,
            name: 'Chris Lee',
            role: 'QA Engineer',
            bio: 'Chris is responsible for ensuring product quality by conducting thorough testing and identifying bugs early in the development process.'
        },
        {
            id: 6,
            name: 'Emma Brown',
            role: 'Marketing Specialist',
            bio: 'Emma is a digital marketing expert who helps the team reach the right audience through data-driven marketing strategies.'
        }
    ];

    const teamMembersElements = document.querySelectorAll('.team-member');
    const modal = document.getElementById('team-modal');
    const modalName = document.getElementById('modal-name');
    const modalRole = document.getElementById('modal-role');
    const modalBio = document.getElementById('modal-bio');
    const closeModalBtn = document.querySelector('.close-btn');

    // Open modal and show the team member details
    teamMembersElements.forEach(memberEl => {
        memberEl.addEventListener('click', () => {
            const memberId = memberEl.getAttribute('data-id');
            const memberData = teamMembers.find(member => member.id == memberId);

            // Fill modal with team member data
            modalName.textContent = memberData.name;
            modalRole.textContent = memberData.role;
            modalBio.textContent = memberData.bio;

            // Show modal
            modal.style.display = 'flex';
        });
    });

    // Close the modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside of it
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
