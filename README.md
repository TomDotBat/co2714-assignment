## Starting the application
```bash
php artisan serve 
npm watch
stripe listen --forward-to http://127.0.0.1:8000/api/stripe/webhook
```

## Order status
### AWAITING_PAYMENT
Waiting for the user to pay with stripe.

### PREPARING_FOOD
The payment has gone through and food preparation has begun.

### PAYMENT_FAILED
The order was not paid for successfully.

## Stripe test cards
### Success
`4242 4242 4242 4242`

### Fail
`4000 0000 0000 9995`

### 3D secure
`4000 0025 0000 3155`
