<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Cryptoview') }}</title>
</head>

<body class="bg-body-bg font-sans text-base antialiased">
    <div id="app"></div>

    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</body>

</html>
