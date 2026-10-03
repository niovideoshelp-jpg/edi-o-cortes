param([Parameter(Mandatory=$true)][string]$SourceDirectory)
$ErrorActionPreference = 'Stop'
$projectDirectory = Split-Path $PSScriptRoot -Parent
$mediaDirectory = Join-Path $projectDirectory 'public'
New-Item -ItemType Directory -Force -Path $mediaDirectory | Out-Null
& ffmpeg -hide_banner -loglevel error -threads 2 -y -ss 8.8 -i (Join-Path $SourceDirectory 'VERT_LOVE AND JUSTICE_H.264.mp4') -t 11.3 -vf fps=30 -c:v libx264 -preset fast -crf 18 -threads 2 -c:a aac -b:a 192k -movflags +faststart (Join-Path $mediaDirectory 'love-source.mp4')
if ($LASTEXITCODE -ne 0) { throw 'Love & Justice preprocessing failed' }
& ffmpeg -hide_banner -loglevel error -threads 2 -y -ss 59.15 -i (Join-Path $SourceDirectory 'N3ON_R3BORN_UPDATED.mp4') -t 14.85 -vf 'scale=1920:1080,fps=30' -c:v libx264 -preset fast -crf 17 -threads 2 -c:a aac -b:a 192k -movflags +faststart (Join-Path $mediaDirectory 'r3born-source.mp4')
if ($LASTEXITCODE -ne 0) { throw 'R3born preprocessing failed' }
& ffmpeg -hide_banner -loglevel error -threads 2 -y -ss 77.85 -i (Join-Path $SourceDirectory 'N3ON_R3BORN_UPDATED.mp4') -t 9 -vf 'scale=1920:1080,fps=30' -c:v libx264 -preset fast -crf 17 -threads 2 -c:a aac -b:a 192k -movflags +faststart (Join-Path $mediaDirectory 'r3born-extra.mp4')
if ($LASTEXITCODE -ne 0) { throw 'R3born extra preprocessing failed' }
$unpackedSource = Join-Path $SourceDirectory 'UNPACKED TRAILER V5 - FINAL_VERTICAL_h264.mp4'
$segments = @(@{start=5.2;duration=3.5;name='unpacked-1.mp4'},@{start=15.2;duration=5;name='unpacked-2.mp4'},@{start=23.1;duration=2.4;name='unpacked-3.mp4'})
foreach ($segment in $segments) {
 & ffmpeg -hide_banner -loglevel error -threads 2 -y -ss $segment.start -i $unpackedSource -t $segment.duration -vf fps=30 -c:v libx264 -preset fast -crf 18 -threads 2 -c:a aac -b:a 192k -movflags +faststart (Join-Path $mediaDirectory $segment.name)
 if ($LASTEXITCODE -ne 0) { throw 'Unpacked preprocessing failed' }
}
