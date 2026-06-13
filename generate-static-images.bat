@echo off
REM =========================================================
REM  generate-static-images.bat
REM  Converts big source images to WebP at multiple widths.
REM
REM  Requirements: ImageMagick (magick.exe on PATH)
REM  Source images are read from src-images\
REM  Output goes to   public\images\r\<width>\<name>.webp
REM
REM  Quality is tiered by breakpoint so phones download much
REM  smaller files while desktop / retina stay crisp:
REM    - 3840            -> 95  (4K / retina)
REM    - 1560..1140      -> 90  (large desktop)
REM    - 1024, 768       -> 85  (tablet / small laptop)
REM    - 576, 480, 360   -> 80  (phones - aggressive compression)
REM =========================================================

for %%F in (
    src-images\review-customer.png
    src-images\step-results.png
    src-images\advantages-bg.png
    src-images\generations.png
    src-images\step-app.png
    src-images\step-device.jpeg
    src-images\footerBg.png
    src-images\violations-detection.png
    src-images\smartcardio-start.webp
) do (
    REM --- 3840 at 95 quality (for retina / 4K screens) ---
    for %%W in (3840) do (
        mkdir public\images\r\%%W 2>nul
        magick.exe %%F -resize %%Wx -quality 95 ^
            -define webp:image-hint=photo ^
            -define webp:method=6 ^
            -define webp:pass=10 ^
            -define webp:auto-filter=true ^
            public\images\r\%%W\%%~nF.webp
        echo [%%W q95] %%~nF.webp
    )

    REM --- Large desktop at 90 quality ---
    for %%W in (1560 1440 1200 1140) do (
        mkdir public\images\r\%%W 2>nul
        magick.exe %%F -resize %%Wx -quality 90 ^
            -define webp:image-hint=photo ^
            -define webp:method=6 ^
            -define webp:pass=10 ^
            -define webp:auto-filter=true ^
            public\images\r\%%W\%%~nF.webp
        echo [%%W q90] %%~nF.webp
    )

    REM --- Tablet / small laptop at 85 quality ---
    for %%W in (1024 768) do (
        mkdir public\images\r\%%W 2>nul
        magick.exe %%F -resize %%Wx -quality 85 ^
            -define webp:image-hint=photo ^
            -define webp:method=6 ^
            -define webp:pass=10 ^
            -define webp:auto-filter=true ^
            public\images\r\%%W\%%~nF.webp
        echo [%%W q85] %%~nF.webp
    )

    REM --- Phones at 80 quality (aggressive, smallest files) ---
    for %%W in (576 480 360) do (
        mkdir public\images\r\%%W 2>nul
        magick.exe %%F -resize %%Wx -quality 80 ^
            -define webp:image-hint=photo ^
            -define webp:method=6 ^
            -define webp:pass=10 ^
            -define webp:auto-filter=true ^
            -define webp:sns-strength=50 ^
            public\images\r\%%W\%%~nF.webp
        echo [%%W q80] %%~nF.webp
    )
)

echo.
echo Done! Output: public\images\r\
pause
