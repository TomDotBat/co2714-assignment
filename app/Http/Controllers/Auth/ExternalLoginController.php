<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Laravel\Socialite\Facades\Socialite;

class ExternalLoginController extends Controller
{
    public function redirectToProvider(string $provider)
    {
        switch ($provider) {
            case "google":
            case "discord":
            case "github":
                return Socialite::driver($provider)->redirect();
            default:
                abort(400, "Invalid OAuth provider.");
        }
    }

    public function handleProviderCallback(string $provider): RedirectResponse
    {
        switch ($provider) {
            case "google":
            case "discord":
            case "github":
                $providerResponse = Socialite::driver($provider)->user();
                break;
            default:
                abort(400, "Invalid OAuth provider.");
        }

        $user = User::firstOrCreate(
            ['email' => $providerResponse->getEmail()],
            ['name' => $providerResponse->getName()]
        );

        auth()->login($user);
        session()->regenerate(true);

        return redirect()->route('home');
    }
}
