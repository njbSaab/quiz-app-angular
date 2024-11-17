const { join } = require("path"); // Импорт функции join из модуля path

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "src/**/*.{html,ts}"), // Укажите пути к Angular файлам
  ],
  theme: {
    extend: {}, // Дополнительные настройки тем
  },
  plugins: [require("daisyui")], // Подключение DaisyUI
  daisyui: {
    themes: ["acid", "dracula"], // Укажите темы
  },
};
