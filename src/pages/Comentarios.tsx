import '../App.css';



const Comentarios = ({isOpen, children, setCloseCom}) => {


    if(isOpen){
        return (
            <div className='Coment'>
                <div className='Coment1'>   
                    <h1 className='ComH1'>Comentários</h1>
                    <div>{children}</div>
                    <button onClick={setCloseCom} className='btnCom'>X</button>
                </div>
            </div>
        )

        
    }

}





export default Comentarios;