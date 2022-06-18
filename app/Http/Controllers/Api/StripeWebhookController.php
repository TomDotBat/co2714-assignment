<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Str;
use Stripe\Event;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Webhook;
use UnexpectedValueException;

class StripeWebhookController extends Controller
{
    public function __invoke(Request $request)
    {
        try {
            $event = Webhook::constructEvent(
                $request->getContent(),
                $request->header('Stripe-Signature'),
                config('services.stripe.webhook')
            );
        } catch (UnexpectedValueException $exception) {
            abort(400);
        } catch (SignatureVerificationException $exception) {
            info($exception);
            abort(404);
        }

        $functionName = Str::camel(str_replace('.', '_', $event->type));

        if (! method_exists($this, $functionName)) {
            return;
        }

        info('Stripe webhook: '.$functionName);
        return $this->{$functionName}($event);
    }

    public function checkoutSessionCompleted(Event $event)
    {
        $session = $event->data->object;
        $sessionId = $session->id;

        if ($session->payment_status === 'paid') {
            Order::where('stripe_checkout_session_id', $sessionId)->update([
                'status' => 'PREPARING_FOOD',
            ]);
        }
    }

    public function checkoutSessionAsync_payment_succeeded(Event $event)
    {
        $session = $event->data->object;
        $sessionId = $session->id;

        Order::where('stripe_checkout_session_id', $sessionId)->update([
            'status' => 'PREPARING_FOOD',
        ]);
    }

    public function checkoutSessionAsync_payment_failed(Event $event)
    {
        $session = $event->data->object;
        $sessionId = $session->id;

        Order::where('stripe_checkout_session_id', $sessionId)->update([
            'status' => 'PAYMENT_FAILED',
        ]);
    }
}
