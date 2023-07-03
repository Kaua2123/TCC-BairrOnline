import '../App.css'


const AssumirTarefa = ({isOpen, children, setCloseCom}) => {


    if(isOpen){
        return (
            <div className='Tarefa'>
                <div className='Tarefa1'>   
                    <h1 className='h1Tarefa'>Quer mesmo assumir a resolução do caso?</h1>
                    <div>{children}</div>
                    <button onClick={setCloseCom} className='btnSair'>X</button>
                    <button onClick={setCloseCom} className='btnSim'>Sim</button>
                    <button onClick={setCloseCom} className='btnNao'>Não</button>
                </div>
            </div>
        )

        
    }

}


export default AssumirTarefa;