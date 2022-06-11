<?php

namespace App\Http\Requests\Auth;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class InternalRegistrationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|min:3|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => [
                'required',
                'confirmed',
                Password::min(5)
                    ->letters()
                    ->numbers()
                    ->mixedCase()
                    ->uncompromised(3) //ensure the password doesn't appear more than 3 times in a data leak
            ]
        ];
    }
}
