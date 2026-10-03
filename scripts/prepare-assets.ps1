param([Parameter(Mandatory=$true)][string]$SourceDirectory)
$ErrorActionPreference = 'Stop'
$projectDirectory = Split-Path $PSScriptRoot -Parent
$mediaDirectory = Join-Path $projectDirectory 'public'
New-Item -ItemType Directory -Force -Path $mediaDirectory | Out-Null
& ffmpeg -hide_banner -loglevel error -threads 2 -y -ss 8.8 -i (Join-Path $SourceDirectory 'VERT_LOVE AND JUSTICE_H.264.mp4') -t 11.3 -vf fps=30 -c:v libx264 -preset fast -crf 18 -threads 2 -c:a aac -b:a 192k -movflags +faststart (Join-Path $mediaDirectory 'love-source.mp4')
if ($LASTEXITCODE -ne 0) { throw 'Love & Justice preprocessing failed' }
& ffmpeg -hide_banner -loglevel error -threads 2 -y -ss 59.15 -i (Join-Path $SourceDirectory 'N3ON_R3BORN_UPDATED.mp4') -t 14.85 -vf 'scale=1920:1080,fps=30' -c:v libx264 -preset fast -crf 17 -threads 2 -c:a aac -b:a 192k -movflags +faststart (Join-Path $mediaDirectory 'r3born-source.mp4')
if ($LASTEXITCODE -ne 0) { throw 'R3born preprocessing failed' }
Copy-Item -LiteralPath (Join-Path $SourceDirectory 'UNPACKED TRAILER V5 - FINAL_VERTICAL_h264.mp4') -Destination (Join-Path $mediaDirectory 'unpacked-original.mp4')
