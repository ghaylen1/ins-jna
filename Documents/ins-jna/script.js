async function run(event) {
    event.preventDefault();
    
    const phoneNumber = document.getElementById('telephone').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const btnLoading = document.getElementById('btnLoading');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const resultContent = document.getElementById('resultContent');
    
    // Hide messages
    successMessage.style.display = 'none';
    errorMessage.style.display = 'none';
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    
    try {
        // Call the backend API
        const apiUrl = window.location.hostname === 'localhost' 
            ? `http://localhost:3000/api/search?phone=${encodeURIComponent(phoneNumber)}`
            : `/api/search?phone=${encodeURIComponent(phoneNumber)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        if (data.success) {
            // Display student information
            resultContent.innerHTML = `
                <div class="student-info">
                    <p><strong>Nom complet:</strong> ${data.data.full_name}</p>
                    <p><strong>Établissement:</strong> ${data.data.university}</p>
                    <p><strong>Position:</strong> ${data.data.position || 'N/A'}</p>
                    <p><strong>Département:</strong> ${data.data.member || 'N/A'}</p>
                    <p><strong>Participe à JNA:</strong> ${data.data.participates_in_jna}</p>
                </div>
            `;
            successMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'block';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.style.display = 'block';
    } finally {
        // Hide loading state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
}
