


document.addEventListener('DOMContentLoaded', function () {
    var paymentMethod = document.getElementById('payment-method');
    var paymentDiv = document.querySelector('.payment');
    var price = document.getElementById('price');
    var paymentInput = paymentDiv.querySelector('input');

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

    //verify mobile function
    async function verifyMobile(formData) {
        try {
            const response = await fetch(`/api/verify-mobile/${formData.category_id}/${formData.payment_number}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });


            if (!response.ok) {
                loader('', false);
                throw new Error('Network response was not ok');
                return;
            }

            const data = await response.json();

            // Handle response
            if (data.status === 'error') {
                loader('', false);
                notyf.error(data.message);
            } else {
                pay(formData);
            }

            // console.log("API Response:", data);

        } catch (error) {
            loader('', false);
            console.error("Error fetching:", error);
        }
    }

    function pay(formData) {
        try {
            loader("Enter PIN to complete MWK " + formData.price + ".", true);

            fetch('/api/process-deposit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': formData._token
                },
                body: JSON.stringify(formData)
            })
                .then(response => response.json())
                .then(data => {
                    // console.log('Payment response:', data);
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
                    if (error.errors) {
                        // error.errors is an object with field names as keys
                        let messages = Object.values(error.errors).flat().join('\\n');
                        alert('Validation errors:\\n' + messages);
                    } else {
                        alert('Submission failed: ' + (error.message || error));
                    }
                });
        } catch (error) {
            console.error("Error fetching:", error);
        }
    }

    // JavaScript function to check payment status
    async function checkStatus(formData, chargeId) {
        try {
            loader("Finalizing transaction...", true);

            const response = await fetch(`/api/check-status/${formData.category_id}/${formData.payment_number}/${encodeURIComponent(formData.name)}/${chargeId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // console.log('Status response:', data);

            if (data.response && data.response.data.status === "success") {
                loader('', false);
                notyf.success("Payment successful! Nomination completed.");
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

    // AJAX form submission
    var form = document.querySelector('.per-nominee');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        var csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        var formData = {
            name: encodeURIComponent(document.getElementById('name').value),
            payment_method: paymentMethod.value,
            price: price.value,
            payment_number: paymentInput.value,
            category_id: document.querySelector('input[name="category_id"]').value,
            _token: csrfToken
        };

        loader('Processing payment, please wait...', true);
        verifyMobile(formData);

    });
});
