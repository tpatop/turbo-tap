console.log("Random Clicker запущен!");

// Функция для генерации случайных задержек
function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Функция для клика в случайную точку элемента
async function clickRandomPoint(selector) {
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`Элемент с селектором '${selector}' не найден.`);
    return;
  }

  const rect = element.getBoundingClientRect(); // Получаем размеры элемента
  const x = Math.random() * rect.width; // Случайная координата X внутри элемента
  const y = Math.random() * rect.height; // Случайная координата Y внутри элемента

  const clickEvent = new MouseEvent("click", {
    clientX: rect.x + x,
    clientY: rect.y + y,
    bubbles: true,
    cancelable: true
  });

  element.dispatchEvent(clickEvent); // Имитируем клик
  console.log(`Клик выполнен по координатам (${rect.x + x}, ${rect.y + y}) внутри элемента '${selector}'`);
}

// Запуск кликов с интервалом
(async () => {
  const targetSelector =
    "body > div.grid.h-full.min-h-full.grid-cols-1.grid-rows-1.bg-bg.*\\:col-span-1.*\\:col-start-1.*\\:row-span-1.*\\:row-start-1.overflow-hidden > div.relative.flex.sm\\:h-full.overflow-auto.w-full.flex-col > main > div.flex.flex-col.h-full.flex-wrap.gap-10 > div.flex-1.min-w-\\[320px\\].sm\\:min-w-\\[640px\\].w-full.lg\\:w-auto.overflow-hidden > div > div.relative.w-full.lg\\:max-w-\\[800px\\].\\32 xl\\:max-w-\\[1000px\\].space-y-2.rounded-lg > div.absolute.inset-0.bottom-20.flex";

  let lastBreakTime = Date.now();

  for (let i = 0; i < 240; i++) {
    await clickRandomPoint(targetSelector); // Нажимаем в случайную точку внутри элемента
    const delay = randomDelay(300, 2500); // Случайная задержка между кликами
    console.log(`Ожидание ${delay} мс перед следующим кликом`);
    await new Promise(r => setTimeout(r, delay));

    // Каждые 10-15 минут делаем перерыв на 2-5 минут
    if (Date.now() - lastBreakTime > randomDelay(600000, 900000)) {
      const breakDuration = randomDelay(120000, 300000); // Перерыв 2-5 минут
      console.log(`Перерыв на ${breakDuration / 1000} секунд`);
      await new Promise(r => setTimeout(r, breakDuration));
      lastBreakTime = Date.now();
    }
  }
})();
