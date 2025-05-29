<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, $role)
    {
        \Log::info('Role dari session: ' . session('role'));

        if (session('role') !== $role) {
            return redirect('login');  // Atau halaman lain jika role tidak sesuai
        }

        return $next($request);
    }
}
