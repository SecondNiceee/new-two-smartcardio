@echo off
REM =========================================================
REM  generate-static-images.bat
REM  Converts big source images to WebP at multiple widths.
REM
REM  Requirements: ImageMagick (magick.exe on PATH)
REM  Source images are read from src-images\
REM  Output goes to   public\images\r\<width>\<name>.webp
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
) do (
    REM --- 3840 at 97 quality (for retina / 4K screens) ---
    for %%W in (3840) do (
        mkdir public\images\r\%%W 2>nul
        magick.exe %%F -resize %%Wx -quality 97 ^
            -define webp:image-hint=photo ^
            -define webp:method=6 ^
            -define webp:pass=10 ^
            -define webp:auto-filter=true ^
            public\images\r\%%W\%%~nF.webp
        echo [%%W] %%~nF.webp
    )

    REM --- Smaller breakpoints at 99 quality ---
    for %%W in (1560 1440 1200 1140 1024 768 576 480 360) do (
        mkdir public\images\r\%%W 2>nul
        magick.exe %%F -resize %%Wx -quality 99 ^
            -define webp:image-hint=photo ^
            -define webp:method=6 ^
            -define webp:pass=10 ^
            -define webp:auto-filter=true ^
            public\images\r\%%W\%%~nF.webp
        echo [%%W] %%~nF.webp
    )
)

echo.
echo Done! Output: public\images\r\
pause
