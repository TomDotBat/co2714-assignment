## Order status
 - awaiting_payment - waiting for stripe to say the orders was paid
 - preparing_food - the order has been paid for but is not cooked yet

## Stripe Test cards

### Succeed
Fill in the credit card form using the credit card number `4242 4242 4242 4242` with any expiry, CVC, and postal code.

### Succeed with 3D secure
Fill in the credit card form using the credit card number `4000 0025 0000 3155` with any expiry, CVC, and postal code.

### Fail
Fill in the credit card form using the credit card number `4000 0000 0000 9995` with any expiry, CVC, and postal code.
