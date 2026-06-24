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
    
    $g.Clear([System.Drawing.Color]::Transparent)
    
    # Scale factor
    $scale = $size / 100.0
    
    # Create the gradient brush
    # x1=20, y1=10, x2=80, y2=90
    $p1 = New-Object System.Drawing.PointF (20 * $scale), (10 * $scale)
    $p2 = New-Object System.Drawing.PointF (80 * $scale), (90 * $scale)
    
    # In .NET we can use LinearGradientBrush
    $color1 = [System.Drawing.ColorTranslator]::FromHtml("#ff5e00")
    $color2 = [System.Drawing.ColorTranslator]::FromHtml("#ff007f")
    $color3 = [System.Drawing.ColorTranslator]::FromHtml("#00f0ff")
    
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush $p1, $p2, $color1, $color3
    $blend = New-Object System.Drawing.Drawing2D.ColorBlend
    $blend.Colors = @($color1, $color2, $color3)
    $blend.Positions = @(0.0, 0.5, 1.0)
    $brush.InterpolationColors = $blend
    
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
    
    $pen = New-Object System.Drawing.Pen $brush, (12 * $scale)
    $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $pen.LineJoin = [System.Drawing.Drawing2D.LineJoin]::Round
    
    # Draw lines
    for ($i = 0; $i -lt $points.Length - 1; $i++) {
        $g.DrawLine($pen, $points[$i], $points[$i+1])
    }
    
    # Draw the 4 rects
    # (42, 32), (52, 32), (42, 42), (52, 42) of size 6
    $rects = @(
        (New-Object System.Drawing.RectangleF (42 * $scale), (32 * $scale), (6 * $scale), (6 * $scale)),
        (New-Object System.Drawing.RectangleF (52 * $scale), (32 * $scale), (6 * $scale), (6 * $scale)),
        (New-Object System.Drawing.RectangleF (42 * $scale), (42 * $scale), (6 * $scale), (6 * $scale)),
        (New-Object System.Drawing.RectangleF (52 * $scale), (42 * $scale), (6 * $scale), (6 * $scale))
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
