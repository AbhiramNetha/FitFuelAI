# Quick Fix Script for Dashboard.tsx
# This will show you the exact characters in your file

Write-Host "Checking your Dashboard.tsx file..." -ForegroundColor Yellow

$filePath = "C:\Users\aarup\OneDrive\Desktop\fitfuel-ai\components\Dashboard.tsx"

# Read first few lines
$lines = Get-Content $filePath -Head 10

Write-Host "`nFirst 10 lines of your file:" -ForegroundColor Cyan
$lines | ForEach-Object { Write-Host $_ }

Write-Host "`n`nChecking for problematic characters..." -ForegroundColor Yellow

# Check line 3 specifically
$line3 = (Get-Content $filePath)[2]
Write-Host "`nLine 3: $line3" -ForegroundColor Green

# Show byte representation
$bytes = [System.Text.Encoding]::UTF8.GetBytes($line3)
Write-Host "Bytes: $bytes" -ForegroundColor Gray

# Check for smart quotes
if ($line3 -match "[\u2018\u2019\u201C\u201D]") {
    Write-Host "`nFOUND SMART QUOTES! Your file is corrupted!" -ForegroundColor Red
} else {
    Write-Host "`nNo smart quotes found. Checking other issues..." -ForegroundColor Yellow
}
