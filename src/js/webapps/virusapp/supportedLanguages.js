import flatten from "flat";
/**
 * keys must be in LOWERCASE to work with react-intl or intl
 */


export default {

  "pt":{

      ...flatten({

         email: {

             delete:"Apagar Template Etiqueta",
             copyreset:"Copiar Etiqueta para novo",
             tofile:"Exportar para Fichero",
             loadfromfile:"Carregar Etiqueta de ficheiro",

             open:"Abrir",
             close:"Fechar",
             rotate:"Rodar",
             scalex:"Permitir esticar em X",
             scaley:"Permitir esticar em Y",
             back:"Voltar para lisemailem",


             table:"Mesa",
             menu:"Menu",
             room:"Quarto",
             venue:"Establecimento",
             instructions:{
                 menu:"Scane o codigo ou vá a iuup.menu e scane o codigo QR em baixo para abrir menu",
                 venue:"Scane o codigo ou vá a iuup.menu e scane o codigo QR em baixo para começar a trabalhar",
                 table:"Scane o codigo ou vá a iuup.menu e scane o codigo QR em baixo para começar a pedir",
                 room:"Scane o codigo ou vá a iuup.menu e scane o codigo QR em baixo para serviço de quarto"
             },



             helper:"Ao criar templates de etiquetas tudo o que estiver dentro do contentor principal será incluido no template.Se não se quiser determinado componente presente simplesmente não será inserido dentro do contentor.",
             box:{
                 border:{
                     color:"Fronteira Cor",
                     width:"Fronteira Largura",

                     array:"Lista de Fronteira",
                     "array.helper":"Definido para criar tracejádos , remover para criar linha continua.Define o comprimento da linha tracejadas.",

                 }
             },
             save:"Guardar",
             toimage:"Criar Imagem Teste",
             printtest:"Test Impressão",
             tablenumber:"Numero de Mesa",
             "tablenumber.helper":"Numero de mesa para fins de simulação somente, vai ser substituido por numero real",
             venuename:"Nome de Establecimento",
             generalsettings:"Definições Gerais",
             template:"Definições Template",
             "template.code":"Codigo de template",
             "template.code.helper":"Codigo para tradução de template, vai ter de ser acrescentada uma tradução do codigo para varias linguas no cos ficheiros do interface (Somente por programação)",
             type:{
                 istable:"Mesa",
                 isroom:"Quarto",
                 ismenu:"Menu",
                 isvenue:"Establecimento"
             },
             active:"Activo",
             "active.helper":"Activo quer dizer que clientes poderão escolher este template para imprimir",

             template:{
                 label:"Etiqueta de template",
                 currenty:"Moeda",
                 printprice:"Preço por Impressão",
                 "printprice.helper":"Preço cobrado por 1 impressão de etiqueta para este template.Iva incluido a taxa em vigor"
             },



             simulate:"Simular",
             zoom:"Zoom",
             name:"Nome",
             entitysettings:"Definições de entidade",

             entity:{
                 angle:"Angulo",
                 group:"Entidade",
                 scalex:"Escala eixo X",
                 scaley:"Escala eixo Y",
                 innergroup:"Entidade Real",
                 scaledwidth:"Largura mm",
                 scaledheight:"Altura mm",
                 left:"Posição em relação a esquerda",
                 top:"Posição em relação ao topo",
                 stroke:"Cor Fronteira",
                 strokewidth:"Largura Fronteira",
                 strokedasharray:"Linhas de fronteira",
                 textalign:"Alinhamento de Texto",
                 underline:"Sublinhado",
                 fontstyle:"Estilo de Letra",
                 fontweight:"Peso de Letra",
                 fontfamily:"Tipo de Letra",
                 fontsize:"Tamanho de Letra",
                 fill:"Cor",
                 color:{
                     reset:"Cor Padrão"
                 }
             },

             bringtofront:"Trazer para a Frente",
             sendtoback:"Enviar para Trás",
             bringforward:"Para a Frente",
             sendbackwards:"Para Trás",


             translation:{
               name:"Nome",
               smalldescription:"Pequena Descrição"
             },
             lang:{
                 pt:"Português",
                 es:"Espanhol",
                 en:"Inglês",
                 fr:"Françês",
                 de:"Alemão",
                 cn:"Chines"
             }


         }

      })
   
  },
    "en":{

        ...flatten({

            email: {
                table:"Table",
                menu:"Menu",
                room:"Room",
                venue:"",



                instructions:{
                    menu:"Scan the code or go to iuup.menu and scann the qr code bellow to open menu",
                    venue:"Scan the code or go to iuup.menu and scann the qr code bellow for start working",
                    table:"Scan the code or go to iuup.menu and scan the qr code bellow to start ordering",
                    room:"Scan the code or go to iuup.menu and scan the qr code bellow for room service"
                },
                type:{
                    istable:"Table",
                    isroom:"Room",
                    ismenu:"Menu"
                },
            }

        })

    },
    "de":{
        ...flatten({

           email: {
                table:"Tisch",
                menu:"Menu",
                room:"Zimmer",
                venue:"",

               instructions:{
                   menu:"Scannen Sie den Code oder gehen Sie zu iuup.menu und scannen Sie den QR-Code unten, um das Menü zu öffnen",
                   venue:"Scannen Sie den Code oder gehen Sie zu iuup.menu und scannen Sie den unten stehenden QR-Code, um die Arbeit aufzunehmen",
                   table:"Scannen Sie den Code oder gehen Sie zu iuup.menu und scannen Sie den QR-Code unten, um mit der Bestellung zu beginnen",
                   room:"Scannen Sie den Code oder gehen Sie zu iuup.menu und scannen Sie den unten stehenden QR-Code für den Zimmerservice"
               },
               type:{
                   istable:"Tisch",
                   isroom:"Zimmer",
                   ismenu:"Menü"
               },
           }

        })

    }
}