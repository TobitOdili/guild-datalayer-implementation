document.addEventListener('DOMContentLoaded', function() {
    window.dataLayer = window.dataLayer || [];

    function setSubmissionFlag(formType) {
        sessionStorage.setItem('formSubmissionType', formType);
    }

    function checkFormSubmissionResult() {
        var formType = sessionStorage.getItem('formSubmissionType');
        if (!formType) return;

        setTimeout(function() {
            var interactionResponse = checkForErrors() ? 'failed' : 'success';
            var buttonText = (formType === 'login') ? 'Log in' : (formType === 'register') ? 'Register' : 'Reset password';

            window.dataLayer.push({
                event: 'account_interaction',
                click_text: buttonText,
                interaction_type: formType,
                interaction_response: interactionResponse
            });

            console.log("Data layer updated for " + formType + " interaction: " + interactionResponse);
            sessionStorage.removeItem('formSubmissionType');
        }, 500);
    }

    function checkForErrors() {
        var errorNotice = document.querySelector('.woocommerce-notices-wrapper .wc-block-components-notice-banner.is-error');
        return errorNotice !== null;
    }

    checkFormSubmissionResult();

    var loginForm = document.querySelector('.woocommerce-form-login');
    if (loginForm) {
        loginForm.addEventListener('submit', function() {
            setSubmissionFlag('login');
        });
    }

    var registerForm = document.querySelector('.woocommerce-form-register');
    if (registerForm) {
        registerForm.addEventListener('submit', function() {
            setSubmissionFlag('register');
        });
    }

    var forgotPasswordForm = document.querySelector('.woocommerce-ResetPassword');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function() {
            setSubmissionFlag('forgot_password');
        });
    }
});