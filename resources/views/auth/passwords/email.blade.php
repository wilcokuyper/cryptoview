@extends('layouts.app')

@section('content')
<div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-center">
        <div class="w-full md:w-2/3 lg:w-1/2">
            <div class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="px-4 py-3 bg-gray-50 border-b border-gray-200 rounded-t-lg font-semibold">
                    Reset Password
                </div>

                <div class="p-6">
                    @if (session('status'))
                        <div class="p-4 mb-4 bg-green-100 border border-brand-green text-brand-green rounded-md">
                            {{ session('status') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('password.email') }}">
                        {{ csrf_field() }}

                        <div class="mb-4">
                            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">E-Mail Address</label>
                            <input id="email" type="email" name="email" value="{{ old('email') }}" required
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-blue focus:ring focus:ring-brand-blue focus:ring-opacity-50 @if($errors->has('email')) border-brand-red @endif">
                            @if ($errors->has('email'))
                                <p class="mt-1 text-sm text-brand-red">{{ $errors->first('email') }}</p>
                            @endif
                        </div>

                        <div>
                            <button type="submit" class="inline-flex items-center px-4 py-2 bg-brand-blue text-white font-medium rounded-md hover:bg-brand-blue/90">
                                Send Password Reset Link
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
