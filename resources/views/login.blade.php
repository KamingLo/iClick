@include('partials.header', ['NamaPage' => 'Halaman Login'])
<div class="ContainerLogin">
    <div class="LayoutLogin">
        <div class="LayoutVideo">
            <video autoplay loop muted>
                <source src="/image/introRE.mp4" type="video/mp4">
                Browser Anda tidak mendukung elemen video.
            </video>
        </div>

        <div class="LayoutFormLogin">
            <div class="ContainerFormLogin">
                <h2>Login</h2>
                <form method="POST" action="{{ url('login') }}">
                    @csrf
                    <div class="FormLayoutLogin">
                        <label for="email">Email:</label>
                        <input type="text" name="email" placeholder="Enter your Email" required />
                    </div>

                    <div class="FormLayoutLogin">
                        <label for="password">Password:</label>
                        <input type="password" name="password" placeholder="Enter your password" required />
                    </div>

                    <button type="submit" class="TombolLogin">Login</button>

                    @if ($errors->any())
                        <div class="ErrorMsg">
                            @foreach ($errors->all() as $error)
                                <p>{{ $error }}</p>
                            @endforeach
                        </div>
                    @endif
                </form>
            </div>
        </div>
    </div>
</div>

@include('partials.footer')