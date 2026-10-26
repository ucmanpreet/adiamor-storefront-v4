export default {
    custom: {
        billing__name: {
            required: () => "First Name is required."
        },
        billing_last_name: {
            required: () => "Last Name is required."
        },
        // email: {
        //     required: () => "Email Address is required.",
        //     email: () => "Email Address must be a valid email."
        // },
        phone: {
            required: () => "Phone Number is required."
        },
        billing_address: {
            required: () => "Address is required."
        },
        billing_city: {
            required: () => "City is required."
        },
        billing_state: {
            required: () => "State is required."
        },
        billing_postcode: {
            required: () => "Zipcode is required.",
            postcode: () => "Zipcode is Invalid."
        },
        country: {
            required: () => "Country is required."
        },
        shipping_name: {
            required: () => "First Name is required."
        },
        shipping_last_name: {
            required: () => "Last Name is required."
        },
        shipping_address: {
            required: () => "Address Line 1 is required."
        },
        shipping_city: {
            required: () => "City is required."
        },
        shipping_country: {
            required: () => "Country is required."
        },
        shipping_state: {
            required: () => "State is required."
        },
        shipping_postal_code: {
            required: () => "Zipcode is required.",
            postcode: () => "Zipcode is Invalid."
        },
        billing_country: {
            required: () => "Country is required."
        },
        paymentMethod: {
            required: () => "Please select a payment method before proceeding with your order."
        },
        firstName: {
            required: () => "First Name is required."
        },
        lastName: {
            required: () => "Last Name is required."
        },
        email: {
            required: () => "Email Address is required.",
            email: () => "Invalid Email Address."
        },
        password: {
            required: () => "Password must be at least 6 characters",
            min: () => "Password must be at least 6 characters"
        },
        password_confirmation: {
            required: () => "Passwords entered do not match.",
            confirmed: () => "Passwords entered do not match."
        },
        loginEmail: {
            required: () => "Email Address is required.",
            email: () => "Invalid Email Address."
        },
        loginPassword: {
            required: () => "Password is required.",
            min: () => "Password must be at least 6 characters"
        }
    }
};