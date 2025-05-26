// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Navbar background opacity on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });
    
    // Profile image upload functionality
    const profileImagePlaceholder = document.querySelector('.profile-image-placeholder');
    const profileImageInput = document.getElementById('profileImageInput');
    
    profileImagePlaceholder.addEventListener('click', function() {
        profileImageInput.click();
    });
    
    profileImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImagePlaceholder.innerHTML = `<img src="${e.target.result}" alt="Profile Picture">`;
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Resume download functionality
    const downloadResumeBtn = document.getElementById('downloadResume');
    
    downloadResumeBtn.addEventListener('click', function() {
        // Create resume content
        const resumeContent = generateResumeHTML();
        
        // Create a blob with the resume content
        const blob = new Blob([resumeContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Pilli_Raghava_Reddy_Resume.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show download notification
        showNotification('Resume downloaded successfully!', 'success');
    });
    
    // Floating elements animation
    const floatingElements = document.querySelectorAll('.float-element');
    
    function animateFloatingElements() {
        floatingElements.forEach((element, index) => {
            const speed = element.getAttribute('data-speed') || 1;
            const x = Math.sin(Date.now() * 0.001 * speed + index) * 20;
            const y = Math.cos(Date.now() * 0.001 * speed + index) * 15;
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
        requestAnimationFrame(animateFloatingElements);
    }
    
    animateFloatingElements();
    
    // Scroll animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Skill tags hover effect
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #ff6b6b, #00d4ff)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(45deg, #00d4ff, #0099cc)';
        });
    });
    
    // Project cards tilt effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
    
    // Typing effect for hero subtitle
    const subtitle = document.querySelector('.hero-subtitle');
    const originalText = subtitle.textContent;
    subtitle.textContent = '';
    
    function typeWriter(text, element, speed = 100) {
        let i = 0;
        element.style.borderRight = '2px solid #00d4ff';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        
        setTimeout(type, 1000);
    }
    
    typeWriter(originalText, subtitle, 80);
    
    // Contact form submission (if you want to add a contact form later)
    function handleContactForm() {
        // This can be implemented when you add a contact form
        console.log('Contact form functionality ready');
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .nav-link.active {
            color: #00d4ff !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
});

// Generate resume HTML content
function generateResumeHTML() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pilli Raghava Reddy - Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #00d4ff; padding-bottom: 20px; }
        .header h1 { color: #0a0a0a; font-size: 2.5rem; margin-bottom: 10px; }
        .header p { color: #666; font-size: 1.1rem; }
        .contact-info { display: flex; justify-content: center; gap: 20px; flex-wrap: wrap; margin-top: 15px; }
        .contact-info span { background: #f0f0f0; padding: 5px 10px; border-radius: 5px; font-size: 0.9rem; }
        .section { margin-bottom: 25px; }
        .section h2 { color: #00d4ff; border-bottom: 2px solid #00d4ff; padding-bottom: 5px; margin-bottom: 15px; }
        .education, .experience { margin-bottom: 15px; }
        .education h3, .experience h3 { color: #333; margin-bottom: 5px; }
        .date { color: #666; font-style: italic; }
        .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; }
        .skill-category h4 { color: #00d4ff; margin-bottom: 8px; }
        .skill-list { color: #666; }
        .achievements li { margin-bottom: 8px; }
        @media print { body { max-width: none; margin: 0; padding: 15px; } }
    </style>
</head>
<body>
    <div class="header">
        <h1>Pilli Raghava Reddy</h1>
        <p>Cybersecurity & Business Analytics Professional</p>
        <div class="contact-info">
            <span>📧 pilliraghavareddy6@gmail.com</span>
            <span>📱 +91 6305332059</span>
            <span>🔗 LinkedIn: pilli-raghava-reddy</span>
            <span>💻 GitHub: raghava2061</span>
        </div>
    </div>

    <div class="section">
        <h2>Summary</h2>
        <p>Dedicated Cybersecurity student with expertise in programming languages Python, C, HTML, CSS, R, and SQL, alongside proficiency in operating systems like Kali Linux and Windows. Experienced with industry-standard cybersecurity tools including Burp Suite, Wireshark, Nmap, Metasploit, Splunk, and PE Studio. Developed advanced skills in data analytics using Power BI and Excel. Seeking opportunities to leverage technical skills and hands-on experience in cybersecurity and business analytics.</p>
    </div>

    <div class="section">
        <h2>Education</h2>
        <div class="education">
            <h3>CSE-Cyber Security</h3>
            <p><strong>Parul University, Vadodara, Gujarat</strong></p>
            <p class="date">2022-2026</p>
        </div>
        <div class="education">
            <h3>Dual Degree in Business Analytics</h3>
            <p><strong>Parul University, Vadodara, Gujarat</strong></p>
            <p class="date">2024-2025</p>
        </div>
    </div>

    <div class="section">
        <h2>Technical Skills</h2>
        <div class="skills-grid">
            <div>
                <h4>Programming Languages</h4>
                <p class="skill-list">C, Python, R, SQL, JavaScript, HTML, CSS</p>
            </div>
            <div>
                <h4>Security Tools</h4>
                <p class="skill-list">Burp Suite, Metasploit, Nmap, Wireshark, Kali Linux, Splunk</p>
            </div>
            <div>
                <h4>Forensics Tools</h4>
                <p class="skill-list">FTK, Autopsy, EnCase, PE Studio</p>
            </div>
            <div>
                <h4>Analytics Tools</h4>
                <p class="skill-list">Power BI, Tableau, SPSS, Advanced Excel</p>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>Experience</h2>
        <div class="experience">
            <h3>Cyber Security and Penetration Testing Intern</h3>
            <p><strong>Hacktify</strong> | <span class="date">February 2025 – March 2025</span></p>
            <p>Gained hands-on experience in ethical hacking, using tools like Burp Suite, Nmap, and Metasploit for vulnerability assessment and penetration testing.</p>
        </div>
    </div>

    <div class="section">
        <h2>Certifications</h2>
        <ul>
            <li><strong>Introduction to Digital Forensics</strong> - Security Blue Team (March 2025)</li>
            <li><strong>Cybersecurity Job Simulation</strong> - MasterCard (April 2025)</li>
            <li><strong>Projects on Power BI</strong> - Infosys (February 2025)</li>
            <li><strong>Cyber Forensic and Ethical Hacking</strong> - Cyfo-Edu (November 2022)</li>
        </ul>
    </div>

    <div class="section">
        <h2>Achievements & Activities</h2>
        <ul class="achievements">
            <li>🏆 <strong>3rd Position in CTF HackArise</strong> by The HackersMeetup</li>
            <li>🏭 <strong>Industrial Visit:</strong> Regional Forensic Science Laboratory, Surat</li>
            <li>🎯 Active participation in cybersecurity competitions and workshops</li>
        </ul>
    </div>
</body>
</html>`;
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#00d4ff' : '#ff6b6b'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showNotification('🎉 Konami Code Activated! You found the easter egg!', 'success');
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

// Add rainbow animation
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);
