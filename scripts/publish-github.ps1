# Publicar J&M Lavados en GitHub (ejecutar en PowerShell desde la raíz del proyecto)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

Write-Host "Comprobando sesión de GitHub..." -ForegroundColor Cyan
gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Inicia sesión en GitHub (se abrirá el navegador):" -ForegroundColor Yellow
  gh auth login --hostname github.com --git-protocol https --web
}

$repoName = "jymlavados"
$exists = gh repo view $repoName 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Creando repositorio $repoName en GitHub..." -ForegroundColor Cyan
  gh repo create $repoName --public --source=. --remote=origin --push --description "Landing J&M Lavados - limpieza a domicilio en Cartagena"
} else {
  Write-Host "El repositorio ya existe. Subiendo cambios..." -ForegroundColor Cyan
  git push -u origin main
}

$url = gh repo view --json url -q .url
Write-Host ""
Write-Host "Listo: $url" -ForegroundColor Green
Write-Host "Siguiente paso: despliega en https://vercel.com importando este repositorio." -ForegroundColor Cyan
