const { google } = require('googleapis');

class GoogleSheet {
    constructor(sheetId, sheetName, credentials) {
        // Usar directamente el ID de la hoja en lugar del nombre del documento
        this.sheetId = sheetId;
        this.sheetName = sheetName;
        this.credentials = credentials;
        this.authClient = null;
        this.sheets = null;
    }

    async init() {
        if (!this.authClient) {
            try {
                const auth = new google.auth.GoogleAuth({
                    credentials: this.credentials,
                    scopes: ['https://www.googleapis.com/auth/spreadsheets']
                });
                this.authClient = await auth.getClient();
                console.log('✅ Google Sheets auth client inicializado');
            } catch (err) {
                console.error('❌ Error inicializando autenticación con Google:', err.message);
                throw err;
            }
        }

        if (!this.sheets) {
            this.sheets = google.sheets({ version: 'v4', auth: this.authClient });
            console.log('✅ Google Sheets service inicializado');
        }
    }

    async getData(range = 'A:Z') {
        await this.init();
        try {
            console.log(`📊 Obteniendo datos de ${this.sheetId}, hoja: ${this.sheetName}, rango: ${range}`);
            const res = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.sheetId,
                range: `${this.sheetName}!${range}`,
            });
            console.log(`✅ Datos obtenidos: ${res.data.values?.length || 0} filas`);
            return res.data.values || [];
        } catch (err) {
            console.error('❌ Error obteniendo datos de Google Sheets:', err.message);
            console.error('🔍 Sheet ID:', this.sheetId);
            console.error('🔍 Sheet Name:', this.sheetName);
            throw err;
        }
    }

    async writeData(range, values) {
        await this.init();
        try {
            console.log(`📝 Escribiendo datos en ${this.sheetId}, hoja: ${this.sheetName}, rango: ${range}`);
            console.log(`📄 Datos a escribir:`, values);
            
            const response = await this.sheets.spreadsheets.values.update({
                spreadsheetId: this.sheetId,
                range: `${this.sheetName}!${range}`,
                valueInputOption: 'RAW',
                requestBody: {
                    values: values
                },
            });
            
            console.log('✅ Datos escritos exitosamente');
            return response.data;
        } catch (err) {
            console.error('❌ Error escribiendo datos en Google Sheets:', err.message);
            console.error('🔍 Sheet ID:', this.sheetId);
            console.error('🔍 Sheet Name:', this.sheetName);
            console.error('🔍 Range:', range);
            throw err;
        }
    }

    async appendData(values) {
        await this.init();
        try {
            console.log(`📝 Agregando datos en ${this.sheetId}, hoja: ${this.sheetName}`);
            console.log(`📄 Datos a agregar:`, values);
            
            const response = await this.sheets.spreadsheets.values.append({
                spreadsheetId: this.sheetId,
                range: `${this.sheetName}!A:Z`,
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                requestBody: {
                    values: values
                },
            });
            
            console.log('✅ Datos agregados exitosamente');
            return response.data;
        } catch (err) {
            console.error('❌ Error agregando datos en Google Sheets:', err.message);
            console.error('🔍 Sheet ID:', this.sheetId);
            console.error('🔍 Sheet Name:', this.sheetName);
            throw err;
        }
    }

    async getLastRowRange() {
        try {
            const data = await this.getData();
            const lastRow = data.length + 1;
            const range = `A${lastRow}:I${lastRow}`; // Asumiendo que tienes 9 columnas (A-I)
            console.log(`📍 Última fila disponible: ${lastRow}, rango: ${range}`);
            return range;
        } catch (err) {
            console.error('❌ Error obteniendo última fila:', err.message);
            throw err;
        }
    }

    // Método para verificar la conexión
    async testConnection() {
        try {
            await this.init();
            const response = await this.sheets.spreadsheets.get({
                spreadsheetId: this.sheetId
            });
            console.log(`✅ Conexión exitosa con: ${response.data.properties.title}`);
            return true;
        } catch (error) {
            console.error('❌ Error verificando conexión:', error.message);
            return false;
        }
    }
}

module.exports = GoogleSheet;
