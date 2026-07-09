const { google } = require('googleapis');

class GoogleSheetResenas {
    constructor(sheetId, sheetName, credentials) {
        // Usar directamente el ID de la hoja en lugar del nombre del documento
        this.sheetId = sheetId;
        this.sheetName = sheetName;
        this.credentials = credentials;

        this.auth = new google.auth.GoogleAuth({
            credentials: this.credentials,
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        this.authClient = null;
    }

    async _getAuthClient() {
        if (!this.authClient) {
            console.log('🔐 Inicializando cliente de autenticación...');
            this.authClient = await this.auth.getClient();
            console.log('✅ Cliente de autenticación inicializado');
        }
        return this.authClient;
    }

    async guardarResena(nombre, calificacion, comentario) {
        const calificacionNum = parseInt(calificacion);
        if (isNaN(calificacionNum) || calificacionNum < 1 || calificacionNum > 5) {
            throw new Error('La calificación debe estar entre 1 y 5.');
        }

        console.log(`💾 Guardando reseña: ${nombre}, ${calificacionNum}, ${comentario}`);
        console.log(`📊 Sheet ID: ${this.sheetId}, Sheet Name: ${this.sheetName}`);

        const authClient = await this._getAuthClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: this.sheetId,
            range: `${this.sheetName}!A:C`,
            valueInputOption: 'RAW',
            resource: {
                values: [[nombre, calificacionNum, comentario]],
            },
        });

        console.log('✅ Reseña guardada exitosamente');
        return response.data;
    }

    async obtenerResenas() {
        console.log(`📖 Obteniendo reseñas de Sheet ID: ${this.sheetId}, Sheet Name: ${this.sheetName}`);
        
        const authClient = await this._getAuthClient();
        const sheets = google.sheets({ version: 'v4', auth: authClient });

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: this.sheetId,
            range: `${this.sheetName}!A:C`,
        });

        const values = response.data.values || [];
        console.log(`📊 Reseñas obtenidas: ${values.length} filas`);
        return values.slice(1); // Excluir headers
    }

    async mostrarResenas() {
        const resenas = await this.obtenerResenas();

        return resenas.map((resena) => {
            const nombre = resena[0] || '';
            const calificacion = parseInt(resena[1]) || 1;
            const estrellas = '⭐'.repeat(Math.min(5, Math.max(1, calificacion)));
            const comentario = resena[2] || '';
            return [nombre, estrellas, comentario];
        });
    }

    async verificarConexion() {
        try {
            console.log(`🔍 Verificando conexión con Sheet ID: ${this.sheetId}`);
            
            const authClient = await this._getAuthClient();
            const sheets = google.sheets({ version: 'v4', auth: authClient });

            const response = await sheets.spreadsheets.get({ 
                spreadsheetId: this.sheetId 
            });
            
            console.log(`✅ Conexión exitosa con: ${response.data.properties.title}`);
            return true;
        } catch (error) {
            console.error('❌ Error verificando conexión:', error.message);
            console.error('🔍 Sheet ID utilizado:', this.sheetId);
            return false;
        }
    }
}

module.exports = GoogleSheetResenas;
