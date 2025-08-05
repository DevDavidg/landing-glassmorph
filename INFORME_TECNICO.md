# INFORME TÉCNICO - SITIO WEB BETALAUNCH

---

## **CARÁTULA**

**ALUMNO:** David Guillen  
**NÚMERO DE DOCUMENTO:** 44491531
**MATERIA:** Maquetado y Desarrollo Web  
**CARRERA:** Diseño y Programación Web  
**COMISIÓN:** DWN1AP
**AÑO:** 1er Cuatrimestre 2025  
**DOCENTE:** Carlos Ferrer  
**FECHA DE MESA DE FINAL:** 5/8/2025
**ESCUELA:** Da Vinci

---

## **DESCRIPCIÓN DEL SITIO WEB**

**BetaLaunch** es un sitio web moderno con diseño glassmorphism que presenta una plataforma ficticia para el lanzamiento de startups. El sitio está desarrollado como trabajo práctico para la materia de **Maquetado y Desarrollo Web** de la Escuela Da Vinci.

### **Tema del Sitio**

El sitio presenta **BetaLaunch**, una plataforma integral para validar, lanzar y escalar productos digitales con herramientas profesionales y métricas en tiempo real. El concepto se enfoca en ayudar a founders y emprendedores a lanzar sus startups de manera exitosa.

### **Objetivo del Sitio**

- Presentar una plataforma de lanzamiento de startups
- Capturar leads a través de un formulario de aplicación beta tester
- Mostrar características y beneficios del producto
- Proporcionar información sobre precios y planes
- Crear una experiencia de usuario moderna y atractiva

---

## **TECNOLOGÍAS UTILIZADAS**

### **Lenguajes de Programación**

- **HTML5** - Estructura semántica y válida
- **CSS3** - Estilos modernos con glassmorphism y responsive design
- **JavaScript (ES6+)** - Interactividad y funcionalidades dinámicas

### **Frameworks y Librerías**

- **Font Awesome 6.4.0** - Iconografía moderna

  - **URL de descarga:** https://fontawesome.com/download
  - **CDN utilizado:** https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css

- **Google Fonts (Inter)** - Tipografía profesional
  - **URL:** https://fonts.google.com/
  - **Font utilizada:** Inter (sans-serif)

### **Herramientas de Desarrollo**

- **Visual Studio Code** - Editor de código
  - **URL:** https://code.visualstudio.com/
- **Git** - Control de versiones
- **Chrome DevTools** - Testing responsive y debugging

---

## **SOPORTE DE NAVEGADORES**

### **Navegadores Testeados**

| **Navegador** | **Versión** | **Estado**    | **Observaciones**                                             |
| ------------- | ----------- | ------------- | ------------------------------------------------------------- |
| **Chrome**    | 120.0+      | **FUNCIONAL** | Renderizado perfecto, todas las funcionalidades operativas    |
| **Firefox**   | 121.0+      | **FUNCIONAL** | Compatibilidad completa, glassmorphism funciona correctamente |
| **Safari**    | 17.0+       | **FUNCIONAL** | Rendimiento óptimo en macOS                                   |
| **Edge**      | 120.0+      | **FUNCIONAL** | Compatibilidad total con Chromium                             |
| **Opera**     | 104.0+      | **FUNCIONAL** | Navegación fluida, efectos visuales correctos                 |

### **Funcionalidades Testeadas**

- Navegación entre páginas
- Menú hamburguesa responsive
- Formulario de contacto
- Efectos glassmorphism
- Animaciones CSS
- Responsive design
- Elementos multimedia (video y mapa)

---

## **RESOLUCIONES DE PANTALLA Y BREAKPOINTS**

### **Desktop (1280px - 1366px)**

**Breakpoint:** `@media (max-width: 1200px)`

**Cambios principales:**

- Layout de 2 columnas en hero section
- Navegación horizontal completa
- Grid de 3 columnas para características
- Cards de precios en fila
- Estadísticas en grid de 2 columnas

### **Tablet (768px - 1279px)**

**Breakpoint:** `@media (max-width: 768px)`

**Cambios principales:**

- Layout adaptativo con grid responsivo
- Navegación horizontal con scroll
- Grid de 2 columnas para características
- Cards de precios en 2 columnas
- Menú hamburguesa activado
- Navegación vertical desplegable
- Estadísticas en 1 columna

### **Mobile (320px - 480px)**

**Breakpoint:** `@media (max-width: 480px)`

**Cambios principales:**

- Layout de 1 columna para todas las secciones
- Tipografía optimizada para legibilidad móvil
- Botones más grandes para touch (mínimo 44px)
- Espaciado reducido para aprovechar pantalla
- Iframes con altura reducida (250px)
- Formulario optimizado para móviles
- Footer más compacto

### **Estrategia Responsive**

- **Mobile-first approach** con progresive enhancement
- **Flexbox y Grid** para layouts adaptativos
- **Unidades relativas** (rem, %, vw) para escalabilidad
- **Imágenes responsivas** con CSS
- **Touch-friendly** en dispositivos móviles

---

## **ESTRUCTURA DE ARCHIVOS**

```
landing-glassmorph/
├── index.html              # Página principal
├── features.html           # Características del producto
├── pricing.html            # Planes y precios
├── informacion.html        # Información adicional
├── contact.html            # Formulario de contacto
├── gracias.html            # Página de confirmación
├── css/
│   └── style.css          # Estilos principales (2460 líneas)
├── js/
│   └── script.js          # Funcionalidades JavaScript
└── INFORME_TECNICO.md     # Este informe
```

---

## **CARACTERÍSTICAS TÉCNICAS**

### **HTML Semántico**

- Uso correcto de `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Jerarquía de encabezados apropiada (h1, h2, h3, h4)
- Etiquetas semánticas: `<strong>`, `<em>`, `<abbr>`, `<cite>`
- Formularios con labels apropiados y validación HTML5

### **CSS Moderno**

- Variables CSS (Custom Properties)
- Flexbox y Grid para layouts
- Animaciones y transiciones CSS
- Efectos glassmorphism con backdrop-filter
- Media queries para responsive design
- Gradientes y sombras modernas

### **JavaScript Funcional**

- Menú hamburguesa interactivo
- Validación de formularios
- Animaciones de scroll
- Estados de carga y feedback
- Navegación suave

### **Accesibilidad**

- HTML semántico
- Contraste adecuado
- Navegación por teclado
- Labels apropiados en formularios
- Textos alternativos en imágenes

---

## **FORMULARIO WEB**

### **Campos Implementados**

- **Nombre** (text, required)
- **Apellido** (text, required)
- **Nombre de Usuario** (text, required)
- **Clave** (password, required, minlength="8")
- **Sexo** (radio buttons: Masculino, Femenino, Otro)
- **Subida de Archivo** (file, accept="image/_,video/_,.txt,.pdf,.doc,.docx")
- **Correo Electrónico** (email, required)
- **Selección Múltiple** (checkboxes: 4 opciones de intereses)
- **Mensaje** (textarea, required)

### **Validaciones**

- Campos requeridos con HTML5
- Formato de email válido
- Longitud mínima de contraseña
- Tipos de archivo permitidos
- JavaScript para validación adicional

### **Funcionalidad**

- Action a `gracias.html`
- Enctype multipart/form-data
- Mensaje de confirmación obligatorio

---

## **ELEMENTOS MULTIMEDIALES**

### **Video Embebido**

- **Ubicación:** `informacion.html`
- **Tipo:** Demo de plataforma
- **Tecnología:** iframe con video directo
- **Responsive:** Sí, se adapta a diferentes pantallas

### **Mapa Interactivo**

- **Ubicación:** `contact.html`
- **Tipo:** Google Maps
- **Funcionalidad:** Muestra ubicación de oficinas
- **Responsive:** Sí, altura adaptativa

---

## **OPTIMIZACIONES REALIZADAS**

### **Performance**

- CSS optimizado y minificado
- Imágenes optimizadas para web
- Carga lazy de iframes
- Transiciones suaves

### **SEO**

- Meta tags apropiados
- Títulos descriptivos
- Descripciones meta
- Estructura semántica

### **UX/UI**

- Diseño glassmorphism moderno
- Navegación intuitiva
- Feedback visual en interacciones
- Estados de hover y focus

---

## **DESAFÍOS Y SOLUCIONES**

### **Desafío 1: Glassmorphism en diferentes navegadores**

**Solución:** Uso de fallbacks y prefijos CSS para compatibilidad cross-browser.

### **Desafío 2: Responsive design en móviles pequeños**

**Solución:** Implementación de breakpoint específico para 480px con optimizaciones de touch.

### **Desafío 3: Formulario complejo con validaciones**

**Solución:** Combinación de validación HTML5 nativa y JavaScript personalizado.

---

## **CONCLUSIONES**

El sitio web **BetaLaunch** cumple con todos los requisitos establecidos en la pauta del examen final:

- **6 archivos HTML** con estructura semántica válida
- **CSS responsive** con breakpoints apropiados
- **Formulario completo** con todos los campos requeridos
- **Elementos multimedia** (video y mapa)
- **Navegación funcional** entre todas las páginas
- **Diseño moderno** con glassmorphism
- **Compatibilidad cross-browser** verificada
- **Código limpio** y bien documentado

El proyecto demuestra un dominio sólido de las tecnologías web enseñadas durante la cursada, con implementación de técnicas modernas y mejores prácticas de desarrollo web.

---

## **ANEXO: TEXTOS DEL SITIO WEB**

### **Página Principal (index.html)**

**Título:** Convierte tu idea en una startup exitosa con BetaLaunch

**Descripción principal:** BetaLaunch es la plataforma definitiva para validar, lanzar y escalar tu producto digital con herramientas profesionales y métricas en tiempo real. Únete a más de 10,000 founders que ya están revolucionando sus lanzamientos.

**Estadísticas:**

- 10,000+ Usuarios Beta
- 500+ Productos Lanzados
- 87% Tasa de Éxito

### **Página de Características (features.html)**

**Título:** Características de BetaLaunch

**Características principales:**

- **Validación de Producto:** Herramientas avanzadas para validar tu idea antes del lanzamiento
- **Análisis en Tiempo Real:** Métricas detalladas y dashboards interactivos
- **Integraciones:** Conecta con más de 50 herramientas populares
- **Comunidad:** Acceso a una red de founders y expertos

### **Página de Precios (pricing.html)**

**Título:** Planes y Precios - Beta Access

**Planes disponibles:**

- **Starter:** $29/mes - Ideal para proyectos pequeños
- **Pro:** $99/mes - Para startups en crecimiento
- **Enterprise:** $299/mes - Soluciones personalizadas

### **Página de Información (informacion.html)**

**Título:** Información y Noticias de BetaLaunch

**Noticias principales:**

- BetaLaunch alcanza 10,000 usuarios beta registrados
- Integración con principales plataformas de no-code
- Lanzamiento de nuevas funcionalidades de marketing automation

### **Página de Contacto (contact.html)**

**Título:** Aplicación para Beta Tester de BetaLaunch

**Beneficios del programa Beta:**

- Acceso Premium Gratuito (Valor: USD $199/mes durante 12 meses)
- Comunidad Exclusiva con +500 founders
- Mentorías Personalizadas con expertos
- Certificación PLM oficial
- Revenue Share Program

### **Página de Agradecimiento (gracias.html)**

**Título:** ¡Aplicación Enviada con Éxito!

**Mensaje principal:** Gracias por aplicar al programa Beta Tester de BetaLaunch. Tu solicitud ha sido recibida y será revisada por nuestro equipo.

---

**Versión:** 1.0  
**Autor:** David Guillen  
**Materia:** Maquetado y Desarrollo Web - Escuela Da Vinci
