/ **
* @preserve HTML5 Shiv 3.7.3 | @afarkas @jdalton @jon_neal @rem | MIT / GPL2 Licenciado
* /
; ( função ( janela ,  documento )  {
/ * jshint evil: true * /
  / ** versão * /
  var  versão  =  '3.7.3' ;

  / ** Opções predefinidas * /
  var  opções  =  janela . html5  ||  { } ;

  / ** Usado para pular elementos problemáticos * /
  var  reSkip  =  / ^ < | ^ (?: botão | mapa | selecione | área de texto | objeto | iframe | opção | grupo de opções ) $ / i ;

  / ** Nem todos os elementos podem ser clonados no IE ** /
  var  saveClones  =  / ^ (?: a | b | código | div | conjunto de campos | h1 | h2 | h3 | h4 | h5 | h6 | i | label | li | ol | p | q | span | strong | style | table | tbody | td | th | tr | ul) $ / i ;

  / ** Detecta se o navegador suporta estilos html5 padrão * /
  var  suportaHtml5Styles ;

  / ** Nome do expando, para trabalhar com vários documentos ou para reenviar um documento * /
  var  expando  =  '_html5shiv' ;

  / ** A identificação dos documentos expando * /
  var  expanID  =  0 ;

  / ** Dados em cache para cada documento * /
  var  expandoData  =  { } ;

  / ** Detecta se o navegador suporta elementos desconhecidos * /
  var  suportaUnknownElements ;

  ( function ( )  {
    tente  {
        var  a  =  documento . createElement ( 'a' ) ;
        a . innerHTML  =  '<xyz> </xyz>' ;
        // se a propriedade oculta for implementada, podemos assumir que o navegador suporta estilos HTML5 básicos
        supportHtml5Styles  =  ( 'oculto'  em  a ) ;

        supportUnknownElements  =  a . childNodes . comprimento  ==  1  ||  ( function ( )  {
          // atribui um falso positivo se não conseguir
          ( documento . createElement ) ( 'a' ) ;
          var  frag  =  documento . createDocumentFragment ( ) ;
          return  (
            typeof  frag . cloneNode  ==  'indefinido'  ||
            typeof  frag . createDocumentFragment  ==  'indefinido'  ||
            typeof  frag . createElement  ==  'indefinido'
          ) ;
        } ( ) ) ;
    }  captura ( e )  {
      // atribui um falso positivo se a detecção falhar => não é possível
      supportHtml5Styles  =  true ;
      supportUnknownElements  =  true ;
    }

  } ( ) ) ;

  / * ------------------------------------------------ -------------------------- * /

  / **
   * Cria uma folha de estilos com o texto CSS fornecido e a adiciona ao documento.
   * @private
   * @param { Document } ownerDocument O documento.
   * @param { String } cssText O texto CSS.
   * @Returns { StyleSheet } O elemento de estilo.
   * /
  função  addStyleSheet ( ownerDocument ,  cssText )  {
    var  p  =  ownerDocument . createElement ( 'p' ) ,
        parent  =  ownerDocument . getElementsByTagName ( 'head' ) [ 0 ]  ||  ownerDocument . documentElement ;

    p . innerHTML  =  'x <style>'  +  cssText  +  '</style>' ;
    retornar  pai . insertBefore ( p . lastChild ,  pai . firstChild ) ;
  }

  / **
   * Retorna o valor de `html5.elements` como uma matriz.
   * @private
   * @returns { Array } Uma matriz de nomes de nós do elemento derivado.
   * /
  função  getElements ( )  {
     elementos  var =  html5 . elementos ;
    retornar  typeof  elementos  ==  'string' ? elementos . split ( '' ) : elementos ;
  }

  / **
   * Estende a lista interna de elementos html5
   * @memberOf html5
   * @param { String | Matriz } newElements lista em branco de espaço em branco ou matriz de novos nomes de elementos a serem trocados
   * @param { Document } ownerDocument O documento de contexto.
   * /
  função  addElements ( newElements ,  ownerDocument )  {
     elementos  var =  html5 . elementos ;
    if ( typeof  elements ! = 'string' ) {
      elementos  =  elementos . junção ( '' ) ;
    }
    if ( typeof  newElements ! = 'string' ) {
      newElements  =  newElements . junção ( '' ) ;
    }
    html5 . elements  =  elements  + '' +  newElements ;
    shivDocument ( ownerDocument ) ;
  }

   / **
   * Retorna os dados associados ao documento especificado
   * @private
   * @param { Document } ownerDocument O documento.
   * @returns { Object } Um objeto de dados.
   * /
  função  getExpandoData ( ownerDocument )  {
    var  data  =  expandoData [ ownerDocument [ expando ] ] ;
    if  ( ! data )  {
        data  =  { } ;
        expanID ++ ;
        ownerDocument [ expando ]  =  expanID ;
        expandoData [ expanID ]  =  dados ;
    }
    retornar  dados ;
  }

  / **
   * retorna um elemento derivado para o nodeName e o documento especificados
   * @memberOf html5
   * @param { String } nodeName nome do elemento
   * @param { Document | DocumentFragment } ownerDocument O documento de contexto.
   * @returns { Object } O elemento shived.
   * /
  função  createElement ( nodeName ,  ownerDocument ,  data ) {
    if  ( ! ownerDocument )  {
        ownerDocument  =  documento ;
    }
    if ( supportedUnknownElements ) {
        return  ownerDocument . createElement ( nodeName ) ;
    }
    if  ( ! data )  {
        data  =  getExpandoData ( ownerDocument ) ;
    }
     nó var ;

    if  ( data . cache [ nodeName ] )  {
        nó  =  dados . cache [ nodeName ] . cloneNode ( ) ;
    }  else  if  ( saveClones . test ( nodeName ) )  {
        node  =  ( data . cache [ nodeName ]  =  data . createElem ( nodeName ) ) . cloneNode ( ) ;
    }  mais  {
        nó  =  dados . createElem ( nodeName ) ;
    }

    // Evite adicionar alguns elementos aos fragmentos no IE <9 porque
    // * Atributos como `name` ou` type` não podem ser configurados / alterados uma vez que um elemento
    // é inserido em um documento / fragmento
    // * Vincula elementos com atributos `src` inacessíveis, como em
    // uma resposta 403, causará uma falha na guia / janela
    // * Os elementos de script anexados aos fragmentos serão executados quando seus `src`
    A propriedade // ou `text` está definida
     nó de retorno . canHaveChildren  && ! reSkip . teste ( nodeName )  && ! nó . tagUrn ? dados . frag . appendChild ( nó ) : nó ;
  }

  / **
   * retorna um DocumentFragment diferente para o documento especificado
   * @memberOf html5
   * @param { Document } ownerDocument O documento de contexto.
   * @returns { Object } O documento DocumentFragment.
   * /
  função  createDocumentFragment ( ownerDocument ,  data ) {
    if  ( ! ownerDocument )  {
        ownerDocument  =  documento ;
    }
    if ( supportedUnknownElements ) {
        return  ownerDocument . createDocumentFragment ( ) ;
    }
    dados  =  dados  ||  getExpandoData ( ownerDocument ) ;
    var  clone  =  dados . frag . cloneNode ( ) ,
        i  =  0 ,
        elems  =  getElements ( ) ,
        l  =  elems . comprimento ;
    para ( ; i < l ; i ++ ) {
        clone . createElement ( elems [ i ] ) ;
    }
    retornar  clone ;
  }

  / **
   * Shivs os métodos `createElement` e` createDocumentFragment` do documento.
   * @private
   * @param { Document | DocumentFragment } ownerDocument O documento.
   * @param { Object } dados do documento.
   * /
  função  shivMethods ( ownerDocument ,  data )  {
    if  ( ! data . cache )  {
        dados . cache  =  { } ;
        dados . createElem  =  ownerDocument . createElement ;
        dados . createFrag  =  ownerDocument . createDocumentFragment ;
        dados . frag  =  dados . createFrag ( ) ;
    }


    ownerDocument . createElement  =  function ( nodeName )  {
      // abortar shiv
      if  ( ! html5 . shivMethods )  {
          retornar  dados . createElem ( nodeName ) ;
      }
      retornar  createElement ( nodeName ,  ownerDocument ,  data ) ;
    } ;

    ownerDocument . createDocumentFragment  =  Função ( 'h, f' ,  'return function () {'  +
      'var n = f.cloneNode (), c = n.createElement;'  +
      'h.shivMethods && ('  +
        // desenrola as chamadas `createElement`
        getElements ( ) . join ( ) . substituir ( / [ \ w \ - : ] + / g ,  função ( nodeName )  {
          dados . createElem ( nodeName ) ;
          dados . frag . createElement ( nodeName ) ;
          retornar  'c ("'  +  nodeName  +  '")' ;
        } )  +
      '); return n}'
    ) ( html5 ,  dados . frag ) ;
  }

  / * ------------------------------------------------ -------------------------- * /

  / **
   * Gire o documento fornecido.
   * @memberOf html5
   * @param { Document } ownerDocument O documento a ser retirado.
   * @returns { Document } O documento enviado.
   * /
  função  shivDocument ( ownerDocument )  {
    if  ( ! ownerDocument )  {
        ownerDocument  =  documento ;
    }
    var  data  =  getExpandoData ( ownerDocument ) ;

    se  ( html5 . shivCSS  && ! supportsHtml5Styles  && ! dados . hasCSS )  {
      dados . hasCSS  = !! addStyleSheet ( ownerDocument ,
        // corrige a exibição do bloco não definida no IE6 / 7/8/9
        'artigo, aparte, caixa de diálogo, figcaption, figura, rodapé, cabeçalho, hgroup, main, nav, seção {display: block}'  +
        // adiciona estilo não presente no IE6 / 7/8/9
        'mark {background: # FF0; color: # 000}'  +
        // oculta elementos não renderizados
        'modelo {display: none}'
      ) ;
    }
    if  ( ! suportaUnknownElements )  {
      shivMethods ( ownerDocument ,  data ) ;
    }
    return  ownerDocument ;
  }

  / * ------------------------------------------------ -------------------------- * /

  / **
   * O objeto `html5` é exposto para que mais elementos possam ser trocados e
   * shiving existente pode ser detectado em iframes.
   * @type Object
   * @exemplo
   *
   * // as opções podem ser alteradas antes da inclusão do script
   * html5 = {'elementos': 'marcar seção', 'shivCSS': false, 'shivMethods': false};
   * /
  var  html5  =  {

    / **
     * Uma cadeia ou espaço separado de nomes de nós dos elementos a serem trocados.
     * @memberOf html5
     * @type Matriz | String
     * /
    'elementos' : opções . elementos  ||  'abbr artigo à parte áudio bdi tela dados datalist detalhes diálogo figcaption figura rodapé cabeçalho hgroup principal marca medidor nav saída imagem progresso seção resumo modelo tempo vídeo' ,

    / **
     * versão atual do html5shiv
     * /
    'version' : version ,

    / **
     * Um sinalizador para indicar que a folha de estilos HTML5 deve ser inserida.
     * @memberOf html5
     * @type Boolean
     * /
    'shivCSS' : ( opções . shivCSS ! == false ) ,

    / **
     * É igual a true se um navegador suportar a criação de elementos desconhecidos / HTML5
     * @memberOf html5
     * @type boolean
     * /
    'supportedUnknownElements' : suportaUnknownElements ,

    / **
     * Um sinalizador para indicar que o documento `createElement` e` createDocumentFragment`
     * métodos devem ser substituídos.
     * @memberOf html5
     * @type Boolean
     * /
    'shivMethods' : ( opções . shivMethods ! == false ) ,

    / **
     * Uma string para descrever o tipo de objeto `html5` (" padrão "ou" impressão padrão ").
     * @memberOf html5
     * @type String
     * /
    'type' : 'default' ,

    // move o documento de acordo com as opções especificadas do objeto `html5`
    'shivDocument' : shivDocument ,

    // cria um elemento shived
    createElement : createElement ,

    // cria um documentFragment diferente
    createDocumentFragment : createDocumentFragment ,

    // estende a lista de elementos
    addElements : addElements
  } ;

  / * ------------------------------------------------ -------------------------- * /

  // expor html5
  janela . html5  =  html5 ;

  // remova o documento
  shivDocument ( documento ) ;

  if ( typeof  module  ==  'objeto'  &&  module . exportações ) {
    módulo . exportações  =  html5 ;
  }

} ( typeof  window ! == "undefined" ? window : this ,  document ) ) ;