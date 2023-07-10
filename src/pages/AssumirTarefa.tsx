import '../App.css'
import { useState } from 'react';
import PlanejarSolução from './PlanejarSolução';


const AssumirTarefa = ({Aberto, children, setOpenTaf}) => {
    const [openCom, setOpenCom] = useState(false);

    if(Aberto){
        return (
            <div className='Tarefa'>
                <div className='Tarefa1'>   
                    <h1 className='h1Tarefa'>Quer mesmo assumir a resolução do caso?</h1>
                    <div>{children}</div>
                    <button onClick={setOpenTaf} className='btnSair'>X</button>
                    <button onClick={setOpenTaf} className='btnNao'>Cancelar</button>
                    <button onClick={() => {setOpenCom(true)}} className='btnSim'>Sim, assumir</button>
        <PlanejarSolução isOpen={openCom} setCloseCom = {() => {setOpenCom(!openCom)}}>
        </PlanejarSolução>
                </div>
            </div>
        )

        
    }

}


export default AssumirTarefa;