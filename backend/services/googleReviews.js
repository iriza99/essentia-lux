const axios = require('axios');

async function getGoogleReviews() {
    try {
        const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
        const PLACE_ID = "ChIJQ2CuwLFLSQ0RLG0VZab0Fzc";

        if (!API_KEY) {
            throw new Error('Google Places API Key no configurada');
        }

        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&key=${API_KEY}&language=es`;

        const response = await axios.get(url);
        const data = response.data;

        if (data.result && data.result.reviews) {
            return data.result.reviews;
        } else {
            return { message: "No hay reseñas disponibles de Google Maps." };
        }

    } catch (error) {
        console.error('Error obteniendo reseñas de Google:', error.message);
        throw error;
    }
}

module.exports = { getGoogleReviews };
