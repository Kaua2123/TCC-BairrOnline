import '../App.css';

const Cadastro = () => {
    return (
        <div>
       <body className='bodi'>
          <form className='log1'>
        <h2>Cadastro</h2>
        <div className='box-user'>
            <input className='usuario1' type="email"></input>
            <label>Email:</label>
        </div>
        <div className='box-user'>
            <input className='usus1' type="password"></input>
            <label>Senha:</label>
        </div>
    <button className='butao1'>Criar conta</button>
    </form>
    </body>
        </div>
    )
}

export default Cadastro;