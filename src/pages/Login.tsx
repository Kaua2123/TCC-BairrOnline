import { Link } from 'react-router-dom';
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
            <Link to="/Cadastro" className='linkCadastro'> Criar conta </Link> 
        </div>
    <button className='butao1'>Entrar</button>
             
 
        
    </form>
    </body>
        </div>
    )
}

export default Login;