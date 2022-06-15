<?php

namespace App\Traits;

use Stripe\Stripe;

trait UsesStripe
{
    private function setupStripe(): void
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }
}
