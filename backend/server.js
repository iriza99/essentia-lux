// Cargar variables de entorno PRIMERO
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const moment = require('moment-timezone');

// Importar módulos locales
const GoogleCalendar = require('./services/googleCalendar');
const GoogleSheet = require('./services/googleSheets');
const GoogleSheetResenas = require('./services/googleSheetsResenas');
const { sendEmail } = require('./services/sendEmail');
const { getGoogleReviews } = require('./services/googleReviews');

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Configuración CORS
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://tu-dominio-vercel.vercel.app', // Reemplázalo con tu dominio real si es diferente
    'https://essentia-lux.vercel.app',
    'https://www.essluxam.com',
    'https://essluxam.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Configuración general
const CALENDAR_ID = {
  "Dra. Catalina Tenjo": process.env.CALENDAR_ID || "centromedicoessentialux@gmail.com"
};
const TIMEZONE = "Europe/Madrid";
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const SHEET_CITAS = "citas";
const SHEET_RESEÑAS = "reseñas";
const HORAS_DISPONIBLES = [
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30"
];

function getGoogleCredentialsFromEnv() {
  const creds = {
    type: process.env.GOOGLE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL,
  };

  console.log('🔑 Credenciales cargadas:', {
    client_email: creds.client_email,
    project_id: creds.project_id,
    private_key_loaded: !!creds.private_key
  });

  return creds;
}

// Rutas
app.get('/', (req, res) => {
  res.json({ message: "API de Essentia Lux funcionando correctamente" });
});

app.get('/horas-disponibles', async (req, res) => {
  try {
    const { fecha, empleado } = req.query;
    if (!fecha || !empleado) {
      return res.status(400).json({ error: "Fecha y empleado son requeridos" });
    }

    const fechaObj = moment.tz(fecha, TIMEZONE);
    if (fechaObj.day() === 0 || fechaObj.day() === 6) {
      return res.json(["No disponible"]);
    }

    const calendarId = CALENDAR_ID[empleado];
    if (!calendarId) {
      return res.status(400).json({ error: "Empleado inválido" });
    }

    const creds = getGoogleCredentialsFromEnv();
    const calendar = new GoogleCalendar(creds, calendarId);

    const hoy = moment.tz(TIMEZONE);
    const ahora = hoy.format('HH:mm');

    let horasValidas = [...HORAS_DISPONIBLES];
    if (fechaObj.isSame(hoy, 'day')) {
      horasValidas = HORAS_DISPONIBLES.filter(hora => hora > ahora);
    } else if (fechaObj.isBefore(hoy, 'day')) {
      horasValidas = [];
    }

    const horasOcupadas = await calendar.getStartTimes(fecha);
    const horasDisponibles = horasValidas.filter(hora => !horasOcupadas.includes(hora));

    res.json(horasDisponibles.length > 0 ? horasDisponibles : ["No hay disponibilidad"]);
  } catch (error) {
    console.error('❌ Error obteniendo horas disponibles:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/reservar', async (req, res) => {
  try {
    const { nombre, email, celular, servicio, empleado, fecha, hora, nota = "" } = req.body;
    if (!nombre || !email || !celular || !servicio || !empleado || !fecha || !hora) {
      return res.status(400).json({ error: "Todos los campos son requeridos" });
    }

    // Log para debugging
    console.log('📧 Email recibido para envío:', {
      email: email,
      tipo: typeof email,
      longitud: email?.length,
      espacios: email?.includes(' '),
      formato: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')
    });

    const calendarId = CALENDAR_ID[empleado];
    if (!calendarId) return res.status(400).json({ error: "Empleado inválido" });

    const startDt = moment.tz(`${fecha} ${hora}`, "YYYY-MM-DD HH:mm", TIMEZONE);
    const endDt = startDt.clone().add(30, 'minutes');

    const creds = getGoogleCredentialsFromEnv();
    const calendar = new GoogleCalendar(creds, calendarId);

    await calendar.createEvent(
      `${servicio} - ${nombre}`,
      startDt.toISOString(),
      endDt.toISOString(),
      TIMEZONE,
      null,
      nota
    );

    let celularFormatted = celular.toString().trim();
    if (!celularFormatted.startsWith('+')) {
      celularFormatted = '+34' + celularFormatted.replace(/^0+/, '');
    }

    // Manejo mejorado del envío de correo
    let correoEnviado = false;
    let errorCorreo = null;
    try {
      console.log('🔄 Intentando enviar correo a:', email);
      const resultado = await sendEmail(email, nombre, fecha, hora, servicio, empleado);
      console.log('✅ Correo enviado exitosamente:', resultado);
      correoEnviado = true;
    } catch (e) {
      console.error("❌ Error detallado al enviar correo:", {
        message: e.message,
        email: email,
        timestamp: new Date().toISOString()
      });
      errorCorreo = e.message;
    }

    try {
      let precio = "";
      if (servicio.includes("€")) {
        const match = servicio.match(/€\s*(\d+)/);
        precio = match ? match[1] : "";
      }

      const datos = [
        nombre, celularFormatted, email,
        fecha, hora, servicio, empleado, nota, precio
      ];

      const sheet = new GoogleSheet(SHEET_ID, SHEET_CITAS, creds);
      if (!(await sheet.testConnection())) {
        throw new Error("No se pudo conectar a Google Sheets");
      }

      await sheet.appendData([datos]);
    } catch (e) {
      console.log("❌ Error guardando en sheets:", e.message);
    }

    // Mensaje mejorado basado en el tipo de error
    let mensaje = "✅ Tu cita fue reservada con éxito.\n";
    
    if (correoEnviado) {
      mensaje += "📧 Se te ha enviado un correo electrónico con los detalles de la cita.\n";
    } else {
      // Clasificar el tipo de error para mostrar mensaje específico
      if (errorCorreo) {
        if (errorCorreo.includes('Email inválido') || errorCorreo.includes('formato')) {
          mensaje += "❌ No se pudo enviar el correo: formato de email inválido.\n";
        } else if (errorCorreo.includes('credenciales') || errorCorreo.includes('EAUTH')) {
          mensaje += "❌ No se pudo enviar el correo: problema de configuración del servidor.\n";
        } else if (errorCorreo.includes('conexión') || errorCorreo.includes('ECONNECTION')) {
          mensaje += "❌ No se pudo enviar el correo: problema de conexión.\n";
        } else if (errorCorreo.includes('no existe') || errorCorreo.includes('553')) {
          mensaje += "❌ No se pudo enviar el correo: la dirección de email no existe.\n";
        } else {
          mensaje += `❌ No se pudo enviar el correo: ${errorCorreo}\n`;
        }
      } else {
        mensaje += "❌ No se pudo enviar el correo: error desconocido.\n";
      }
    }

    res.json({ 
      ok: true, 
      correo_enviado: correoEnviado, 
      mensaje,
      email_debug: {
        email_recibido: email,
        error_correo: errorCorreo
      }
    });
  } catch (error) {
    console.log("❌ ERROR RESERVA:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/resenas', async (req, res) => {
  try {
    const creds = getGoogleCredentialsFromEnv();
    const hoja = new GoogleSheetResenas(SHEET_ID, SHEET_RESEÑAS, creds);

    const conexionOk = await hoja.verificarConexion();
    if (!conexionOk) {
      return res.status(500).json({ error: 'No se pudo establecer conexión con Google Sheets' });
    }

    const resenas = await hoja.mostrarResenas();
    res.json(resenas);
  } catch (error) {
    console.error('❌ Error obteniendo reseñas:', error);
    res.status(500).json({ error: 'Error al obtener reseñas', details: error.message });
  }
});

app.post('/resenas', async (req, res) => {
  try {
    const { nombre, calificacion, comentario } = req.body;
    if (!nombre || !comentario) {
      return res.status(400).json({ error: 'Nombre y comentario son requeridos' });
    }

    if (!calificacion || calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
    }

    const creds = getGoogleCredentialsFromEnv();
    const hoja = new GoogleSheetResenas(SHEET_ID, SHEET_RESEÑAS, creds);
    await hoja.guardarResena(nombre, calificacion, comentario);

    res.json({ ok: true, mensaje: 'Reseña guardada exitosamente' });
  } catch (error) {
    console.error('❌ Error guardando reseña:', error);
    res.status(500).json({ error: 'Error al guardar reseña', details: error.message });
  }
});

app.get('/google-reviews', async (req, res) => {
  try {
    const reviews = await getGoogleReviews();
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/test-connection', async (req, res) => {
  try {
    const creds = getGoogleCredentialsFromEnv();
    const sheet = new GoogleSheet(SHEET_ID, SHEET_CITAS, creds);
    const conexionOk = await sheet.testConnection();

    res.json({
      success: conexionOk,
      message: conexionOk ? 'Conexión exitosa con Google Sheets' : 'Error de conexión',
      sheet_id: SHEET_ID,
      credentials_loaded: {
        client_email: !!process.env.GOOGLE_CLIENT_EMAIL,
        private_key: !!process.env.GOOGLE_PRIVATE_KEY,
        project_id: !!process.env.GOOGLE_PROJECT_ID
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log('🔗 Endpoints disponibles:');
  console.log('   GET  / - Estado de la API');
  console.log('   GET  /test-connection');
  console.log('   GET  /resenas');
  console.log('   POST /resenas');
  console.log('   GET  /horas-disponibles');
  console.log('   POST /reservar');
  console.log('   GET  /google-reviews');
});

module.exports = app;
