const { google } = require('googleapis');
const moment = require('moment-timezone');

class GoogleCalendar {
    constructor(credentials, calendarId) {
        this.credentials = credentials;
        this.calendarId = calendarId;
        this.service = this._createService();
    }

    _createService() {
        const auth = new google.auth.GoogleAuth({
            credentials: this.credentials,
            scopes: ['https://www.googleapis.com/auth/calendar']
        });

        return google.calendar({ version: 'v3', auth });
    }

    async getEvents(date = null) {
        try {
            let params = {
                calendarId: this.calendarId
            };

            if (date) {
                const startDate = moment.tz(`${date}T00:00:00`, 'Europe/Madrid');
                const endDate = moment.tz(`${date}T23:59:59`, 'Europe/Madrid');
                
                params.timeMin = startDate.toISOString();
                params.timeMax = endDate.toISOString();
            }

            const response = await this.service.events.list(params);
            return response.data.items || [];
        } catch (error) {
            console.error('Error obteniendo eventos:', error);
            throw error;
        }
    }

    async getEventByDate(startDate, endDate) {
        try {
            const response = await this.service.events.list({
                calendarId: this.calendarId,
                timeMin: startDate,
                timeMax: endDate
            });

            const events = response.data.items || [];
            return events.length > 0 ? events[0].id : null;
        } catch (error) {
            console.error('Error obteniendo evento por fecha:', error);
            throw error;
        }
    }

    async getStartTimes(date) {
        try {
            console.log(`📅 Obteniendo horas ocupadas para fecha: ${date}`);
            
            // Crear el rango de tiempo para el día específico
            const startOfDay = moment.tz(`${date}T00:00:00`, 'Europe/Madrid');
            const endOfDay = moment.tz(`${date}T23:59:59`, 'Europe/Madrid');
            
            console.log(`🕐 Rango de búsqueda: ${startOfDay.toISOString()} - ${endOfDay.toISOString()}`);

            const response = await this.service.events.list({
                calendarId: this.calendarId,
                timeMin: startOfDay.toISOString(),
                timeMax: endOfDay.toISOString(),
                singleEvents: true,
                orderBy: 'startTime'
            });

            const events = response.data.items || [];
            console.log(`📋 Eventos encontrados: ${events.length}`);
            
            const startTimes = [];

            events.forEach((event, index) => {
                console.log(`📝 Procesando evento ${index + 1}:`, {
                    summary: event.summary,
                    start: event.start,
                    end: event.end
                });

                if (event.start && event.start.dateTime) {
                    const startTime = moment(event.start.dateTime).tz('Europe/Madrid');
                    const hoursMinutes = startTime.format("HH:mm");
                    startTimes.push(hoursMinutes);
                    console.log(`⏰ Hora ocupada agregada: ${hoursMinutes}`);
                } else if (event.start && event.start.date) {
                    // Evento de día completo
                    console.log(`📅 Evento de día completo detectado: ${event.summary}`);
                }
            });

            console.log(`✅ Horas ocupadas finales: ${JSON.stringify(startTimes)}`);
            return startTimes;
            
        } catch (error) {
            console.error('❌ Error obteniendo horas de inicio:', error);
            console.error('🔍 Calendar ID:', this.calendarId);
            console.error('🔍 Fecha solicitada:', date);
            throw error;
        }
    }

    async createEvent(nameEvent, startTime, endTime, timezone, attendees = null, comment = null) {
        const event = {
            summary: nameEvent,
            start: {
                dateTime: startTime,
                timeZone: timezone
            },
            end: {
                dateTime: endTime,
                timeZone: timezone
            },
            description: comment || ""
        };

        if (attendees) {
            event.attendees = attendees.map(email => ({ email }));
        }

        try {
            const response = await this.service.events.insert({
                calendarId: this.calendarId,
                resource: event,
                sendUpdates: 'all'
            });

            return response.data;
        } catch (error) {
            console.error('Error creando evento:', error);
            throw new Error(`Error al crear evento: ${error.message}`);
        }
    }

    async updateEvent(eventId, summary = null, startTime = null, endTime = null) {
        try {
            // Obtener el evento existente
            const response = await this.service.events.get({
                calendarId: this.calendarId,
                eventId: eventId
            });

            const event = response.data;

            // Actualizar campos si se proporcionan
            if (summary) {
                event.summary = summary;
            }
            if (startTime) {
                event.start = {
                    dateTime: startTime.toISOString(),
                    timeZone: 'Europe/Madrid'
                };
            }
            if (endTime) {
                event.end = {
                    dateTime: endTime.toISOString(),
                    timeZone: 'Europe/Madrid'
                };
            }

            // Actualizar el evento
            const updateResponse = await this.service.events.update({
                calendarId: this.calendarId,
                eventId: eventId,
                resource: event
            });

            return updateResponse.data;
        } catch (error) {
            console.error('Error actualizando evento:', error);
            throw error;
        }
    }

    async deleteEvent(eventId) {
        try {
            await this.service.events.delete({
                calendarId: this.calendarId,
                eventId: eventId
            });
            return true;
        } catch (error) {
            console.error('Error eliminando evento:', error);
            throw error;
        }
    }
}

module.exports = GoogleCalendar;
