<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Kegiatan;
use App\Models\Postingan;

class PublicController extends Controller
{
    public function tampilkanPostingan(){
        $kegiatans = Kegiatan::all();
        return view('post', compact('kegiatans'));
    }

    public function tampilkanPostinganByIndex(Request $request, $id){
        $kegiatans = Kegiatan::findOrFail($id);
        return view('blog', compact('kegiatans'));
    }

    public function tampilkanBlog()
    {
        $blogs = Postingan::with('admin.profile')
            ->where('tipe', 'blog')
            ->orderBy('created_at', 'desc')
            ->get();
        
        return view('blog', compact('blogs'));
    }
}