function getWorkshopNumber(position) {
    if (!position) return null;
    
    const positionLower = position.toLowerCase();
    
    // Workshop 1: Presidents and Vice Presidents
    if (positionLower.includes('président') || positionLower.includes('vice president')) {
        return 1;
    }
    
    // Workshop 2: Secrétaire général
    if (positionLower.includes('secrétaire général')) {
        return 2;
    }
    
    // Workshop 3: Responsable RH
    if (positionLower.includes('responsable rh') || positionLower.includes('assistant rh')) {
        return 3;
    }
    
    // Workshop 4: Responsable Event
    if (positionLower.includes('responsable event') || positionLower.includes('assistant event')) {
        return 4;
    }
    
    // Workshop 5: Responsable Partenariat
    if (positionLower.includes('responsable partenariat') || positionLower.includes('assistant partenariat')) {
        return 5;
    }
    
    // Workshop 6: Responsable Communication
    if (positionLower.includes('responsable communication') || positionLower.includes('assistant communication')) {
        return 6;
    }
    
    return null;
}

function getWorkshopName(workshopNumber) {
    const workshops = {
        1: 'Présidents et Vices',
        2: 'Secrétaire Général(e)',
        3: 'Responsable RH',
        4: 'Responsable Event',
        5: 'Responsable Partenariat',
        6: 'Responsable Communication'
    };
    
    return workshops[workshopNumber] || 'Non assigné';
}

async function run(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('telephone').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const resultContent = document.getElementById('resultContent');
    
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    
    try {
        const apiUrl = `/.netlify/functions/search?phone=${encodeURIComponent(phoneNumber)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.success) {
            const workshopNumber = getWorkshopNumber(data.data.position);
            const workshopName = workshopNumber ? getWorkshopName(workshopNumber) : 'Non assigné';
            
            let workshopHTML = '';
            if (workshopNumber) {
                workshopHTML = `
                    <div class="workshop-badge">
                        <div class="workshop-number">Atelier ${workshopNumber}</div>
                        <div class="workshop-name">${workshopName}</div>
                    </div>
                `;
            }
            
            resultContent.innerHTML = `
                <div class="student-info">
                    <p><strong>Nom complet:</strong> ${data.data.full_name}</p>
                    <p><strong>Établissement:</strong> ${data.data.university}</p>
                    <p><strong>Position:</strong> ${data.data.position || 'N/A'}</p>
                    <p><strong>Département:</strong> ${data.data.member || 'N/A'}</p>
                    <p><strong>Participe à JNA:</strong> ${data.data.participates_in_jna}</p>
                </div>
                ${workshopHTML}
            `;
            successMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
    } finally {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}
