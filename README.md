# PokeDev

 O projeto **PokeDev** é um aplicativo mobile que simula uma pokedex do jogos e anime Pokémon.


<h3 align="center">
  <a href="#information_source-sobre">Sobre</a>&nbsp;|&nbsp;
  <a href="#interrobang-motivo">Motivo</a>&nbsp;|&nbsp;
  <a href="#art-design">Design</a>&nbsp;|&nbsp;
  <a href="#seedling-requisitos-mínimos">Requisitos</a>&nbsp;|&nbsp;
  <a href="#rocket-principais-tecnologias-utilizadas">Tecnologias</a>&nbsp;|&nbsp;
  <a href="#package-como-baixar-e-executar-o-projeto">Baixar e Executar</a>&nbsp;
</h3>

___

<div align="center" >
    <img src="https://i.imgur.com/Pb0pRVA.gif" width="250">____<img src="https://i.imgur.com/9vitjHE.gif" width=250>
</div>


- [**Link do vídeo completo sobre o projeto**]()
___

## :information_source: Sobre

- Uma **pokedex** seria uma aparalho que teria todas informações sobre os pokémons, os quais os personagens dos jogos e do anime usam para conhecer sobre cada pokémon, ver suas estatísticas, movimentos, habitat, habilidades dentre outras informações. Ou seja, é basicamente uma aplicação Wiki ou Bestiário de pokémon.
- Para a alimentação dos dados foi usado a PokeAPI, uma API de Pokémon muito bem documentada, livre para usar e popular, segue o link:
  - PokeApi: https://pokeapi.co/
- Para criação das interfaces foi usado React Native em conjunto com TypeScript e diversas bibliotecas disponíveis para React Native como:
  - React Navigation: https://reactnavigation.org/
  - Styled Components: https://www.styled-components.com/
- dentre outras, abaixo, na sessão de   <a href="#rocket-principais-tecnologias-utilizadas">Tecnologias</a> estará mais detalhado.

* **Home**:

<div align="center" >
  <img src="https://i.imgur.com/YAZhIOl.gif" width="250">____<img src="https://i.imgur.com/Xr7jUeY.gif" width=250>____<img src="https://i.imgur.com/z1NJ8Hs.gif" width="250">
</div>

___

## :interrobang: Motivo

Com esse projeto foi posto em prática quase todos os conceitos aprendidos com minha experiência profissional e educational princpalmente com a Rocketseat.

1. **Home**
<img src="https://i.imgur.com/CPbyHen.png" width="1000">
- Funcionalidades:
    - Listagem de todos Pokémons e suas variações.
      - Perfomática, por meio da Flatlist.

    - Pesquisa de qualquer Pokémons e suas variações.
      - É feita pelo nome(_não existe pokémon com o mesmo nome_).
      - Todos Pokémon que contém o nome digitado serão mostrados como resultados garantindo assim mesmo que o usuário não lembre totalmente do nome do Pokémon, consiga encontrá-lo.
        - Exemplo: Pesquisar com a palavra **Regi**, o resultado será **Regigigas, Regice, Regirock, Regidragon, Registeel e Regieleki.**

    - Reset de pesquisa.
      - É feito por meio de um botão que é ativado no Input após a pesquisa ou caso ocorra algum erro.
      - Garante melhor usabilidade e praticidade.

    - Número total de Pokémon seja do resultado da pesquisa ou da listagem geral.
      - É mostrado na tela em um componente que se atualiza a cada pesquisa ou listagem.

    - Componente de Loading personalizado para cada componente.
      - Uso da Lottie Animations.
      - Loading interativo no Input

    - Componente de Erro personalizado e animado caso a listagem ou a pesquisa não tenham resultados.
      - Uso da Lottie Animations.
      - Erro interativo no Input.

    - Focus e Submit inteligente no Input de pesquisa.
      - Ao digitar o nome do Pokémon, podemos tanto pesquisar apertando o botão de pesquisa quanto apertar o botão de submit padrão do teclado do dispositivo móvel.
      - Ao apertar em qualquer outra região da tela será retirado o foco do Input.
        - Foi necessário o uso do TouchableWithoutFeedback para que o Input não fique ativado quando o usuário clicar em qualquer outra região da tela em conjunto com o onStartShouldSetResponder para evitar problemas de icompatibilidade com a Flatlist e RectButton.


* **Página de detalhes sobre o Pokémon**:
<div align="center" >
  <img src="https://i.imgur.com/1ocPfUP.gif" width="250">____<img src="https://i.imgur.com/9vitjHE.gif" width=250>____<img src="https://i.imgur.com/6iHu4us.gif" width="250">
</div>

2. **Página sobre o Pokémon**
<img src="https://i.imgur.com/5OJQkwU.png" width="1000">

    - Funcionalidades:

          - Informações sobre o Pokémon.
            - Nome, número, habitat, tipo, habilidades, etc.
            - Todas as informações são mostradas em um componente que se atualiza a cada pesquisa ou listagem.

          - Componente de loading personalizado e animado em todos componentes.

          - Nessa tela foi necessário realizar 2 requisições para obtermos todas informações exibitdas:
            - Uma para obter o nome do Pokémon, tipo, número na national pokedex, peso, altura, habilidades e movimentos.

            - Outra para obter o habitat, raridade e descrição.

          - Para isso houve determinada dificuldade pois uma requisição dependia da outra, ou seja, eram processos assíncronos dependentes fazendo com que houvesse difiluldade em garantir que uma requisção seja feita somente após a outra, ou cudiado no uso de uma variável Estado

        - **Modais**

            - Há 2 modais que podem ser acessíveis nessa tela:
              - **Modal de listando de todos movimentos**
                - É acessado ao tocar no botão de todos movimentos.
                - O botão de todos movimentos não é mostrado caso o pokémon não tenha mais de 4 movimentos, ou seja, o modal não é acessível caso todos movimentos do pokémon já estejam sendo mostrado na página de detalhes de pokémon(ate 4).
                - O Modal é deslizável(swipeable) na vertical, pode ser fechado deslizando para baixo ou aperdando nos botões com os ícones indicando para baixo.

              - **Modal sobre cada movimento**
                - É acessado por meio do modal acima, no caso, ao apertar em algum movimento da listagem acima o modal sobre o movimento é aberto.
                - Assim como o de cima, também é deslizável(swipeable), mas nesse caso na horizontal
                - Nele é feito a requisição para obter as informações exibidas sobre o movimento selecionado.
                - Essa requisição depende da url do movimento selecionado, ou seja, assim como mencionado anteriormente tamém é uma requisição que depende de outra.
                  - Nesse caso depende da requisição sobre os detalhes do pokémon feita na página de detalhes do pokémon, um dos parâmetros retornados no objeto da resposta é  um vetor de objeto, cada um contendo o nome de todos movimentos daquele pokémon e a url de cada um.

        - Funcionalidades em desenvolvimento:

            i. Modal de evolução dos pokémons
                - Não foi possível terminar ainda a parte da impressão no modal e estilização das evoluções de cada pokémon mas a requisição já foi contruída no código assim como o botao de evolução
                  - O modal foi desativado para voltar quando a funcionalidade tiver pronta)

            ii. Página de "Meus Pokémon" e salvar pokémon
                - Funcionalidade que permite o usuário salvar/favoritar determinado pokémon e ele ser salvo localmente no dispositivo físico com Assync Storage.
                - Ainda não foi possível realizar essa funcionalidade mais já foi planejada.

            iii. Página sobre o Movimento
                - Uma página com mais inforações sobre o movimento selecionado no modal sobre os movimentos.
                - Teríamos um botão nele que acessaria essa página para detalhar mais informações e uma listagem com todos pokémons que possui aquele movimento.
            iv. Splash Screen
                - Tela de loading inicial da aplicação.




___

## :art: Design

[<h2 align="center">Pokedev</h2>]()
<div align="center">
<img src="https://i.imgur.com/CPbyHen.png" width="1000">
<img src="https://i.imgur.com/NagFURR.png" width="1000">
<img src="https://i.imgur.com/dDLRsnX.png" width="100">
</div>

1. Código:
     - É tentando **manter o padrão que é ensinado na Rocketseat** para o código mais limpo, organizado de facil entendimento com sua estrutura de pastas também.
     - Em geral foi todo código foi **feito com TypeScript** de forma a manter **sempre uma tipagem/interface** para cada elemento que foi usado tanto para **facilitar o desenvolvimento e entendimento do código tanto para o dev quanto para o VsCode/IDE**, quanto para **manter a consistência do código e a IDE possa sugerir correções e recomendações de forma mais efetiva**.
2. Estilização:
     - Toda estilização foi realizada com **styled-components**, que é uma biblioteca de css que tem como objetivo facilitar a criação de estilos e componentes de forma mais eficiente e similar a web com ReactJS, assim podemos **manter o mesmo padrão para web e mobile facilitando o desenvolvimento.**
     - Foi criado um **tema global** com as **fontes e cores** do projeto que são passadas no Figma.
     - A fonte usada foi a **Poppins**, que é uma fonte popular e livre para uso, está na biblioteca do Google Fonts. Foi instalada no projeto como fonte externa tanto para o **android quanto para o IOS**.
     - Para lidar com SVG, JSON, PNG foi necessário realizar uma configuração para que o TypeScript reconheça tais arquivos.
       - Os SVG foram tipados como componentes React(_React.FC_) em conjunto com a **SvgProps da biblioteca react-native-svg.**
3. React Native
     - A estrutura dos componentes foi feita por meio de funções, que são **funções que retornam um componente React.**
     - A pasta de um componente é composta por um arquivo chamado **index.tsx** e um arquivo de estilização **styles.ts**.
     - Foi usado o yarn como gerenciador de pacotes.
     - É utilizado a **react-native-gesture-handler** para criar os botões da aplicação mantendo assim a consistência do dos efeitos de reação do componente entre as platformas IOS e Android.
___
## :seedling: Requisitos Mínimos

- Android Studio
- Celular(Opcional)
- Node.js
- React
- React-Native
- TypeScript
- Yarn(ou NPM)

___

## :rocket: Principais Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias
- [Android Studio](https://developer.android.com/studio)
- [Axios](https://www.npmjs.com/package/axios)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Lottie Animations React Native](https://www.npmjs.com/package/lottie-react-native)
- [NodeJS](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
   - [Stack Navigator](https://reactnavigation.org/docs/stack-navigator/)
- [React Native Feather](https://www.npmjs.com/package/react-native-feather)
  - [Feather Icons](https://feathericons.com/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)
  - [RectButton & Bordeless Button](https://docs.swmansion.com/react-native-gesture-handler/docs/next/api/components/buttons/#rectbutton)
- [React Native Iphone X Helper](https://github.com/ptelad/react-native-iphone-x-helper#readme)
- [React Native Modal](https://github.com/react-native-modal/react-native-modal)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/)
- [React Native Responsive Fontsize](https://www.npmjs.com/package/react-native-responsive-fontsize)
- [React Native SVG](https://github.com/react-native-svg/react-native-svg)
- [Styled Components](https://www.styled-components.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Yarn](https://classic.yarnpkg.com/blog/2017/05/12/introducing-yarn/)
___
## :package: Como baixar e executar o projeto

  - Clonar o projeto:
    ```bash
     git clone https://github.com/Aszurar/PokeDev.git
    ```
  - É necessário a instalação do **yarn** de acordo com seu sistema operacional, para isso veja como no site do [Yarn](https://github.com/Aszurar/SavePass.git)
  - Instalação das dependências:
    - Execute o comando abaixo dentro da pasta do projeto
    ```bash
      yarn
    ```
 - É necessário a instalação do emulador [Android Studios](https://developer.android.com/studio) e das tecnologias requesitadas acima no:seedling:   <a href="#seedling-requisitos-mínimos">**Requisitos**</a>
 - Também é necessário a instalação/configuração de outras tecnologias, para isso siga os passos indicados nessa página de acordo com seu sistema operacional: [Executando uma Aplicação React-Native emulando Windows/Linux/MacOS ou direto no dispositivo mobile Android/IOS](https://react-native.rocketseat.dev/android/linux)
 - Execução -
 - Com o emulador android aberto ou o dispositivo móvel físico conecatdo via USB:
 - **Abra a pasta do projeto com alguma IDE(Vscode) ou simplesmente abra o terminal na pasta do projeto e execute o comando abaixo:**
    ```bash
       yarn android
    ```
- Caso o metro-bundle não funcione, execute como abaixo:
    1. Executando o metro-bundle:
        ```bash
            yarn start
        ```
    2. Executando no android:
        ```bash
            yarn android
        ```
- Caso esteja no IOS, após as configurações faladas anteriormente até no link mencionado acima, então execute o comando abaixo:
    ```bash
        yarn ios
    ```
___
Desenvolvido por :star2: Lucas de Lima Martins de Souza.
