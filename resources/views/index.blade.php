<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        @viteReactRefresh
        @vite(['resources/sass/app.scss', 'resources/js/app.jsx'])
    </head>
    <body>
        <div id="app"></div>
    </body>
</html>
