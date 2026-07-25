# 🌲 git-arbor - version 0.6

Transforma la actividad y el ecosistema de tus repositorios de GitHub en un bosque dinámico renderizado en tiempo real dentro de tu perfil.

---

## ¿Qué es Git-Arbor?
Git-Arbor es una herramienta mágica que convierte tu actividad de GitHub en un bosque vivo y lleno de color dentro de tu perfil.

A partir de los lenguajes de programación que usas en tus proyectos, el sistema dibuja y hace crecer un paisaje único en formato SVG (bosque.svg). Lo mejor de todo es que trabaja solito: gracias a GitHub Actions, tu bosque se actualiza automáticamente cada 12 horas o cada vez que subes código nuevo. 

¡Tu perfil siempre estará floreciendo!

---

## Especies
El motor clasifica automáticamente tus tecnologías según su geometría en la terminal:
* **🌲 Pino:** Backend, lógica de servidores y entornos (Node.js, Python, SQL).
* **🌳 Frondoso:** Desarrollo web e interfaces de usuario (JavaScript, HTML, CSS).
* **🌴 Palmera:** Frameworks modernos y tipados (TypeScript, Vue).
* **🌿 Arbusto:** Archivos de configuración y documentación (JSON, Markdown).
* **🏔️ Secuoya:** Procesamiento masivo e infraestructura.

---

## Guía de Instalación Rápida (Para tu Perfil)

Puedes instalar este sistema en tu propio repositorio de perfil (`tu-usuario/tu-usuario`) siguiendo estos pasos:

### 1. Clonar el motor y dependencias

git clone [https://github.com/tu-usuario/git-arbor.git](https://github.com/tu-usuario/git-arbor.git)
cd git-arbor
npm install

---

### 2. Mover la estructura a tu repositorio de perfil

Copia los siguientes archivos y carpetas directamente en la raíz de tu repositorio de perfil principal (el que tiene tu mismo nombre de usuario):

* La carpeta src/ (con toda la lógica y plantillas de árboles).

- El archivo package.json.

* El archivo de flujo de automatización .github/workflows/git-arbor.yml.

---

## 3. Configurar Permisos de Escritura en GitHub

Para que el bot de automatización pueda actualizar el archivo bosque.svg de forma autónoma:

- Entra a tu repositorio de perfil en GitHub.

- Ve a Settings -> Actions -> General.

* Baja hasta Workflow permissions.

* Selecciona Read and write permissions y dale a Save.

---

## 4. Añadirlo a tu README.md principal

Inserta la siguiente etiqueta HTML en el perfil donde quieras que florezca tu bosque:
HTML

<p align="center">
  <img src="./bosque.svg" alt="Mi Ecosistema Git Arbor" width="100%">
</p>
