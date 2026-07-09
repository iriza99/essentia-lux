const twilio = require('twilio');

async function sendSMS(celular, mensaje) {
    try {
        // Leer las credenciales de Twilio desde variables de entorno
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioNumber = process.env.TWILIO_PHONE_NUMBER;

        console.log('🔍 Verificando credenciales de Twilio...');
        console.log(`📱 Account SID: ${accountSid ? accountSid.substring(0, 10) + '...' : 'NO ENCONTRADO'}`);
        console.log(`🔐 Auth Token: ${authToken ? authToken.substring(0, 10) + '...' : 'NO ENCONTRADO'}`);
        console.log(`📞 Phone Number: ${twilioNumber || 'NO ENCONTRADO'}`);

        if (!accountSid || !authToken || !twilioNumber) {
            throw new Error('Faltan variables de entorno de Twilio. Verifica TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN y TWILIO_PHONE_NUMBER');
        }

        // Validar formato de Account SID (debe empezar con 'AC')
        if (!accountSid.startsWith('AC')) {
            throw new Error('Account SID inválido. Debe empezar con "AC"');
        }

        // Validar que el número de teléfono incluya el código de país
        if (!celular.startsWith('+')) {
            throw new Error('El número de celular debe incluir el código de país (ej: +34...)');
        }

        console.log(`📲 Enviando SMS a: ${celular}`);
        console.log(`💬 Mensaje: ${mensaje.substring(0, 50)}...`);

        const client = twilio(accountSid, authToken);

        const message = await client.messages.create({
            body: mensaje,
            from: twilioNumber,
            to: celular
        });

        console.log('✅ SMS enviado exitosamente:', message.sid);
        return message.sid;

    } catch (error) {
        console.error('❌ Error completo de Twilio:', error);
        
        if (error.code) {
            console.error(`🔍 Código de error de Twilio: ${error.code}`);
            console.error(`📝 Mensaje de error: ${error.message}`);
            
            // Errores específicos de Twilio
            switch (error.code) {
                case 20003:
                    console.error('🚫 Error 20003: Credenciales incorrectas (Account SID o Auth Token inválidos)');
                    break;
                case 21211:
                    console.error('🚫 Error 21211: Número de teléfono inválido');
                    break;
                case 21408:
                    console.error('🚫 Error 21408: Permisos insuficientes para enviar SMS');
                    break;
                case 21614:
                    console.error('🚫 Error 21614: Número no válido para SMS');
                    break;
                default:
                    console.error(`🚫 Error de Twilio no manejado: ${error.code}`);
            }
        } else {
            console.error('❌ Error de configuración de Twilio:', error.message);
        }
        return null;
    }
}

// Función para verificar credenciales de Twilio
async function verifyTwilioCredentials() {
    try {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;

        if (!accountSid || !authToken) {
            return { valid: false, error: 'Credenciales no encontradas' };
        }

        const client = twilio(accountSid, authToken);
        
        // Intentar obtener información de la cuenta para verificar credenciales
        const account = await client.api.accounts(accountSid).fetch();
        
        return { 
            valid: true, 
            accountStatus: account.status,
            accountSid: account.sid 
        };
    } catch (error) {
        return { 
            valid: false, 
            error: error.message,
            code: error.code 
        };
    }
}

module.exports = { sendSMS, verifyTwilioCredentials };
