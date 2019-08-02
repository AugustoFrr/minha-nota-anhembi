import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

declare var formComponent: any;
declare function exibirNota(valor): any;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  teste: string;
  abas: string;
  protected clickEventListener: EventListener;

  constructor(private platform: Platform, private storage: Storage, public toastController: ToastController) {
    this.clickEventListener = () => this.closeApp();
  }

  ngOnInit() {
    formComponent = this;
    this.abas = "n2";
  }

  ngOnDestroy(): any {
    formComponent = null;
  }

  ionViewDidEnter() {
    document.addEventListener("backbutton", this.clickEventListener);
  }

  ionViewWillLeave() {
    document.removeEventListener("backbutton", this.clickEventListener);
  }

  closeApp() {
    navigator['app'].exitApp();
  }

  getHeight(){
    return this.platform.height();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1000,
      position: "middle",
      cssClass: "toastClass",
    });
    toast.present();
  }

  limparAll() {
    this.storage.clear();
  }

  salvarNota(texto: string) {
    this.storage.length().then((length) => {
      if (length >= 10) {
        this.presentToast("Você pode salvar no máximo 10 disciplinas!")
      } else {
        var index: number = length + 1;

        this.storage.set("disciplina" + index, texto);
        this.presentToast("Salva com sucesso!");
      }
    });
  }

  remover(valor) {
    this.storage.length().then((length) => {
      for (var i = valor; i <= length; i++) {
        this.atualizarIndices(i);
      }
    });
    this.presentToast("Nota excluída!");
  }

  atualizarIndices(valor: number) {
    this.storage.get('disciplina' + (valor + 1)).then((texto) => {

      this.excluir(valor, texto);

    });
  }

  async excluir(index: number, texto: string) {

    if (texto == null) {
      this.storage.remove('disciplina' + index);
      this.selectNota();
    } else {
      this.storage.set('disciplina' + index, texto);
    }
  }

  selectNota() {
    let notas: { chave: number, texto: string }[] = new Array();
    let stop: number = 1;
    this.storage.ready().then(() => {

      this.storage.length().then((length) => {
        for (var i = 1; i <= length; i++) {
          this.storage.get("disciplina" + i).then((value) => {

            if (value == null) {
              this.storage.remove('disciplina' + i);
            } else {
              notas.push({ chave: stop, texto: value });
            }
            exibirNota(notas);

            stop++;
          });
        }
      })
    });

  }
}
