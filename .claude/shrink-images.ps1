# Usage: shrink-images.ps1 -Root <site folder> [-Check]
# Makes web JPEGs (max 2400px, q85) from originals\<Folder>\*.png into <Folder>\, flattening transparency onto white.
param([string]$Root, [switch]$Check)
Add-Type -AssemblyName System.Drawing
$max = 2400
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object MimeType -eq "image/jpeg"
$params = New-Object System.Drawing.Imaging.EncoderParameters 1
$params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter ([System.Drawing.Imaging.Encoder]::Quality, [long]85)

Get-ChildItem (Join-Path $Root "originals") -Recurse -File -Include *.png | ForEach-Object {
  $src = $_
  $folder = $src.Directory.Name
  $img = [System.Drawing.Image]::FromFile($src.FullName)
  if ($Check) {
    # Sample a grid of pixels to see if any are transparent
    $bmp = New-Object System.Drawing.Bitmap $img
    $clear = 0
    for ($x = 0; $x -lt $bmp.Width; $x += [Math]::Max(1, [int]($bmp.Width / 40))) {
      for ($y = 0; $y -lt $bmp.Height; $y += [Math]::Max(1, [int]($bmp.Height / 40))) {
        if ($bmp.GetPixel($x, $y).A -lt 250) { $clear++ }
      }
    }
    "{0,-5} transparent samples  {1}\{2}" -f $clear, $folder, $src.Name
    $bmp.Dispose(); $img.Dispose(); return
  }
  $scale = [Math]::Min(1.0, $max / [Math]::Max($img.Width, $img.Height))
  $w = [int]($img.Width * $scale); $h = [int]($img.Height * $scale)
  $out = New-Object System.Drawing.Bitmap $w, $h
  $g = [System.Drawing.Graphics]::FromImage($out)
  $g.Clear([System.Drawing.Color]::White)
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($img, 0, 0, $w, $h)
  $dest = Join-Path (Join-Path $Root $folder) ($src.BaseName + ".jpg")
  $out.Save($dest, $codec, $params)
  $g.Dispose(); $out.Dispose(); $img.Dispose()
  "{0,6:N1} MB -> {1,5:N2} MB  {2}\{3}" -f ($src.Length / 1MB), ((Get-Item $dest).Length / 1MB), $folder, (Split-Path $dest -Leaf)
}
