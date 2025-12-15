document.addEventListener('DOMContentLoaded', function () {
    function loader(message, boolean) {
        const loaderContainer = document.querySelector('.loader-content');
        const loaderContent = document.querySelector('.loader-content h6');

        if (boolean) {
            loaderContent.textContent = message;
            loaderContainer.style.display = 'flex';
        } else {
            loaderContainer.style.display = 'none';
        }
    }

    // JavaScript function to check payment status
    async function checkStatus(formData, chargeId) {
        try {
            loader("Finalizing transaction...", true);
            formData.charge_id = chargeId;

            const response = await fetch('/api/verify-ticket-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': formData._token
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            console.log('Status response:', data);

            if (data.response && data.response.data.status === "success") {
                loader('', false);

                notyf.success("Payment successful! Generating your ticket...");

                if (data.refresh) {
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000); // Adjust the delay as needed
                }

            } else if (data.response && data.response.data.status === "failed") {
                loader('', false);
                notyf.error("Payment failed. Please try again.");
            } else {
                checkStatus(formData, chargeId); // Retry after a delay
            }
            // return data;
        } catch (error) {
            console.error('Error checking status:', error);
            return {
                error: error.message
            };
        }
    }

    var form = document.getElementById('ticketForm');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        var name = document.getElementById('name');
        var mobile = document.getElementById('mobile');
        var ticketType = document.getElementById('ticket_type');
        var email = document.getElementById('email');
        var code = document.getElementById('code');
        var paymentMethod = document.getElementById('payment-method');
        var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

        var formData = {
            name: name.value,
            mobile: mobile.value,
            ticketType: ticketType.value,
            email: email.value,
            paymentMethod: paymentMethod.value,
            code: code.value,
            _token: csrfToken
        };

        loader('Processing payment, please wait...', true);

        fetch('/api/process-ticket-payment', {
            // loader("Enter PIN to complete MWK " + formData.price + ".", true);
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': formData._token
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);

                if (data.error === null) {
                    if (data.response && data.response.status === "success") {
                        checkStatus(formData, data.response.data.charge_id);
                    } else if (data.response && data.response.status === "failed") {
                        loader('', false);

                        if (data.response && data.response.message) {
                            const msgObj = data.response.message;

                            if (typeof msgObj === 'string') {
                                notyf.error(msgObj);

                            } else if (typeof msgObj === 'object') {
                                const firstKey = Object.keys(msgObj)[0];
                                const value = msgObj[firstKey];

                                if (Array.isArray(value)) {
                                    notyf.error(value[0]);
                                } else {
                                    notyf.error(value);
                                }
                            } else {
                                console.log("Unexpected message format:", msgObj);
                                notyf.error("Unexpected error response!");
                            }
                        }
                    } else if (data.status === 'error') {
                        loader('', false);
                        notyf.error(data.message);
                    } else {
                        loader('', false);
                        notyf.error("Unexpected response structure!");
                    }
                } else {
                    const nestedObject = data["error"];
                    const firstNestedKey = Object.keys(nestedObject)[0];
                    const firstNestedValue = nestedObject[firstNestedKey];
                    notyf.error(firstNestedValue);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                notyf.error('An error occurred while processing your request.');
                loader('', false);
            });
    });
});
