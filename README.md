# **DEVin[Philips] · Projeto 1 · Módulo FrontEnd**
Após 6 semanas de aulas diárias e exercícios semanais, este é o primeiro projeto do programa DEVinHouse, uma parceria entre empresas e o SENAI.

## **Escopo**
Desenvolver um sistema de CRUD com persistência por meio de local storage do browser. Não é permitido o uso de frameworks, apenas HTML, CSS e JavaScript puros. O código deve estar clean, o HTML deve ser acessível, os formulários devem utilizar validação a partir do HTML.

### **Funcionalidades**
#### **Padrão**
Cadastro de dicas no local storage. Validação das dicas antes do cadastro. Renderização automática das dicas atualizadas. Deleção de dicas. Edição de dicas. Filtro de dicas. Quantificação e renderização do total de dicas por categoria. Notificações e solicitações de confirmação para as operações C, U, e D.

#### ***Extra***
Como funcionalidade extra, fui além na implementação do filtro de dicas.

- Foi solicitado o funcionamento com dois botões, um para executar o filtro, e outro para limpar o filtro. Ao invés disso, implementei um filtro que é executado à medida que ocorre a digitação. Mantive um botão para limpar o filtro.

- Além disso, o filtro original se limitava ao campo de "título". Implementei um filtro que busca em três campos: "título", "linguagem/skill", e "categoria". Optei por não implementar o filtro no campo "descrição", porque ele é muito maior do que os outros e poderia levar a uma perda de escalabilidade do filtro.

O filtro de dicas original encontra-se disponível no histórico de commits, caso tenha interesse.

### **Agradecimentos**
Agradeço à Philips pela oportunidade, ao LAB365 por toda a estrutura e apoio, e principalmente aos professores @romeuic e @thaiscristinabertoldo pelo ensino. Não esperava por professores tão bons.