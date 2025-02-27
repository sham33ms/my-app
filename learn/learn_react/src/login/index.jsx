function Login() {
    return (
        <>
            <div className="login ">
                <div className="flex_col d_flex gap_15 login_boder">
                    <h1 className="text_center">
                        Login
                    </h1>
                    <input type="number" placeholder="Ener Number" min={1} max={10} />
                    <input type="email" placeholder="Enter Email" />
                    <input type="submit" value={'Login'} />
                </div>
            </div>
        </>
    );
}

export default Login;
