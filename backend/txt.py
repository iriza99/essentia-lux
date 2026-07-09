import os
import shutil

# Ruta actual donde se ejecuta el script
directorio = os.path.dirname(os.path.abspath(__file__))

# Lista de archivos adicionales que se deben incluir
archivos_adicionales = [
    '.env.example', 
    'package.json', 
    'vercel.json'
]

# Lista todos los archivos en el directorio actual y subcarpetas
archivos = os.listdir(directorio)

# Función para listar los archivos dentro de la carpeta "services"
def listar_archivos_services():
    ruta_services = os.path.join(directorio, 'services')
    archivos_services = []
    if os.path.exists(ruta_services):
        archivos_services = os.listdir(ruta_services)
    return archivos_services

# Lista los archivos objetivo incluyendo los archivos .js en la raíz y los de la carpeta services
archivos_objetivo = [f for f in archivos if f.endswith('.py') or f.endswith('.js') or f == '.env' or f in archivos_adicionales]

# Agregar archivos de la carpeta "services"
archivos_objetivo += listar_archivos_services()

# Nombre del archivo de salida
archivo_salida = os.path.join(directorio, 'archivos_convertidos.txt')

# Función para intentar abrir un archivo con varias codificaciones
def leer_archivo(ruta):
    codificaciones = ['utf-8-sig', 'utf-8', 'latin-1']
    for codificacion in codificaciones:
        try:
            with open(ruta, 'r', encoding=codificacion) as f:
                return f.read()
        except UnicodeDecodeError:
            continue
    # Si todas las codificaciones fallan, devolver un mensaje de error
    return f"Error al leer el archivo: {ruta}"

# Copiar archivos de la lista "archivos_objetivo" al archivo de salida
with open(archivo_salida, 'w', encoding='utf-8') as salida:
    for archivo in archivos_objetivo:
        # Si el archivo está dentro de "services", obtener la ruta completa
        if archivo in listar_archivos_services():
            ruta = os.path.join(directorio, 'services', archivo)
        else:
            ruta = os.path.join(directorio, archivo)
        
        # Comprobar si el archivo existe
        if os.path.exists(ruta):
            contenido = leer_archivo(ruta)
            salida.write(f"{'='*60}\n")
            salida.write(f"Archivo: {archivo}\n")
            salida.write(f"{'='*60}\n")
            salida.write(contenido + "\n\n")

print("Archivos convertidos y guardados en 'archivos_convertidos.txt'")
