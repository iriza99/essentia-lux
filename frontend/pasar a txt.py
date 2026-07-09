import os

# Ruta raíz del proyecto frontend
RUTA_RAIZ = "C:/Users/Andres/OneDrive/Desktop/Python/Portafolio/VS Code/opcion 2 pagina web/frontend"

# Archivos específicos a exportar (rutas relativas desde RUTA_RAIZ)
ARCHIVOS_ESPECIFICOS = [
    "app/globals.css",
    "components/navbar.tsx",
    "app/layout.tsx",
    "tailwind.config.ts",
    "components/header.tsx",
    "utils/motion-transitions.tsx",
    
]

# Ruta del archivo de salida
ARCHIVO_SALIDA = 'archivos_seleccionados_frontend.txt'


def exportar_archivos():
    with open(ARCHIVO_SALIDA, 'w', encoding='utf-8') as salida:
        for archivo_rel in ARCHIVOS_ESPECIFICOS:
            ruta_completa = os.path.join(RUTA_RAIZ, archivo_rel)

            salida.write(f"\n\n===== {archivo_rel} =====\n\n")
            try:
                with open(ruta_completa, 'r', encoding='utf-8') as f:
                    contenido = f.read()
                    salida.write(contenido + "\n")
            except Exception as e:
                salida.write(f"⚠️ Error al leer {archivo_rel}: {e}\n")


if __name__ == "__main__":
    exportar_archivos()
    print(f"✅ Archivos seleccionados exportados a {ARCHIVO_SALIDA}")
