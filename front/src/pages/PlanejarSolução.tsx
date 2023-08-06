import '../App.css'


const PlanejarSolução = ({isOpen, children, setCloseCom}) => {


    if(isOpen){
        return (
            <div className='solucao'>
                <div className='solucao1'>   
                    <h1 className='h1Solucao'>Parabéns! Você assumiu a resolução de uma denúncia!</h1>
                    <h5 className='h5Solucao'>O que a instituição irá fazer para solucioná-la?</h5>
                    <div>{children}</div>
                    <button onClick={setCloseCom} className='btnSairP'>X</button>
                    <form>
                    <input type='text' className='inpP'/>  
                    <button className='btnEnviarP' type='submit'>Enviar</button>
                    </form>  
                </div>
            </div>
        )

        
    }

}


export default PlanejarSolução;