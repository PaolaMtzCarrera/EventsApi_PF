import { envs } from "../../config/env";

export function generateMonoMapEmailTemplate(name: string, description: string, lat: number, lng: number, code:string): string {
    const mapImageURL = generateMapboxStaticImageURL(lat,lng);
    return `
   <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Detalles del Evento</title>
    <style>
        body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            background-color: #e1e8f0; 
            color: #2c3e50; 
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff; 
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #607d8b; 
            color: #ffffff; 
            padding: 20px;
            text-align: center;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .header h1 {
            margin: 0;
            font-size: 26px;
        }
        .header i {
            font-size: 28px;
            color: #ffffff; 
        }
        .content {
            padding: 20px;
            text-align: center; 
        }
        .content p {
            margin: 15px 0;
            font-size: 18px;
            line-height: 1.6;
        }
        .content p strong {
            color: #607d8b; 
        }
        .code-box {
            background-color: #f4f4f4; 
            border: 5px solid #607d8b; 
            padding: 10px;
            margin: 15px auto; 
            font-size: 18px; 
            font-family: 'Courier New', monospace;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            word-wrap: break-word;
            white-space: pre-wrap;
            max-width: 40%; 
            height: 90px;
            text-align: center; 
            color: #2c3e50;
        }
        .map-image {
            width: 100%;
            height: auto;
            border-radius: 10px;
            margin-top: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        .footer {
            background-color: #f5f5f5; 
            color: #7f8c8d; 
            padding: 15px;
            text-align: center;
            font-size: 14px;
        }
        .footer a {
            color: #607d8b; 
            text-decoration: none;
        }
        .footer a:hover {
            text-decoration: underline;
        }
    </style>
    <!-- Link para Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Detalles del Evento</h1>
            <i class="fas fa-calendar-alt"></i> 
        </div>
        <div class="content">
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Descripción:</strong> ${description}</p>
            <p><strong>Latitud:</strong> ${lat}</p>
            <p><strong>Longitud:</strong> ${lng}</p>
            <p><strong>Código:</strong></p>
            <div class="code-box">
                ${code}
            </div>
            <img src="${mapImageURL}" alt="Mapa del evento" class="map-image" />
        </div>
        <div class="footer">
            <p>Este correo fue generado automáticamente. Por favor, no responda.</p>
        </div>
    </div>
    </body>
    </html>
    `;
}

export const generateMapboxStaticImageURL = (lat:number, lng: number):string =>{
    const accessToken = envs.MAPBOX_ACCESS_TOKEN;
    const zoom = 13;
    const width = 800;
    const height = 500;
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-l-embassy+f74e4e(${lng},${lat})/${lng},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}