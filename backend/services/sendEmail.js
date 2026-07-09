const nodemailer = require('nodemailer');

async function sendEmail(email, nombre, fecha, hora, servicio, empleado) {
    const smtpUsername = process.env.SMTP_USERNAME;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpUsername || !smtpPassword) {
        throw new Error('Las credenciales SMTP no están configuradas correctamente.');
    }

    // Función para formatear la fecha
    function formatearFecha(fechaString) {
        const meses = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        
        const fechaObj = new Date(fechaString + 'T00:00:00');
        const dia = fechaObj.getDate();
        const mes = meses[fechaObj.getMonth()];
        const año = fechaObj.getFullYear();
        
        return `${dia} de ${mes} ${año}`;
    }

    const fechaFormateada = formatearFecha(fecha);

    // Crear transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: smtpUsername,
            pass: smtpPassword
        }
    });

    const htmlMensaje = `
    <!DOCTYPE html>
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <title>Confirmación de cita - Essentia Lux</title>
        <!--[if mso]>
        <noscript>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
        </noscript>
        <![endif]-->
        <style>
            /* Reset styles */
            body, table, td, p, a, li, blockquote {
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
            table, td {
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            img {
                -ms-interpolation-mode: bicubic;
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
            }

            /* Client-specific styles */
            body {
                margin: 0 !important;
                padding: 0 !important;
                width: 100% !important;
                min-width: 100% !important;
            }
            
            .ReadMsgBody { width: 100%; }
            .ExternalClass { width: 100%; }
            .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div {
                line-height: 100%;
            }
            
            /* Main styles */
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
            
            .main-table {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-collapse: collapse;
            }
            
            .header-bg {
                background-color: #6A806C;
                background-image: linear-gradient(135deg, #6A806C 0%, #AF7E44 100%);
            }
            
            .header-content {
                padding: 40px 20px;
                text-align: center;
                color: #ffffff;
            }
            
            .logo {
                font-size: 28px;
                font-weight: bold;
                letter-spacing: 3px;
                margin-bottom: 8px;
                color: #ffffff;
                text-decoration: none;
            }
            
            .subtitle {
                font-size: 14px;
                opacity: 0.9;
                color: #ffffff;
            }
            
            .content-padding {
                padding: 30px 20px;
            }
            
            .greeting {
                font-size: 18px;
                color: #6A806C;
                margin-bottom: 20px;
                font-weight: bold;
            }
            
            .message {
                font-size: 16px;
                color: #444444;
                line-height: 1.6;
                margin-bottom: 25px;
                text-align: justify;
            }
            
            .appointment-card {
                background-color: #f8f9fa;
                border-left: 4px solid #6A806C;
                border-radius: 8px;
                margin: 25px 0;
                overflow: hidden;
            }
            
            .appointment-row {
                border-collapse: collapse;
                width: 100%;
            }
            
            .appointment-item {
                padding: 20px 20px 20px 25px;
                border-bottom: none;
            }
            
            .appointment-item:not(:last-child) {
                padding-bottom: 15px;
            }
            
            .icon-cell {
                width: 60px;
                vertical-align: top;
                padding-right: 2px;
                padding-left: 12px;   

            }
            
            .icon-svg {
                width: 32px;
                height: 32px;
                background-color: #6A806C;
                border-radius: 50%;
                display: inline-block;
                text-align: center;
                line-height: 32px;
                color: #ffffff;
                font-weight: bold;
                font-size: 16px;
            }
            
            .label {
                font-weight: bold;
                color: #6A806C;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 0.5px;
                display: block;
            }
            
            .value {
                color: #333333;
                font-size: 15px;
                line-height: 1.4;
                margin-bottom: 18px;
                display: block; 
            }
            
            .note {
                background-color: #fff3cd;
                border: 1px solid #f0c419;
                border-radius: 8px;
                padding: 20px;
                margin: 25px 0;
                color: #856404;
                font-size: 14px;
                line-height: 1.5;
                text-align: justify;
            }
            
            .warning-icon {
                font-size: 18px;
                margin-right: 8px;
            }
            
            .closing {
                background-color: #f8f9fa;
                padding: 25px 20px;
                text-align: center;
                font-style: italic;
                color: #6A806C;
                border-radius: 8px;
                margin: 25px 0;
            }
            
            .footer {
                background-color: #f8f9fa;
                padding: 30px 20px;
                border-top: 3px solid #6A806C;
            }
            
            .contact-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            
            .contact-row {
                margin-bottom: 10px;
            }
            
            .contact-item {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 15px;
                margin-bottom: 10px;
                border: 1px solid #e9ecef;
                text-decoration: none;
                color: #6A806C;
                display: block;
                transition: all 0.3s ease;
            }
            
            .contact-item:hover {
                background: linear-gradient(135deg, #6A806C, #AF7E44);
                color: #ffffff;
                border-color: #6A806C;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(106, 128, 108, 0.3);
            }
            
            .contact-item:hover .contact-icon {
                background-color: #ffffff;
                color: #6A806C;
            }
            
            .contact-item:hover .contact-icon.email {
                background-color: #ffffff;
                color: #0078d4;
            }
            
            .contact-item:hover .contact-icon.web {
                background-color: #ffffff;
                color: #6A806C;
            }
            
            .contact-icon {
                width: 24px;
                height: 24px;
                background-color: #25D366;
                border-radius: 50%;
                display: inline-block;
                text-align: center;
                line-height: 24px;
                color: #ffffff;
                font-weight: bold;
                font-size: 12px;
                margin-right: 10px;
                vertical-align: middle;
            }
            
            .contact-icon.email {
                background-color: #0078d4;
            }
            
            .contact-icon.web {
                background-color: #6A806C;
            }
            
            .contact-title {
                font-weight: bold;
                font-size: 14px;
                margin-bottom: 2px;
            }
            
            .contact-subtitle {
                font-size: 12px;
                opacity: 0.8;
            }
            
            .footer-note {
                text-align: center;
                font-size: 12px;
                color: #666666;
                line-height: 1.4;
                border-top: 1px solid #e9ecef;
                padding-top: 20px;
                margin-top: 20px;
            }

            /* Mobile styles */
            @media only screen and (max-width: 600px) {
                .main-table {
                    width: 100% !important;
                }
                
                .content-padding {
                    padding: 20px 15px !important;
                }
                
                .header-content {
                    padding: 30px 15px !important;
                }
                
                .logo {
                    font-size: 24px !important;
                    letter-spacing: 2px !important;
                }
                
                .appointment-card {
                    margin-left: 5px !important;
                }
                
                .appointment-item {
                    padding: 20px 15px 18px 20px !important;
                }
                
                .appointment-item:not(:last-child) {
                    margin-bottom: 12px !important;
                }
                
                .contact-item {
                    padding: 12px !important;
                }
                
                .icon-svg {
                    width: 28px !important;
                    height: 28px !important;
                    line-height: 28px !important;
                    font-size: 14px !important;
                }
            }
        </style>
    </head>
    <body>
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
                <td align="center" style="padding: 15px 10px;">
                    
                    <!-- Main Container -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="main-table">
                        
                        <!-- Header -->
                        <tr>
                            <td class="header-bg">
                                <div class="header-content">
                                    <div class="logo">ESSENTIA LUX</div>
                                    <div class="subtitle">Aesthetic Medicine</div>
                                </div>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td class="content-padding">
                                <div class="greeting">
                                    Estimado/a <strong>${nombre}</strong>,
                                </div>
                                
                                <div class="message">
                                    Nos complace confirmar su cita médica. Hemos reservado el siguiente horario especialmente para usted con el compromiso de brindarle la mejor atención médico-estética.
                                </div>

                                <!-- Appointment Card -->
                                <div class="appointment-card">
                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" class="appointment-row">
                                        <tr class="appointment-item">
                                            <td class="icon-cell">
                                                <div class="icon-svg">🗓️</div>
                                            </td>
                                            <td>
                                                <div class="label">Fecha</div>
                                                <div class="value">${fechaFormateada}</div>
                                            </td>
                                        </tr>
                                        <tr class="appointment-item">
                                            <td class="icon-cell">
                                                <div class="icon-svg">⏰</div>
                                            </td>
                                            <td>
                                                <div class="label">Hora</div>
                                                <div class="value">${hora}</div>
                                            </td>
                                        </tr>
                                        <tr class="appointment-item">
                                            <td class="icon-cell">
                                                <div class="icon-svg">⚕</div>
                                            </td>
                                            <td>
                                                <div class="label">Servicio</div>
                                                <div class="value">${servicio}</div>
                                            </td>
                                        </tr>
                                        <tr class="appointment-item">
                                            <td class="icon-cell">
                                                <div class="icon-svg">👩🏻‍⚕️</div>
                                            </td>
                                            <td>
                                                <div class="label">Doctor(a)</div>
                                                <div class="value">${empleado}</div>
                                            </td>
                                        </tr>
                                        <tr class="appointment-item">
                                            <td class="icon-cell">
                                                <div class="icon-svg">📍</div>
                                            </td>
                                            <td>
                                                <div class="label">Ubicación</div>
                                                <div class="value">
                                                <a href="https://maps.app.goo.gl/7TUJGhKyb4K1Fwfj9" target="_blank" rel="noopener noreferrer">
                                                    Centro Médico Lealtad<br>
                                                    C. Lealtad, 12, Esc A 1º Izda<br>
                                                    39002 Santander, Cantabria, España
                                                </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>

                                <div class="note">
                                    <span class="warning-icon">⚠️</span><strong>Importante:</strong> Si necesita modificar o cancelar su cita, por favor contáctenos con al menos 24 horas de anticipación. Agradecemos su comprensión y colaboración.
                                </div>

                                <div class="closing">
                                    ¡Gracias por confiar en Essentia Lux!<br>
                                    Esperamos verle pronto y brindarle una experiencia excepcional. ✨
                                </div>
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td class="footer">
                                <!-- WhatsApp -->
                                <div class="contact-item">
                                    <span class="contact-icon">W</span>
                                    <div style="display: inline-block; vertical-align: middle;">
                                        <div class="contact-title">WhatsApp</div>
                                        <div class="contact-subtitle">+34 691 589 789</div>
                                    </div>
                                </div>
                                
                                <!-- Email -->
                                <div class="contact-item">
                                    <span class="contact-icon email">@</span>
                                    <div style="display: inline-block; vertical-align: middle;">
                                        <div class="contact-title">Email</div>
                                        <div class="contact-subtitle">info@essluxam.com</div>
                                    </div>
                                </div>
                                
                                <!-- Website -->
                                <div class="contact-item">
                                    <span class="contact-icon web">W</span>
                                    <div style="display: inline-block; vertical-align: middle;">
                                        <div class="contact-title">Sitio Web</div>
                                        <div class="contact-subtitle">Visítanos online</div>
                                    </div>
                                </div>
                                
                                <div class="footer-note">
                                    Este correo es una confirmación automática de su cita médica.<br>
                                    Para consultas, utilice nuestros canales oficiales de contacto.
                                </div>
                            </td>
                        </tr>
                        
                    </table>
                    
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;

    const mailOptions = {
        from: smtpUsername,
        to: email,
        bcc: ['info@essluxam.com'],
        subject: `✨ Cita confirmada en Essentia Lux - ${nombre} | ${fechaFormateada} a las ${hora}`,
        html: htmlMensaje
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email enviado:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error enviando email:', error);
        throw error;
    }
}

module.exports = { sendEmail };