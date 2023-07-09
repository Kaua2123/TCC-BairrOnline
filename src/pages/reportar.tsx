
import '../App.css';




//O que Falta fazer:
//Alinhar certinho com as denuncias
//Colocar uma Descrição pra detalhar o que você escolheu reportar

export function Reportar({taAberto, tafechado }){
    
  
  if(taAberto)
  return(
    <section className='Report'>
    
      <button onClick={tafechado}>x</button>
    <div className='conteudo'>
      <h2>Por que deseja reportar esta denúncia?</h2>
      <select name="tipos">
      <option value="tipo1">Descrição impropria</option>
      <option value="tipo2">Imagem Impropria</option>
      <option value="tipo3">Informação pessoal demais</option>
      <option value="tipoOutro">outro</option>{/*Esse vai ser diferente dos demais, ele é SUPERIOR */}
      </select>
      <br />
      <input type="submit"/>
     
    </div>
   
    </section>
   
    )

 return null;

  }