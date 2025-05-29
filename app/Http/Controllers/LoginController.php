<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Profile;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    // Menampilkan halaman login
    public function showLoginForm()
    {
        return view('login');
    }

    // Proses login
    public function login(Request $request)
    {
        // Validasi input login
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        // Cek apakah kredensial benar
        $profile = Profile::where('email', $request->email)->first();

        if ($profile && Hash::check($request->password, $profile->password)) {
            // Jika validasi sukses, login user
            Auth::loginUsingId($profile->profile_id);

            // Set session berdasarkan role yang ada
            $this->setRoleSession($profile);

            // Redirect ke halaman sesuai role
            return $this->redirectBasedOnRole();
        }

        // Jika login gagal, kembali ke halaman login dengan error
        return back()->withErrors([
            'email' => 'Kredensial tidak valid.',
        ]);
    }    // Set session berdasarkan role
    
    private function setRoleSession(Profile $profile)
    {
        // Menyimpan session berdasarkan role
        if ($profile->guru()->exists()) {
            session(['role' => 'guru']);
            session(['user_id' => $profile->profile_id]);
        } elseif ($profile->orangTua()->exists()) {
            session(['role' => 'orang_tua']);
            session(['user_id' => $profile->profile_id]);
        } elseif ($profile->admin()->exists()) {
            session(['role' => 'admin']);
            session(['user_id' => $profile->profile_id]);
        } else {
            session(['role' => 'murid']);
            session(['user_id' => $profile->profile_id]);
        }
    }

    // Redirect berdasarkan role
    private function redirectBasedOnRole()
    {
        // Redirect ke halaman sesuai role
        $role = session('role');
        if ($role == 'guru') {
            return redirect()->route('guru.dashboard');
        } elseif ($role == 'orang_tua') {
            return redirect()->route('orang_tua.dashboard');
        } elseif ($role == 'admin') {
            return redirect()->route('admin.dashboard');
        } else {
            return redirect()->route('murid.dashboard');
        }
    }

    // Logout pengguna
    public function logout()
    {
        Auth::logout();
        session()->flush();
        return redirect()->route('login');
    }
}
