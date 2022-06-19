<!DOCTYPE html>
<html lang="{{ str_replace("_", "-", app()->getLocale()) }}">
    <head>
        <meta charset="utf-8"/>
        <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
        <meta name="viewport" content="initial-scale=1, width=device-width"/>

        <title>{{ config("app.name") }}</title>

        <meta name="csrf-token" content="{{ csrf_token() }}">

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>

        <script src="{{ mix("js/app.js") }}" defer></script>

        <style>
            #nprogress .bar {
                z-index: 2000 !important;
            }
        </style>

        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
