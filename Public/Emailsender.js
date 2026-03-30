(function () {
    function init() {
        const Form_Email = document.getElementById('Form_Email');
        const Alert_Ms = document.getElementById('Alert_msj');

        function Show_Alert(message = '', type = 'error') {
            if (!Alert_Ms) {
                console.warn('Alert element #Alert_msj not found, falling back to window.alert');
                try { window.alert(message); } catch (e) { /* ignore */ }
                return;
            }
            Alert_Ms.className = '';
            Alert_Ms.classList.add('rounded', 'p-3', 'text-sm');
            if (type === 'error') {
                Alert_Ms.classList.add('bg-red-50', 'text-red-700');
            } else {
                Alert_Ms.classList.add('bg-green-50', 'text-green-700');
            }
            Alert_Ms.textContent = message;
            Alert_Ms.classList.remove('hidden');
        }
        function clearAlert() {
            if (!Alert_Ms) return;
            Alert_Ms.classList.add('hidden');
            Alert_Ms.textContent = '';
        }

        function Validate_Email(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }


    function SendEmail() {
        var params = {
            FullName: document.getElementById("FullName").value,
            Email_user: document.getElementById("Email").value,
            PhoneUser: document.getElementById("PhoneUser").value,
            subject: document.getElementById("OptionSubject").value,
            Message: document.getElementById("Message").value,
        };
        if (!Form_Email) return Show_Alert('Formulario no encontrado.', 'error');

        // basic validation
        if (!params.FullName || params.FullName.trim().length < 2) {
            return Show_Alert('Por favor ingresa tu nombre completo.', 'error');
        }
        if (!params.Email_user || !Validate_Email(params.Email_user)) {
            return Show_Alert('Por favor ingresa un correo válido.', 'error');
        }
        if (!params.Message || params.Message.trim().length < 5) {
            return Show_Alert('El mensaje es muy corto.', 'error');
        }

        if (typeof emailjs === 'undefined' || !emailjs.send) {
            console.error('EmailJS no está disponible:', window.emailjs);
            return Show_Alert('Email service not loaded. Recarga la página.', 'error');
        }

        const ServiceID = "service_bix3rs4";
        const templateID = "template_2ivshci";

        // disable send button to prevent duplicate submits
        const sendBtn = Form_Email.querySelector('button[type="button"]');
        const origBtnText = sendBtn ? sendBtn.innerHTML : null;
        if (sendBtn) {
            sendBtn.disabled = true;
            sendBtn.classList.add('opacity-60', 'cursor-not-allowed');
            sendBtn.innerHTML = 'Enviando...';
        }

        clearAlert();

        emailjs.send(ServiceID, templateID, params)
            .then(res => {
                console.log('EmailJS success:', res);
                document.getElementById("FullName").value = "";
                document.getElementById("Email").value = "";
                document.getElementById("PhoneUser").value = "";
                document.getElementById("OptionSubject").value = "";
                document.getElementById("Message").value = "";
                Show_Alert('Mensaje enviado correctamente.', 'success');
            })
            .catch(err => {
                console.error('EmailJS error:', err);
                const msg = err && (err.text || err.message || err.statusText) ? (err.text || err.message || err.statusText) : 'No se pudo enviar el mensaje. Revisa la consola.';
                Show_Alert(msg, 'error');
            })
            .finally(() => {
                if (sendBtn) {
                    sendBtn.disabled = false;
                    sendBtn.classList.remove('opacity-60', 'cursor-not-allowed');
                    if (origBtnText !== null) sendBtn.innerHTML = origBtnText;
                }
            });

    }


        window.SendEmail = SendEmail;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();


