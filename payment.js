let selectedPaymentMethod = 'card';

// Select payment method
function selectPayment(method) {
    selectedPaymentMethod = method;
    const methodTitles = {
        'card': 'Credit/Debit Card',
        'upi': 'UPI Payment',
        'netbanking': 'Net Banking',
        'wallet': 'Digital Wallet'
    };

    document.getElementById('methodTitle').textContent = methodTitles[method];
    
    // Hide all payment forms
    document.querySelectorAll('.payment-method-form').forEach(form => {
        form.style.display = 'none';
    });
    
    // Show selected payment form
    const formId = method === 'netbanking' ? 'netbankingPayment' : method + 'Payment';
    document.getElementById(formId).style.display = 'block';
    
    // Show payment form section
    document.getElementById('payment-methods').style.display = 'none';
    document.getElementById('payment-form-section').style.display = 'block';
    
    // Scroll to form
    setTimeout(() => {
        document.getElementById('payment-form-section').scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

// Go back to payment methods
function backToMethods() {
    document.getElementById('payment-form-section').style.display = 'none';
    document.getElementById('payment-methods').style.display = 'block';
    document.getElementById('paymentForm').reset();
    document.getElementById('payment-methods').scrollIntoView({ behavior: 'smooth' });
}

// Update payment summary
function updateSummary() {
    const amount = parseFloat(document.getElementById('amount').value) || 0;
    const fee = amount * 0.02; // 2% processing fee
    const total = amount + fee;

    document.getElementById('summaryAmount').textContent = '₹' + amount.toFixed(2);
    document.getElementById('summaryFee').textContent = '₹' + fee.toFixed(2);
    document.getElementById('summaryTotal').textContent = '₹' + total.toFixed(2);
}

// Format card number
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryInput = document.getElementById('expiryDate');
    const cvvInput = document.getElementById('cvv');
    const amountInput = document.getElementById('amount');

    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue;
        });
    }

    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value;
        });
    }

    if (cvvInput) {
        cvvInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.replace(/\D/g, '');
        });
    }

    if (amountInput) {
        amountInput.addEventListener('input', updateSummary);
    }

    // Form submission
    document.getElementById('paymentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        processPayment();
    });
});

// Validate payment details
function validatePayment() {
    if (selectedPaymentMethod === 'card') {
        const cardName = document.getElementById('cardName').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        if (!cardName || cardNumber.length !== 16 || !expiryDate || cvv.length < 3) {
            return false;
        }
    } else if (selectedPaymentMethod === 'upi') {
        const upiId = document.getElementById('upiId').value.trim();
        if (!upiId.includes('@')) {
            return false;
        }
    } else if (selectedPaymentMethod === 'netbanking') {
        const bankSelect = document.getElementById('bankSelect').value;
        if (!bankSelect) {
            return false;
        }
    }
    return true;
}

// Process payment
function processPayment() {
    const amount = document.getElementById('amount').value;
    const email = document.getElementById('email').value;

    if (!validatePayment() || !amount || !email) {
        showModal('❌', 'Please fill in all required fields correctly.');
        return;
    }

    // Razorpay integration
    const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // Get from Razorpay dashboard
        amount: amount * 100, // Amount in paise
        currency: "INR",
        name: "Vansh",
        description: "Payment for services",
        image: "./unnamed.jpg",
        handler: function (response) {
            // Payment successful
            showModal('✅', `Payment successful!\nTransaction ID: ${response.razorpay_payment_id}`);
            document.getElementById('paymentForm').reset();
            updateSummary();
        },
        prefill: {
            email: email,
            contact: "9671766584"
        },
        theme: {
            color: "#6366f1"
        },
        modal: {
            ondismiss: function() {
                showModal('❌', 'Payment cancelled.');
            }
        }
    };

    const rzp1 = new Razorpay(options);
    rzp1.open();
}

// Show modal
function showModal(header, message) {
    document.getElementById('modalHeader').textContent = header;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('paymentModal').style.display = 'flex';
}

// Close modal
function closeModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

// Close modal on outside click
window.addEventListener('click', function(e) {
    const modal = document.getElementById('paymentModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});