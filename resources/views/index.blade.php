<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Cryptoview') }} - Manage your crypto assets</title>
    <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <meta name="apple-mobile-web-app-title" content="Cryptoview" />
    <link rel="manifest" href="/site.webmanifest" />
    <script>
        (function() {
            try {
                var stored = localStorage.getItem('theme-storage');
                var theme = stored ? JSON.parse(stored).state.theme : 'system';
                var isDark = theme === 'dark' ||
                    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) document.documentElement.classList.add('dark');
            } catch (e) {}
        })();
    </script>
</head>

<body class="bg-body-bg font-sans text-base antialiased transition-colors duration-200">
    <div id="app"></div>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</body>

</html>
