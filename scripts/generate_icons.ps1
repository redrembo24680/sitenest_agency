Add-Type -AssemblyName System.Drawing

function Draw-Logo {
    param (
        [int]$size
    )

    $bmp = New-Object System.Drawing.Bitmap $size, $size
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    # Set high quality rendering
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    # Transparent background so it looks like a clean icon shape
    $g.Clear([System.Drawing.Color]::Transparent)
    
    # Scale factor
    $scale = $size / 100.0
    
    # Create a solid white brush and pen for the logo with thicker lines
    $brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $pen = New-Object System.Drawing.Pen $brush, (20 * $scale)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    
    # Draw path
    $points = @(
        (New-Object System.Drawing.PointF (80 * $scale), (25 * $scale)),
        (New-Object System.Drawing.PointF (50 * $scale), (10 * $scale)),
        (New-Object System.Drawing.PointF (20 * $scale), (25 * $scale)),
        (New-Object System.Drawing.PointF (20 * $scale), (45 * $scale)),
        (New-Object System.Drawing.PointF (50 * $scale), (60 * $scale)),
        (New-Object System.Drawing.PointF (80 * $scale), (45 * $scale)),
        (New-Object System.Drawing.PointF (80 * $scale), (75 * $scale)),
        (New-Object System.Drawing.PointF (50 * $scale), (90 * $scale)),
        (New-Object System.Drawing.PointF (20 * $scale), (75 * $scale))
    )
    
    # Draw lines
    for ($i = 0; $i -lt $points.Length - 1; $i++) {
        $g.DrawLine($pen, $points[$i], $points[$i+1])
    }
    
    # Draw the 4 rects (made slightly larger to match the thicker stroke)
    $rects = @(
        (New-Object System.Drawing.RectangleF (38 * $scale), (28 * $scale), (10 * $scale), (10 * $scale)),
        (New-Object System.Drawing.RectangleF (52 * $scale), (28 * $scale), (10 * $scale), (10 * $scale)),
        (New-Object System.Drawing.RectangleF (38 * $scale), (42 * $scale), (10 * $scale), (10 * $scale)),
        (New-Object System.Drawing.RectangleF (52 * $scale), (42 * $scale), (10 * $scale), (10 * $scale))
    )
    
    foreach ($r in $rects) {
        $g.FillRectangle($brush, $r)
    }
    
    $pen.Dispose()
    $brush.Dispose()
    $g.Dispose()
    
    return $bmp
}

# Create output directory if it doesn't exist
$outDir = "public"
if (!(Test-Path $outDir)) {
    New-Item -ItemType Directory -Path $outDir
}

# 1. Generate apple-touch-icon.png (180x180)
$appleBmp = Draw-Logo 180
$appleBmp.Save("$outDir/apple-touch-icon.png", [System.Drawing.Imaging.ImageFormat]::Png)
$appleBmp.Dispose()
Write-Host "Generated apple-touch-icon.png"

# 2. Generate 32x32 png, then package into favicon.ico
$favBmp = Draw-Logo 32
$ms = New-Object System.IO.MemoryStream
$favBmp.Save($ms, [System.Drawing.Imaging.ImageFormat]::Png)
$pngBytes = $ms.ToArray()
$ms.Dispose()
$favBmp.Dispose()

# Package into ICO format
# ICO Header (6 bytes): 00 00 01 00 01 00
# ICO Dir Entry (16 bytes): 32 32 00 00 01 00 20 00 [size: 4 bytes] [offset: 4 bytes = 22]
$icoBytes = New-Object byte[] (22 + $pngBytes.Length)
# Header
$icoBytes[0] = 0; $icoBytes[1] = 0  # Reserved
$icoBytes[2] = 1; $icoBytes[3] = 0  # Type: 1 (icon)
$icoBytes[4] = 1; $icoBytes[5] = 0  # Count: 1 image

# Dir Entry
$icoBytes[6] = 32                   # Width
$icoBytes[7] = 32                   # Height
$icoBytes[8] = 0                    # Color count (0 for >= 256 colors)
$icoBytes[9] = 0                    # Reserved
$icoBytes[10] = 1; $icoBytes[11] = 0 # Planes: 1
$icoBytes[12] = 32; $icoBytes[13] = 0 # BPP: 32

# PNG size (uint32)
$sizeBytes = [System.BitConverter]::GetBytes($pngBytes.Length)
[System.Array]::Copy($sizeBytes, 0, $icoBytes, 14, 4)

# PNG offset (uint32) = 22
$offsetBytes = [System.BitConverter]::GetBytes([int]22)
[System.Array]::Copy($offsetBytes, 0, $icoBytes, 18, 4)

# Copy PNG data
[System.Array]::Copy($pngBytes, 0, $icoBytes, 22, $pngBytes.Length)

# Save favicon.ico
[System.IO.File]::WriteAllBytes("$outDir/favicon.ico", $icoBytes)
Write-Host "Generated favicon.ico"
