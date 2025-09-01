import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar'
import { Cliente } from './cliente';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { BrasilapiService } from '../brasilapi.service';
import { Estado, Municipio } from '../brasilapi.models';
import  { MatSelectChange, MatSelectModule }  from '@angular/material/select';
import { CommonModule } from '@angular/common';


/*esse ngxmask e providengxmask serve pra deixa como eu quero q digite tal coisa
tipo cpf quero q seja 000.000.000-00 serve com data de nascimento tbm*/

@Component({
  selector: 'app-cadastro',
  imports: [FlexLayoutModule,
     MatCardModule,
      FormsModule,
       MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatButtonModule,
      NgxMaskDirective,
      MatSelectModule,
      CommonModule

      ],
      providers: [
        provideNgxMask() ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {

  cliente: Cliente = Cliente.newCliente();
  atualizando: boolean = false;
  snack: MatSnackBar = inject(MatSnackBar);
  estado: Estado[] = [];
  municipios: Municipio[] = [];

   constructor(
    private service: ClienteService,
     private route: ActivatedRoute,
     private brasilApiService: BrasilapiService,
     private router: Router

   ){}

   ngOnInit(): void {
   this.route.queryParamMap.subscribe( (query: any) =>{
     const params = query['params']
      const id = params ['id']
      if(id){
      let clienteEncontrado = this.service.buscarClientePorId(id);
      if(clienteEncontrado){
         this.atualizando = true;
         this.cliente = clienteEncontrado;
         if(this.cliente.uf){
          const event = { value: this.cliente.uf}
          this.carregarMunicipios(event as MatSelectChange );
         }
      }
    }
   })

   this.carregarUfs();

   }


     carregarUfs(){
      this.brasilApiService.listarUfs().subscribe({
        next: listaEstados => this.estado = listaEstados,
        error: erro => console.log("ocorreu um erro: ", erro)
      })
     }

     carregarMunicipios(event: MatSelectChange){
      const ufSelecionada = event.value;
      this.brasilApiService.listarMunicipios(ufSelecionada).subscribe({
      next: listaMunicipios => this.municipios = listaMunicipios,
      error: erro => console.log('ocorreu um erro:', erro)
     })
    }

   salvar(){
    if(!this.atualizando){
    this.service.salvar(this.cliente);
    this.cliente = Cliente.newCliente();
    this.mostrarMensagem('Salvo com sucesso!')
    } else{
      this.service.atualizar(this.cliente);
      this.router.navigate(['/consulta']);
       this.mostrarMensagem('Atualizado com sucesso!')

    }
   }


     mostrarMensagem(mensagem: string){
      this.snack.open(mensagem, "ok")
     }
}
