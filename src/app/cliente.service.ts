import { Injectable } from '@angular/core';
import { Cliente } from './cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  static REPO_CLIENTES = "_CLIENTES";

  constructor() { }

   salvar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.push(cliente);

    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  atualizar(cliente: Cliente){
    const storage = this.obterStorage();
    storage.forEach( c => {
      if(c.id === cliente.id){
        Object.assign(c, cliente);
      }
    })
      localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  deletar(cliente: Cliente){
    const storage = this.obterStorage();

    const novaLista = storage.filter(c => c.id !== cliente.id)


     localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(novaLista));
  }





  pesquisarClientes (nomeBusca: string) : Cliente[]{

    const clientes = this.obterStorage();


    if(!nomeBusca){
   return clientes;
     }
        //pesquiso cliente.nome: jose da silva
        //nomeBusca: slva               ele vai retorna o resultado caso a palvra tenha no nome
        //esse menos 1 faz com q se eu pesquisar so uma parte do nome ele ja consegue achar o nome
        return clientes.filter(cliente => cliente.nome?.indexOf(nomeBusca) !== -1 )
      }


       buscarClientePorId(id: string): Cliente | undefined{
        const clientes = this.obterStorage();
          return clientes.find(cliente => cliente.id === id)
       }




  private obterStorage() : Cliente[] {
  const repositorioClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
  if(repositorioClientes){
   const clientes: Cliente[] = JSON.parse(repositorioClientes);
   return clientes;
 //isso aqui qnd tenho um repositorio de clientes salvo no localstorage
}

const clientes: Cliente[] = [];
localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));

return clientes;

//aqui qnd n tenho um repositorio de clientes salvo no localstorage
}
}



//esse arquivo service serve pra fazer a logica de td operaçoes td td
//ele ajuda a despoluir o codigo
/*localstorage é localStorage é uma ferramenta da web que permite a uma
 aplicação guardar dados no navegador do utilizador  para que estes
  permaneçam disponíveis mesmo após o fecho do navegador*/
