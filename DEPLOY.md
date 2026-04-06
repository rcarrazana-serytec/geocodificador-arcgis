# 🚀 Geocodificador Híbrido - Guía de Despliegue en Netlify

## ¿Qué es esto?

Un portal web que geocodifica direcciones de servicios en Salta y Jujuy usando:
- **Modo Rápido**: Base de datos local (instantáneo)
- **Modo Preciso**: API Nominatim (dirección exacta)

## Paso 1: Preparar los archivos

```bash
# Los archivos están listos. Estructura:
proyecto/
├── netlify.toml
├── netlify/functions/
│   └── geocodificar.js
└── public/
    └── index.html
```

## Paso 2: Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Crea un repositorio llamado `geocodificador-arcgis`
3. Clona localmente y copia los archivos

```bash
git clone https://github.com/TU_USUARIO/geocodificador-arcgis.git
cd geocodificador-arcgis

# Copia los archivos:
# - netlify.toml
# - netlify/functions/geocodificar.js
# - public/index.html

git add .
git commit -m "Inicial: portal geocodificador"
git push origin main
```

## Paso 3: Conectar Netlify (2 minutos)

1. Ve a https://netlify.com y entra con GitHub
2. Click en "New site from Git"
3. Selecciona tu repositorio `geocodificador-arcgis`
4. Netlify auto-detectará la configuración
5. **Deploy** ✓

¡Listo! Tu portal estará en:
`https://tu-proyecto.netlify.app`

## Paso 4: Usar el portal

### Modo Rápido (Local)
- Carga tu .txt
- Selecciona "Rápido"
- Procesamiento instantáneo
- Descarga CSV

### Modo Preciso (API)
- Carga tu .txt con <50 registros
- Selecciona "Preciso"
- Geocodifica por dirección exacta
- Descarga CSV

## Funcionalidades

✅ Carga de archivos .txt
✅ Vista previa de datos
✅ Geocodificación híbrida (local + API)
✅ Descarga CSV para ArcGIS
✅ Perfiles guardados
✅ Estadísticas en tiempo real

## Variables de entorno (opcional)

Si necesitas limitar uso de API:

En Netlify Dashboard:
- Settings → Environment
- Agregar variables si es necesario (no requiere para Nominatim)

## Troubleshooting

**El portal no carga:**
- Verifica que los archivos estén en las carpetas correctas
- Revisa Deploy logs en Netlify

**API Nominatim lenta:**
- Es normal (1 geocodificación por segundo)
- Usa Modo Rápido para muchos registros

**Archivos no se suben correctamente:**
- Asegúrate que el archivo sea .txt con TAB como separador

## Soporte

Si hay problemas, puedo ayudarte a:
- Ajustar la BD local
- Optimizar tiempos
- Cambiar proveedores de geocodificación
- Agregar funcionalidades

¡Disfruta! 🗺️
