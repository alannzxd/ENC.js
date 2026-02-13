document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const codeInput = document.getElementById('codeInput');
    const fileUpload = document.getElementById('fileUpload');
    const encryptBtn = document.getElementById('encryptBtn');
    const terminalLog = document.getElementById('terminalLog');
    const resultCode = document.getElementById('resultCode');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    // Parameter inputs
    const paramDays = document.getElementById('paramDays');
    const paramIntensity = document.getElementById('paramIntensity');
    const paramSize = document.getElementById('paramSize');
    const paramCustomName = document.getElementById('paramCustomName');

    // State
    let selectedMode = 'enc'; // default

    // --- Terminal Logger ---
    function log(message, type = 'info') {
        const entry = document.createElement('div');
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        entry.innerHTML = `<span style="color:#00f7ff;">[${timestamp}]</span> <span style="color:${type === 'error' ? '#ff66aa' : '#b0ffb0'};">${message}</span>`;
        terminalLog.appendChild(entry);
        terminalLog.scrollTop = terminalLog.scrollHeight;
    }

    // --- File Upload Handler ---
    fileUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.name.endsWith('.js') && !file.name.endsWith('.mjs') && !file.name.endsWith('.txt')) {
            log('❌ Only .js files are allowed!', 'error');
            fileUpload.value = '';
            return;
        }
        const reader = new FileReader();
        reader.onload = (ev) => {
            codeInput.value = ev.target.result;
            log(`📁 Loaded file: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
        };
        reader.readAsText(file);
    });

    // --- Mode Selection ---
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedMode = btn.dataset.mode;
            log(`🔧 Mode set to: ${btn.dataset.mode}`, 'info');
        });
    });
    // Set default active
    document.querySelector('[data-mode="enc"]').classList.add('active');

    // --- Encrypt Action ---
    encryptBtn.addEventListener('click', async () => {
        const code = codeInput.value.trim();
        if (!code) {
            log('❌ No code to encrypt! Paste JavaScript code first.', 'error');
            return;
        }

        // Disable button during process
        encryptBtn.disabled = true;
        encryptBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> PROCESSING...';

        // Build request payload
        const payload = {
            code: code,
            mode: selectedMode,
            days: paramDays.value ? parseInt(paramDays.value) : 7,
            intensity: paramIntensity.value ? parseInt(paramIntensity.value) : 7,
            size: paramSize.value ? parseInt(paramSize.value) : 5,
            customName: paramCustomName.value.trim() || 'AlannXD'
        };

        log('🚀 Sending encryption request to server...');
        
        try {
            const response = await fetch('/api/encrypt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Unknown server error');
            }

            const data = await response.json();
            log('✅ Encryption successful! Obfuscated code ready.', 'success');
            resultCode.textContent = data.obfuscatedCode;
        } catch (error) {
            log(`❌ ERROR: ${error.message}`, 'error');
            resultCode.textContent = '// Encryption failed. Check terminal log.';
        } finally {
            encryptBtn.disabled = false;
            encryptBtn.innerHTML = '<i class="fas fa-lock"></i> ENCRYPT NOW';
        }
    });

    // --- Copy to Clipboard ---
    copyBtn.addEventListener('click', () => {
        const text = resultCode.textContent;
        if (text === '// Encrypted code will appear here...') {
            log('⚠️ Nothing to copy!', 'error');
            return;
        }
        navigator.clipboard.writeText(text).then(() => {
            log('📋 Code copied to clipboard!');
        }).catch(() => {
            log('❌ Copy failed', 'error');
        });
    });

    // --- Download as .js file ---
    downloadBtn.addEventListener('click', () => {
        const text = resultCode.textContent;
        if (text === '// Encrypted code will appear here...') {
            log('⚠️ Nothing to download!', 'error');
            return;
        }
        const blob = new Blob([text], { type: 'application/javascript' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `obfuscated-${selectedMode}.js`;
        a.click();
        URL.revokeObjectURL(url);
        log('💾 File downloaded.');
    });

    // Initial log
    log('HOLOW ENCRYPTOR ready. Select a mode and encrypt.');
});
