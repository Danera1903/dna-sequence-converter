# 🧬 DNA Sequence Converter

**🌐 [Acesse o projeto online](https://dna-sequence-converter.vercel.app)**

Conversor de sequências de DNA desenvolvido em React que realiza transcrição (DNA → RNA) e tradução (RNA → Proteína) utilizando o código genético universal.

![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-38B2AC?logo=tailwind-css)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como parte do meu portfólio, combinando conhecimentos em **Biomedicina** e **Sistemas de Informação**. A ferramenta permite a análise de sequências de DNA, fornecendo informações relevantes para estudos em bioinformática.

### Funcionalidades

- ✅ Validação de sequências de DNA (aceita apenas A, T, G, C)
- ✅ Geração da fita complementar de DNA
- ✅ Transcrição de DNA para RNA mensageiro
- ✅ Tradução de RNA para sequência proteica
- ✅ Cálculo de conteúdo GC (%)
- ✅ Contagem individual de nucleotídeos
- ✅ Interface moderna e responsiva

## 🧪 Conceitos de Bioinformática

### Transcrição (DNA → RNA)
Processo onde a informação do DNA é copiada para o RNA mensageiro. A principal diferença é que a base Timina (T) é substituída por Uracila (U).

### Tradução (RNA → Proteína)
Processo onde a sequência de RNA é convertida em uma cadeia de aminoácidos (proteína), seguindo o código genético. Cada conjunto de 3 nucleotídeos (códon) codifica um aminoácido específico.

### Conteúdo GC
Porcentagem de bases Guanina (G) e Citosina (C) na sequência. É um parâmetro importante que indica:
- Estabilidade térmica do DNA
- Características de diferentes organismos
- Identificação de regiões codificantes

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Danera1903/dna-sequence-converter.git
```

2. Entre na pasta do projeto:
```bash
cd dna-sequence-converter
```

3. Instale as dependências:
```bash
npm install
```

4. Execute o projeto:
```bash
npm start
```

O aplicativo abrirá automaticamente em `http://localhost:3000`

## 💡 Exemplo de Uso

Experimente com a sequência do gene da Hemoglobina Beta (HBB):
```
ATGGTGCACCTGACTCCTGAGGAGAAG
```

**Resultado esperado:**
- Proteína: MVHLTPEEK
- GC Content: 55.56%
- Length: 27 bp

## 🛠️ Tecnologias Utilizadas

- **React** - Biblioteca JavaScript para construção de interfaces
- **Tailwind CSS** - Framework CSS utilitário
- **JavaScript ES6+** - Linguagem de programação

## 📚 Estrutura do Código
```
src/
├── App.js          # Componente principal com toda a lógica
├── App.css         # Estilos customizados
├── index.js        # Ponto de entrada da aplicação
└── index.css       # Configuração do Tailwind
```

## 🎓 Sobre o Desenvolvedor

Projeto desenvolvido por Daniel, graduado em **Biomedicina** e graduando em **Sistemas de Informação**, com interesse em Bioinformática e desenvolvimento de ferramentas para análise de dados biológicos.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
