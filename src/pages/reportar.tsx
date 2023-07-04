
import '../App.css';




//ainda falta arrumar a posição e o conteúdo que vai ter dentro 
export function Reportar({taAberto, tafechado }){
    
  
  if(taAberto)
  return(
    <section className='Report'>
    
      <button onClick={tafechado}>x</button>
    <div className='conteudo'>
      <h2>Porque deseja reportar esta denúncia?</h2>
      <select name="tipos" placeholder='selecione um tipo'>
          <option value="1">Conteúdo impróprio</option>
          <option value="2">Conteúdo repetido</option>
          <option value="3">outro</option>
      </select>
      <br />
      <input type="submit"/>
     
    </div>
   
    </section>
   
    )

 return null;

  }