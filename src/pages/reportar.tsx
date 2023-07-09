
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
      <select name="filtra" id="">
        <option value="tipo1">Descrição falsa</option>
        <option value="tipo2">Descrição Ofensiva</option>{/*discurso de ódio, racismo,ameaças sla*/}
        <option value="tipo3">Imagem Imprópria</option> {/*pornografia, Conteudo explicito(Ferimentos, lesoes sla), localização que pode revelar a casa dos outros */}
        <option value="tipo4">Informação pessoal demais</option>{/* Envolveu a vida pessoal demais na denuncia, coisa que nois nao precisa saber */}
        <option value="tipo5">Denuncia repetida</option>{/*Bora fazer regras dps*/} 
      </select>
      <br />
      <h2>Especifique o motivo</h2>
      <textarea 
        name="" 
        id="" 
        cols="30" 
        rows="4"
        placeholder='escreva aqui...'
      />
       
      
      <br />
      <input type="submit"/>
     
    </div>
   
    </section>
   
    )

 return null;

  }