## Starting the application
```bash
php artisan serve 
npm watch
stripe listen --forward-to http://127.0.0.1:8000/api/stripe/webhook
```

## Order status
### awaiting_payment
waiting for stripe to say the orders was paid

### preparing_food
the order has been paid for but is not cooked yet

## Stripe test cards
### Success
`4242 4242 4242 4242`

### Fail
`4000 0000 0000 9995`

### 3D secure
`4000 0025 0000 3155`
