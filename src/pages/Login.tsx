import '../App.css';

const Login = () => {
    return (
        <div>
        <body className='bodi'>
          <form className='log1'>
        <h2>Login</h2>
        <div className='box-user'>
            <input className='usuario1' type="text"></input>
            <label>Usuário ou Email:</label>
        </div>
        <div className='box-user'>
            <input className='usus1' type="password"></input>
            <label>Senha:</label>
        </div>
        <div>
            <a className='for1'> Não Possui cadastro?</a>
        </div>
        <a href="#" className="butao1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Entrar
        </a>
        
    </form>
    </body>
        </div>
    )
}

export default Login;