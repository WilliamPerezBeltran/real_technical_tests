#!/bin/bash

# Leer el archivo urls.txt línea por línea
while IFS= read -r url; do
    # Ejecutar el comando git clone con la URL actual
    git clone "$url"
done < urls.txt
