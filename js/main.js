// Domain-based branding configuration
const BRAND_CONFIG = {
    'staycoolairco.nl': {
        name: 'StayCool Airco',
        shortName: 'SC',
        tagline: 'Uw Airco Specialist',
        phone: '046 202 1430',
        whatsapp: '31636481054',
        email: 'info@staycoolairco.nl',
        address: {
            street: 'Aan de Bogen 11',
            city: '6118 AS Nieuwstadt'
        }
    },
    'aircomontagelimburg.nl': {
        name: 'Airco Montage Limburg',
        shortName: 'AM',
        tagline: 'Limburg',
        phone: '046 202 1430',
        whatsapp: '31636481054',
        email: 'info@aircomontagelimburg.nl',
        address: {
            street: 'Aan de Bogen 11',
            city: '6118 AS Nieuwstadt'
        }
    }
};

// Get current domain and brand config
function getCurrentBrand() {
    const hostname = window.location.hostname.toLowerCase();
    
    // For local development, check URL parameter or default to aircomontagelimburg
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        const urlParams = new URLSearchParams(window.location.search);
        const brand = urlParams.get('brand');
        return BRAND_CONFIG[brand] || BRAND_CONFIG['aircomontagelimburg.nl'];
    }
    
    // Check if hostname matches any configured brand
    for (const domain in BRAND_CONFIG) {
        if (hostname.includes(domain.replace('.nl', ''))) {
            return BRAND_CONFIG[domain];
        }
    }
    
    // Default to aircomontagelimburg
    return BRAND_CONFIG['aircomontagelimburg.nl'];
}

// Apply branding to the page
function applyBranding() {
    const brand = getCurrentBrand();
    
    // Update brand icons
    const brandIcons = document.querySelectorAll('.brand-icon');
    brandIcons.forEach(icon => {
        icon.textContent = brand.shortName;
    });
    
    // Update brand text
    const brandTexts = document.querySelectorAll('.brand-text strong');
    brandTexts.forEach(text => {
        text.textContent = brand.name;
    });
    
    // Update brand tagline
    const brandTaglines = document.querySelectorAll('.brand-text small');
    brandTaglines.forEach(tagline => {
        tagline.textContent = brand.tagline;
    });
    
    // Update phone numbers
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        const phoneNumber = brand.phone.replace(/\s/g, '');
        link.href = `tel:${phoneNumber}`;
        if (link.querySelector('.bi-telephone')) {
            link.innerHTML = `<i class="bi bi-telephone"></i> ${brand.phone}`;
        } else if (link.textContent.includes('046') || link.textContent.includes('Bel')) {
            link.textContent = link.textContent.replace(/046\s?\d{3}\s?\d{4}/, brand.phone);
        }
    });
    
    // Update WhatsApp links
    const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        const message = encodeURIComponent('Hallo, ik wil graag een offerte voor airco installatie.');
        link.href = `https://wa.me/${brand.whatsapp}?text=${message}`;
    });
    
    // Update address texts
    const addressTexts = document.querySelectorAll('p:not([class]), li:not([class])');
    addressTexts.forEach(elem => {
        if (elem.textContent.includes('Aan de Bogen 11')) {
            elem.innerHTML = elem.innerHTML.replace(/Aan de Bogen 11<br>6118 AS Nieuwstadt/, 
                `${brand.address.street}<br>${brand.address.city}`);
        }
    });
    
    // Update copyright text
    const copyrightTexts = document.querySelectorAll('.text-white-50 p, .text-center p');
    copyrightTexts.forEach(elem => {
        if (elem.textContent.includes('© 2024')) {
            elem.textContent = elem.textContent.replace(/Airco Montage Limburg/g, brand.name);
        }
    });
    
    // Update all text content that mentions the brand
    const allTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, p, span, a, li');
    allTextElements.forEach(elem => {
        if (elem.childNodes.length === 1 && elem.childNodes[0].nodeType === Node.TEXT_NODE) {
            if (elem.textContent.includes('Airco Montage Limburg')) {
                elem.textContent = elem.textContent.replace(/Airco Montage Limburg/g, brand.name);
            }
        }
    });
    
    // Update page title
    if (document.title.includes('Airco Montage Limburg')) {
        document.title = document.title.replace('Airco Montage Limburg', brand.name);
    } else if (document.title.includes('StayCool Airco')) {
        document.title = document.title.replace('StayCool Airco', brand.name);
    }
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && metaDescription.content.includes('Airco Montage Limburg')) {
        metaDescription.content = metaDescription.content.replace('Airco Montage Limburg', brand.name);
    }
    
    // Update Schema.org structured data
    updateStructuredData(brand);
}

// Update Schema.org structured data based on brand
function updateStructuredData(brand) {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => {
        try {
            let data = JSON.parse(script.textContent);
            
            // Update HVACBusiness schema
            if (data['@type'] === 'HVACBusiness' || data['@type'] === 'LocalBusiness') {
                data.name = brand.name;
                data.url = `https://${window.location.hostname}`;
                data.telephone = brand.phone.replace(/\s/g, '');
                data.email = brand.email;
                data.address = {
                    '@type': 'PostalAddress',
                    streetAddress: brand.address.street,
                    addressLocality: brand.address.city.split(' ')[2] || 'Nieuwstadt',
                    postalCode: brand.address.city.split(' ')[0] || '6118',
                    addressRegion: 'Limburg',
                    addressCountry: 'NL'
                };
            }
            
            // Update FAQPage schema
            if (data['@type'] === 'FAQPage') {
                data.mainEntity.forEach(faq => {
                    if (faq.acceptedAnswer && faq.acceptedAnswer.text) {
                        faq.acceptedAnswer.text = faq.acceptedAnswer.text.replace(/Airco Montage Limburg/g, brand.name);
                    }
                });
            }
            
            // Update the script content
            script.textContent = JSON.stringify(data, null, 2);
        } catch (e) {
            console.error('Error updating structured data:', e);
        }
    });
}

// EmailJS Configuration
const EMAILJS_SERVICE_ID = 'service_1rruujp';
const EMAILJS_TEMPLATE_ID = 'template_rkcpzhg';
const EMAILJS_PUBLIC_KEY = 'sjJ8kK6U9wFjY0zX9';

// GoHighLevel Webhook Configuration
const WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/k90zUH3RgEQLfj7Yc55b/webhook-trigger/54670718-ea44-43a1-a81a-680ab3d5f67f';

// Debug mode - set to false in production
const DEBUG_MODE = false;

// Initialize EmailJS when it's loaded
let emailJsReady = false;

function initializeEmailJS() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        emailJsReady = true;
        return true;
    }
    return false;
}

// Wait for EmailJS to load
function waitForEmailJS(callback) {
    if (initializeEmailJS()) {
        callback();
    } else {
        setTimeout(() => waitForEmailJS(callback), 100);
    }
}

// Enhanced webhook function with proper error handling and timeouts
async function sendToWebhook(data) {
    const startTime = Date.now();
    let controller;
    
    try {
        // Input validation
        if (!data || !data.name || !data.email) {
            console.warn('❌ Invalid webhook data - missing required fields');
            return false;
        }

        const webhookData = {
            data: {
                name: data.name || '',
                email: data.email || '',
                phone: data.phone || '',
                city: data.city || data.woonplaats || '',
                message: data.message || data.bericht || 'Geen bericht opgegeven'
            }
        };

        if (DEBUG_MODE) {
            console.log('📤 Sending webhook data:', webhookData);
        }

        // Create abort controller for timeout handling
        controller = new AbortController();
        const timeoutId = setTimeout(() => {
            controller.abort();
            console.warn('❌ Webhook timeout after 10 seconds');
        }, 10000);

        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            signal: controller.signal,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'AircoMontage-Website/1.0',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(webhookData)
        });

        clearTimeout(timeoutId);
        const responseTime = Date.now() - startTime;

        if (DEBUG_MODE) {
            console.log(`📥 Webhook response: ${response.status} ${response.statusText} (${responseTime}ms)`);
        }

        if (!response.ok) {
            let errorDetails = `Status: ${response.status} ${response.statusText}`;
            
            try {
                const responseText = await response.text();
                if (responseText) {
                    errorDetails += ` | Response: ${responseText.substring(0, 200)}`;
                }
            } catch (e) {
                errorDetails += ` | Could not read response body`;
            }
            
            console.error('❌ Webhook failed:', errorDetails);
            
            // Track different error types
            if (response.status === 400) {
                console.error('❌ Bad Request - Check data format');
            } else if (response.status === 401) {
                console.error('❌ Unauthorized - Check webhook URL');
            } else if (response.status === 403) {
                console.error('❌ Forbidden - Check permissions');
            } else if (response.status >= 500) {
                console.error('❌ Server Error - GoHighLevel may be down');
            }
            
            return false;
        }
        
        // Try to read response for additional info
        try {
            const responseText = await response.text();
            if (DEBUG_MODE && responseText) {
                console.log('✅ Webhook response body:', responseText);
            }
        } catch (e) {
            // Response body not readable, but request was successful
            if (DEBUG_MODE) {
                console.log('✅ Webhook successful (no response body)');
            }
        }

        console.log(`✅ Webhook sent successfully in ${responseTime}ms`);
        return true;
        
    } catch (error) {
        const responseTime = Date.now() - startTime;
        
        if (error.name === 'AbortError') {
            console.error(`❌ Webhook timeout after ${responseTime}ms`);
        } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
            console.error('❌ Network error - check internet connection');
        } else {
            console.error('❌ Webhook error:', error.message);
        }
        
        if (DEBUG_MODE) {
            console.error('❌ Full error:', error);
        }
        
        return false;
    } finally {
        if (controller) {
            controller = null;
        }
    }
}

// Apply branding when DOM is loaded
document.addEventListener('DOMContentLoaded', applyBranding);

// Navbar scroll effect and active link highlighting
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    // Navbar background change
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typewriter effect
const typewriterTexts = [
    'Airco Installatie',
    'Airco Onderhoud',
    'Airco Reparatie',
    'Klimaatbeheersing'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterElement = document.getElementById('typewriter-text');

function typeWriter() {
    const currentText = typewriterTexts[textIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typeSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typewriterTexts.length;
        typeSpeed = 500; // Pause before typing new word
    }
    
    setTimeout(typeWriter, typeSpeed);
}

// Start typewriter effect
document.addEventListener('DOMContentLoaded', typeWriter);

// Mobile CTA Banner
let lastScrollTop = 0;
const mobileCTA = document.querySelector('.mobile-cta');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 500 && scrollTop > lastScrollTop) {
        // Scrolling down and past hero
        mobileCTA?.classList.add('show');
    } else if (scrollTop < lastScrollTop || scrollTop < 100) {
        // Scrolling up or near top
        mobileCTA?.classList.remove('show');
    }
    
    lastScrollTop = scrollTop;
});

// Form validation and submission
function setupForm(formId, formType) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    // Check if form is already initialized
    if (form.dataset.initialized === 'true') {
        console.log(`Form ${formId} already initialized, skipping...`);
        return;
    }
    
    // Mark form as initialized
    form.dataset.initialized = 'true';
    
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Validate form
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        
        submitBtn.disabled = true;
        btnText?.classList.add('d-none');
        btnLoading?.classList.remove('d-none');
        
        // Get current brand for email
        const brand = getCurrentBrand();
        
        // Prepare email parameters with fallbacks
        const templateParams = {
            // Primary fields
            from_name: data.name || '',
            from_email: data.email || '',
            phone: data.phone || '',
            service: data.service || '',
            message: data.message || 'Geen bericht opgegeven',
            subject: `${formType} aanvraag via ${window.location.hostname}`,
            to_name: brand.name,
            reply_to: data.email || '',
            
            // Additional fields
            address: data.address || '',
            city: data.city || '',
            property_type: data.property_type || '',
            rooms: data.rooms || '',
            availability: data.availability || '',
            date: data.date || '',
            project: data.project || '',
            product_interest: data.product_interest || '',
            
            // Dutch field names (sommige templates gebruiken deze)
            naam: data.name || '',
            email: data.email || '',
            telefoon: data.phone || '',
            dienst: data.service || '',
            bericht: data.message || 'Geen bericht opgegeven',
            woonplaats: data.city || data.address || '',
            postcode: data.address || '',
            type_woning: data.property_type || '',
            aantal_kamers: data.rooms || '',
            beschikbaarheid: data.availability || '',
            datum: data.date || '',
            project_type: data.project || '',
            
            // Complete message as backup
            full_message: `
Nieuwe aanvraag via ${window.location.hostname}:
Naam: ${data.name || 'Niet opgegeven'}
Email: ${data.email || 'Niet opgegeven'}
Telefoon: ${data.phone || 'Niet opgegeven'}
Woonplaats: ${data.city || data.address || 'Niet opgegeven'}
Postcode/Adres: ${data.address || 'Niet opgegeven'}
Type woning: ${data.property_type || 'Niet opgegeven'}
Aantal kamers: ${data.rooms || 'Niet opgegeven'}
Beschikbaarheid: ${data.availability || 'Niet opgegeven'}
Datum: ${data.date || 'Niet opgegeven'}
Project type: ${data.project || 'Niet opgegeven'}
Product interesse: ${data.product_interest || 'Niet opgegeven'}
Dienst: ${data.service || 'Niet opgegeven'}
Bericht: ${data.message || 'Geen bericht opgegeven'}
            `.trim()
        };
        
        try {
            // Dual submission system: send to both EmailJS and webhook
            let emailJsSuccess = false;
            let webhookSuccess = false;
            
            // Try to send via EmailJS
            if (emailJsReady) {
                try {
                    const response = await emailjs.send(
                        EMAILJS_SERVICE_ID,
                        EMAILJS_TEMPLATE_ID,
                        templateParams
                    );
                    
                    if (response.status === 200) {
                        emailJsSuccess = true;
                        console.log('EmailJS sent successfully');
                    }
                } catch (emailError) {
                    console.error('EmailJS Error:', emailError);
                }
            }
            
            // Try to send to webhook
            try {
                webhookSuccess = await sendToWebhook(data);
            } catch (webhookError) {
                console.error('Webhook Error:', webhookError);
            }
            
            // Check if at least one method succeeded
            if (emailJsSuccess || webhookSuccess) {
                // Success - at least one method worked
                showAlert(form, 'success', '✓ Bedankt voor uw aanvraag! Wij nemen binnen 24 uur contact met u op.');
                form.reset();
                form.classList.remove('was-validated');
                
                console.log(`Form submitted successfully - EmailJS: ${emailJsSuccess}, Webhook: ${webhookSuccess}`);
            } else {
                // Both methods failed
                throw new Error('Both EmailJS and webhook failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showAlert(form, 'danger', `Er ging iets mis bij het versturen. Probeer het opnieuw of bel ons direct op ${brand.phone}.`);
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            btnText?.classList.remove('d-none');
            btnLoading?.classList.add('d-none');
        }
    });
}

// Show alert message
function showAlert(form, type, message) {
    const alertContainer = form.closest('form').nextElementSibling;
    if (!alertContainer || !alertContainer.classList.contains('alert-container')) return;
    
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
    
    // Auto-dismiss after 10 seconds
    setTimeout(() => {
        alert.remove();
    }, 10000);
}

// Forms will be initialized when EmailJS is ready (see below)

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.getElementById('mainNav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu on link click
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn?.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Lazy loading for performance (only for images with data-src)
const lazyImages = document.querySelectorAll('img[data-src]');
if ('IntersectionObserver' in window && lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Initialize forms when EmailJS is ready
document.addEventListener('DOMContentLoaded', function() {
    waitForEmailJS(function() {
        // Setup forms
        setupForm('heroForm', 'Hero');
        setupForm('contactForm', 'Contact');
    });
});