# Publicar J&M Lavados en GitHub (ejecutar en PowerShell desde la raíz del proyecto)
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

$ghPaths = @(
  "$env:ProgramFiles\GitHub CLI\gh.exe",
  "$env:LocalAppData\Programs\GitHub CLI\gh.exe"
)
$gh = $ghPaths | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $gh) {
  $env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")
  $gh = "gh"
}

function Invoke-Gh {
  param([Parameter(ValueFromRemainingArguments = $true)][string[]]$Args)
  & $gh @Args
}

Write-Host "Comprobando sesion de GitHub..." -ForegroundColor Cyan
Invoke-Gh auth status 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Inicia sesion en GitHub (se abrira el navegador):" -ForegroundColor Yellow
  Invoke-Gh auth login --hostname github.com --git-protocol https --web
}

$repoName = "jymlavados"
Invoke-Gh repo view $repoName 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Creando repositorio $repoName en GitHub..." -ForegroundColor Cyan
  Invoke-Gh repo create $repoName --public --source=. --remote=origin --push --description "Landing J&M Lavados - limpieza a domicilio en Cartagena"
} else {
  Write-Host "El repositorio ya existe. Subiendo cambios..." -ForegroundColor Cyan
  git push -u origin main
}

$url = Invoke-Gh repo view --json url -q .url
Write-Host ""
Write-Host "Listo: $url" -ForegroundColor Green
Write-Host "Siguiente paso: despliega en https://vercel.com importando este repositorio." -ForegroundColor Cyan
