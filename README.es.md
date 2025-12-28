# AI Visibility Optimizer

Solución integrada de optimización de motores de búsqueda y motores de IA generativa basada en IA

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

> **Proyecto de código abierto**: Este es un proyecto de código abierto que cualquiera puede usar, modificar y distribuir libremente.

## Selección de idioma / Language Selection

- [한국어 (Korean)](README.ko.md) | [English](README.en.md) | [中文 (Chinese)](README.zh.md) | [Español (Spanish)](README.es.md)

## Resumen

AI Visibility Optimizer es una herramienta integral de optimización para servicios web y aplicaciones. Integra optimización SEO, AI SEO, GEO (Generative Engine Optimization) y AIO (All-In-One), y admite aprendizaje automático de IA y mejora técnica continua.

## Características principales

### 1. Optimización SEO (Search Engine Optimization)
- Análisis de optimización de motores de búsqueda
- Análisis de metaetiquetas y palabras clave
- Generación de Sitemap y Robots.txt
- Validación de datos estructurados
- Análisis de optimización móvil
- Análisis de rendimiento (Core Web Vitals)

### 2. Optimización AI SEO
- Investigación de palabras clave basada en IA
- Optimización automática de contenido
- Análisis de densidad de palabras clave y legibilidad
- Análisis de palabras clave de competidores
- Monitoreo de citas de IA
- Optimización de contenido multimodal

### 3. Optimización GEO (Generative Engine Optimization)
- Optimización de motores de búsqueda de IA generativa (ChatGPT, Claude, Perplexity, Gemini, etc.)
- Análisis de estructura de contenido amigable para IA
- Generación de esquemas FAQ, HowTo, Article
- Optimización de compatibilidad con múltiples motores de IA
- Mejora de citabilidad y credibilidad
- Generación de llms.txt y hoja de datos

### 4. Optimización integral AIO (All-In-One)
- Análisis integral de SEO, AI SEO, GEO
- Análisis de rendimiento, accesibilidad, seguridad
- Optimización de redes sociales
- Optimización automática y generación de informes
- Construcción de bucle de retroalimentación de IA
- Monitoreo de visibilidad de IA
- Optimización AEO (Answer Engine Optimization)

### 5. Sistema de inyección automática
- Aplicación automática de SEO/AIO/GEO/AI SEO a servicios web/aplicaciones durante el desarrollo
- Integración del proceso de compilación
- Aplicación de optimización en tiempo real
- Automatización basada en configuración

### 6. Integración Agent Lightning
- Integración de aprendizaje por refuerzo basada en Microsoft Agent Lightning
- Búsqueda y aprendizaje automáticos de contenido relacionado con SEO/AIO/GEO/AI SEO en línea
- Actualizaciones continuas y mejora técnica
- Mejora automática de algoritmos

### 7. Análisis de visibilidad de IA
- Análisis de visibilidad específico del motor de búsqueda de IA
- Seguimiento y monitoreo de citas
- Análisis de clasificación y exposición
- Automatización de mejora de rendimiento
- Análisis comparativo de múltiples motores de IA

## Instalación

### Instalación básica

```bash
# Clonar repositorio
git clone https://github.com/saewookkangboy/ai-visibility-optimizer.git
cd ai-visibility-optimizer

# Instalar dependencias
npm install

# Configuración
npm run setup
```

### Instalación global (opcional)

```bash
npm link
# o
npm install -g .
```

Después de la instalación, puede usar el comando `ai-visibility` en cualquier lugar.

## Uso

### Inicialización del proyecto

```bash
npm run init
# o
ai-visibility init
```

### Optimización SEO

```bash
# Análisis SEO
ai-visibility seo analyze https://example.com

# Generar Sitemap
ai-visibility seo sitemap -u https://example.com https://example.com/about

# Generar Robots.txt
ai-visibility seo robots
```

### Optimización AI SEO

```bash
# Investigación de palabras clave de IA
ai-visibility ai-seo keywords "desarrollo web"

# Optimización de contenido
ai-visibility ai-seo optimize "contenido" -k "palabra clave1" "palabra clave2"

# Análisis de competidores
ai-visibility ai-seo competitors example.com -c competitor1.com
```

### Optimización GEO (Generative Engine Optimization)

```bash
# Análisis GEO (optimización de motor de búsqueda de IA)
ai-visibility geo analyze https://example.com

# Generar esquema FAQ
ai-visibility geo faq -q "Pregunta1" "Pregunta2"

# Generar esquema HowTo
ai-visibility geo howto -n "Nombre de guía" -s "Paso1" "Paso2"

# Generar esquema Article
ai-visibility geo article -h "Título" -a "Autor" -u "https://example.com"

# Optimización de motor generativo
ai-visibility geo optimize https://example.com -e chatgpt claude perplexity
```

### Optimización integral AIO

```bash
# Análisis integral
ai-visibility aio analyze https://example.com

# Optimización automática
ai-visibility aio optimize https://example.com

# Generar informe
ai-visibility aio report -f markdown

# Monitoreo de visibilidad de IA
ai-visibility aio visibility https://example.com
```

### Sistema de inyección automática

```bash
# Habilitar inyección automática
ai-visibility auto-inject enable

# Configuración de integración de compilación
ai-visibility auto-inject setup --framework react
ai-visibility auto-inject setup --framework nextjs
ai-visibility auto-inject setup --framework vue

# Aplicación manual
ai-visibility auto-inject apply
```

### Entrenamiento Agent Lightning

```bash
# Iniciar entrenamiento
ai-visibility lightning train --episodes 100

# Habilitar aprendizaje en línea
ai-visibility lightning online --enable

# Verificar estado de entrenamiento
ai-visibility lightning status
```

### Análisis de visibilidad de IA

```bash
# Análisis de visibilidad de IA
ai-visibility visibility analyze https://example.com

# Seguimiento de citas
ai-visibility visibility track https://example.com

# Mejora de rendimiento
ai-visibility visibility optimize https://example.com
```

## Estructura del proyecto

```
ai-visibility-optimizer/
├── src/
│   ├── index.js                    # Punto de entrada principal
│   ├── modules/
│   │   ├── seo/                     # Módulo de optimización SEO
│   │   ├── ai-seo/                  # Módulo de optimización AI SEO
│   │   ├── geo/                     # Módulo de optimización GEO
│   │   ├── aio/                     # Módulo de optimización integral AIO
│   │   ├── auto-injector/           # Sistema de inyección automática
│   │   ├── agent-lightning/         # Integración Agent Lightning
│   │   └── ai-visibility/           # Análisis de visibilidad de IA
│   ├── utils/                       # Funciones de utilidad
│   └── config/                      # Archivos de configuración
├── docs/
│   ├── SKILLS.md                    # Documentación de Skills
│   ├── BACKGROUND.md                # Guía de Background
│   ├── ARCHITECTURE.md              # Documentación de arquitectura
│   └── USAGE.md                     # Guía de uso
├── config/                          # Archivos de configuración
├── scripts/                         # Scripts
├── tests/                           # Pruebas
├── bin/
│   └── cli.js                       # Punto de entrada CLI
├── .env.example                     # Ejemplo de variables de entorno
├── .gitignore                       # Archivo de ignorar Git
└── package.json                     # Configuración del proyecto
```

## Documentación

- [Documentación de Skills](docs/SKILLS.md) - Guía de Skills SEO/AIO/GEO/AI SEO
- [Guía de Background](docs/BACKGROUND.md) - Diseño de directrices y algoritmos
- [Documentación de arquitectura](docs/ARCHITECTURE.md) - Estructura y diseño del sistema
- [Guía de uso](docs/USAGE.md) - Instrucciones de uso detalladas

## Flujo de trabajo de desarrollo

### 1. Configuración inicial

```bash
# Inicializar proyecto
ai-visibility init

# Configurar sistema de inyección automática
ai-visibility auto-inject setup --framework nextjs
```

### 2. Optimización automática durante el desarrollo

```bash
# Optimización automática aplicada al ejecutar servidor de desarrollo
npm run dev  # Aplica automáticamente SEO/AIO/GEO/AI SEO
```

### 3. Análisis y optimización

```bash
# Análisis integral
ai-visibility aio analyze https://example.com

# Optimización automática
ai-visibility aio optimize https://example.com

# Verificar visibilidad de IA
ai-visibility visibility analyze https://example.com
```

### 4. Aprendizaje continuo

```bash
# Habilitar aprendizaje en línea de Agent Lightning
ai-visibility lightning online --enable

# Aprendizaje y actualizaciones periódicas
ai-visibility lightning train --schedule daily
```

## Contribuir

Si desea contribuir al proyecto, consulte la [Guía de contribución](CONTRIBUTING.md).

¡Se aceptan informes de errores, sugerencias de funciones y Pull Requests!

## Licencia

MIT License

Copyright (c) 2025 Park chunghyo

Este es un proyecto de código abierto que cualquiera puede usar, modificar y distribuir libremente.

Para más detalles, consulte el archivo [LICENSE](LICENSE).

## Recursos de referencia

### Recursos de integración principales

- [Agent Lightning](https://github.com/microsoft/agent-lightning) - Aprendizaje por refuerzo de IA
- [Schema.org](https://schema.org/) - Datos estructurados
- [Google Search Central](https://developers.google.com/search) - Guía SEO

### Herramientas relacionadas

- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Análisis de rendimiento web
- [PageSpeed Insights](https://pagespeed.web.dev/) - Análisis de velocidad de página
- [Web.dev](https://web.dev/) - Guía de desarrollo web

## Autor

**Park chunghyo**

- GitHub: [@saewookkangboy](https://github.com/saewookkangboy)
- El desarrollo de módulos y paquetes se realizó con Cursor AI

## Estrella

Si este proyecto fue útil, ¡dale una ⭐!

