<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Trix Editor</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.min.css">
    <style>
        body { padding: 20px; }
        .trix-content { min-height: 300px; }
    </style>
</head>
<body>
    @if(session('success'))
    <div style="color: green; margin: 10px 0;">
        {{ session('success') }}
        @if(session('file_path'))
            <br>File path: {{ session('file_path') }}
            <br>Access URL: <a href="{{ Storage::url(session('file_path')) }}" target="_blank">View File</a>
        @endif
    </div>
@endif
    <h1>Trix Editor Demo</h1>
    
    <form method="POST" action="{{ route('editor.store') }}">
        @csrf
        <input id="content" type="hidden" name="content">
        <trix-editor input="content"></trix-editor>
        <button type="submit" style="margin-top: 10px;">Submit</button>
    </form>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.min.js"></script>
</body>
</html>