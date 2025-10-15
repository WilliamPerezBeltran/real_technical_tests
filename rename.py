import os
import sys
import re

def to_snake_case(name: str) -> str:
    parts = name.split(".")
    ext = ""
    if len(parts) > 1:
        ext = "." + parts[-1]
        name = ".".join(parts[:-1])

    name = name.lower()
    name = re.sub(r"[^a-z0-9]+", "_", name)
    name = re.sub(r"_+", "_", name)
    name = name.strip("_")

    return name + ext

def rename_all(base_path):
    for root, dirs, files in os.walk(base_path, topdown=False):
        for filename in files:
            old_path = os.path.join(root, filename)
            new_name = to_snake_case(filename)
            new_path = os.path.join(root, new_name)
            if old_path != new_path:
                os.rename(old_path, new_path)
                print(f"Archivo: {filename} -> {new_name}")

        for dirname in dirs:
            old_path = os.path.join(root, dirname)
            new_name = to_snake_case(dirname)
            new_path = os.path.join(root, new_name)
            if old_path != new_path:
                os.rename(old_path, new_path)
                print(f"Carpeta: {dirname} -> {new_name}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Uso: python3 rename_all_snake_case.py <directorio>")
        print("Ejemplo: python3 rename_all_snake_case.py ./")
        sys.exit(1)

    folder_path = os.path.abspath(sys.argv[1])
    if os.path.exists(folder_path):
        rename_all(folder_path)
        print("\nRenombrado completado (snake_case + minúsculas).")
    else:
        print("La ruta especificada no existe.")
