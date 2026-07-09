import qrcode

# URL a convertir en QR
url = "https://www.essluxam.com/"

# Crear QR
qr = qrcode.QRCode(
    version=1,
    error_correction=qrcode.constants.ERROR_CORRECT_H,
    box_size=10,
    border=4,
)

qr.add_data(url)
qr.make(fit=True)

# Generar imagen
img = qr.make_image(fill_color="black", back_color="white")

# Guardar imagen
img.save("qr_essentia_lux.png")

print("QR guardado como 'qr_essentia_lux.png'")
