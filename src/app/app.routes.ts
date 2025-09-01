import { Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component'
import { ConsultaComponent } from './consulta/consulta.component';


export const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'consulta', component: ConsultaComponent }
];


/*aqui fala o comando q devo usar pra seguir a rota, se eu uso
this.router.navigate(['/consulta']) ele vai par pagina de consulta*/
