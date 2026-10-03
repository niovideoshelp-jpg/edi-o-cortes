# HardScope — três cortes em Remotion

Projeto editável com três vídeos independentes em 1080 × 1920, 30 fps, MP4 H.264/AAC. Legendas em inglês, brancas com contorno escuro e destaque amarelo sincronizado. A posição muda em cenas específicas para preservar rostos e cartas.

| Composição     |  Duração | Trechos do trailer original                                   |
| -------------- | -------: | ------------------------------------------------------------- |
| R3born         | 12,733 s | 00:59,150–01:05,950; 01:08,050–01:13,983                      |
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

Edite `src/Root.tsx` para ajustar sequências e posições; `src/Cut.tsx` controla enquadramento, zoom e estilo das legendas; `src/captions.json` contém palavras e tempos.

## Exportar

```powershell
$env:CHROME_PATH = 'C:\Program Files\Google\Chrome\Application\chrome.exe'
npm run render:all
```

Os três MP4 serão gravados em `out/`. `OUTPUT_DIR` permite mudar a pasta. Sem `CHROME_PATH`, o renderizador utiliza seu navegador de renderização padrão.

Textos de publicação e identificação das fontes: `delivery.txt`. A aprovação da campanha continua sujeita à revisão dos organizadores.
