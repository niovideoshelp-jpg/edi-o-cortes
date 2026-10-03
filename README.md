# HardScope — três cortes em Remotion (V3)

Projeto editável com três vídeos independentes em 1080 × 1920, 30 fps, MP4 H.264/AAC. Legendas em inglês com Barlow Condensed ExtraBold, contorno escuro e amarelo nas palavras de ênfase. A V3 alterna tela inteira com breves divisões que isolam participantes diferentes presentes no mesmo quadro original. Cada painel usa o mesmo tempo de origem. Uma única faixa de áudio acompanha as imagens; não há reações deslocadas, imagens congeladas ou duplicação da mesma pessoa como assunto dos dois painéis. Love & Justice permanece em tela inteira. Sem faixa preta central ou barras de progresso.

| Composição     |  Duração | Trechos do trailer original                                   |
| -------------- | -------: | ------------------------------------------------------------- |
| R3born         | 21,733 s | 00:59,150–01:05,950; 01:08,050–01:13,983; 01:17,850–01:26,850                      |
| Unpacked       | 10,900 s | 00:05,200–00:08,700; 00:15,200–00:20,200; 00:23,100–00:25,500 |
| LoveAndJustice | 11,300 s | 00:08,800–00:20,100                                           |

Somente imagem e áudio dos trailers fornecidos. A sequência original das falas foi preservada. Sem músicas, narração, imagens ou efeitos sonoros externos. Os arquivos de mídia ficam fora do Git; este repositório contém o código e os textos, não uma publicação dos vídeos.

## Preparar e editar

Requer Node.js e FFmpeg. Coloque os três trailers oficiais em uma pasta local e execute:

```powershell
npm ci
.\scripts\prepare-assets.ps1 -SourceDirectory 'C:\caminho\dos\trailers'
npm run dev -- --no-open
```

Edite `src/Root.tsx` para ajustar sequências; `src/editorial.ts` define os intervalos de tela dupla, recortes independentes em pixels da fonte e posições das legendas. `src/Cut.tsx` aplica os recortes sem esticar a imagem e mantém o áudio em uma camada separada. `src/captions.json` contém palavras e tempos. Os intervalos usam frames a 30 fps, com início incluso e fim exclusivo.

## Exportar

```powershell
$env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run render:all
```

Os três MP4 serão gravados em `out/`. `OUTPUT_DIR` permite mudar a pasta. Sem `CHROME_PATH`, o renderizador utiliza seu navegador de renderização padrão.

Textos de publicação e identificação das fontes: `delivery.txt`. A aprovação da campanha continua sujeita à revisão dos organizadores.

## Fonte

Barlow Condensed ExtraBold, distribuída sob SIL Open Font License. Arquivo e licença em `public/fonts/`. Origem: https://github.com/google/fonts/tree/main/ofl/barlowcondensed. A fonte é um elemento de diagramação; imagem e áudio continuam exclusivamente dos trailers.
