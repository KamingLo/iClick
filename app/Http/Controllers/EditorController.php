<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EditorController extends Controller
{
    public function show()
    {
        return view('editor');
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required'
        ]);
        
        // Simpan ke database atau lakukan operasi lain
        // $post = new Post();
        // $post->content = $validated['content'];
        // $post->save();
        
        return back()->with('success', 'Content saved successfully!');
    }
}