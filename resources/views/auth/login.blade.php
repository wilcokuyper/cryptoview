@extends('layouts.app')

@section('content')
<div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-center">
        <div class="w-full md:w-2/3 lg:w-1/2">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-lg font-semibold">
                    Login
                </div>

                <div class="p-6">
                    <form method="POST" action="{{ route('login') }}">
                        {{ csrf_field() }}

                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-Mail Address</label>
                            <input id="email" type="email" name="email" value="{{ old('email') }}" required autofocus
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue focus:ring-opacity-50 @if($errors->has('email')) border-brand-red @endif">
                            @if ($errors->has('email'))
                                <p class="mt-1 text-sm text-brand-red">{{ $errors->first('email') }}</p>
                            @endif
                        </div>

                        <div class="mb-4">
                            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input id="password" type="password" name="password" required
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue focus:ring-opacity-50 @if($errors->has('password')) border-brand-red @endif">
                            @if ($errors->has('password'))
                                <p class="mt-1 text-sm text-brand-red">{{ $errors->first('password') }}</p>
                            @endif
                        </div>

                        <div class="mb-4">
                            <label class="inline-flex items-center">
                                <input type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}
                                    class="rounded border-gray-300 text-brand-blue shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue focus:ring-opacity-50">
                                <span class="ml-2 text-sm text-gray-600">Remember Me</span>
                            </label>
                        </div>

                        <div class="flex items-center justify-between">
                            <button type="submit" class="inline-flex items-center px-4 py-2 bg-brand-blue text-white font-medium rounded-md hover:bg-brand-blue/90">
                                Login
                            </button>
                            <a class="text-brand-blue hover:text-brand-blue/80 hover:underline text-sm" href="{{ route('password.request') }}">
                                Forgot Your Password?
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
