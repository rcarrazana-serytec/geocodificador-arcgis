const https = require('https');
const http = require('http');

exports.handler = async (event, context) => {
  // Permitir CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Responder a OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true })
    };
  }

  try {
    const { calle, numero, localidad, provincia } = JSON.parse(event.body);

    if (!localidad || !provincia) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Localidad y provincia son requeridas' })
      };
    }

    // Armar query para Nominatim
    const query = `${calle || ''} ${numero || ''}, ${localidad}, ${provincia}, Argentina`
      .trim()
      .replace(/\s+/g, ' ');

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;

    // Hacer request a Nominatim
    return new Promise((resolve, reject) => {
      https.get(url, {
        headers: {
          'User-Agent': 'GeocodificadorArcGIS/1.0'
        }
      }, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const results = JSON.parse(data);

            if (results && results.length > 0) {
              const result = results[0];
              resolve({
                statusCode: 200,
                headers,
                body: JSON.stringify({
                  success: true,
                  lat: result.lat,
                  lon: result.lon,
                  display_name: result.display_name
                })
              });
            } else {
              resolve({
                statusCode: 404,
                headers,
                body: JSON.stringify({
                  success: false,
                  error: 'No se encontró la ubicación'
                })
              });
            }
          } catch (e) {
            reject(e);
          }
        });
      }).on('error', (err) => {
        reject(err);
      });
    });

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Error en servidor',
        message: error.message
      })
    };
  }
};
