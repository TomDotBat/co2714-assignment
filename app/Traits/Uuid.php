<?php

namespace App\Traits;

use Illuminate\Support\Str;

trait Uuid
{
    /**
     * Apply a key if one is not already present
     */
    protected static function bootUuid()
    {
        static::creating(function ($model) {
            if (!$model->getKey()) {
                $model->{$model->getKeyName()} = (string) Str::uuid();
            }
        });
    }

    /**
     * @return bool
     */
    public function getIncrementing()
    {
        return false;
    }

    /**
     * @return string
     */
    public function getKeyType()
    {
        return 'string';
    }
}
