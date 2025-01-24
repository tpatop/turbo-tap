console.log("Random Clicker с человеческим поведением!");

function randomDelay(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Функция для плавного перемещения мыши
async function moveMouseSmoothly(startX, startY, endX, endY, steps, duration) {
  const stepX = (endX - startX) / steps;
  const stepY = (endY - startY) / steps;
  const stepDuration = duration / steps;

  for (let i = 0; i <= steps; i++) {
    const currentX = startX + stepX * i;
    const currentY = startY + stepY * i;
    window.dispatchEvent(
      new MouseEvent("mousemove", {
        clientX: currentX,
        clientY: currentY,
        bubbles: true,
        cancelable: true,
      })
    );
    await new Promise((resolve) => setTimeout(resolve, stepDuration));
  }
}

// Функция для случайных движений мыши перед кликом
async function randomMouseMovement(rect) {
  const randomX = Math.random() * rect.width;
  const randomY = Math.random() * rect.height;
  await moveMouseSmoothly(rect.left, rect.top, rect.left + randomX, rect.top + randomY, 15, randomDelay(100, 300));
  console.log(`Случайное движение мыши на координаты (${rect.left + randomX}, ${rect.top + randomY})`);
}

// Функция для клика с задержкой
async function clickWithDelay(selector) {
  const canvas = document.querySelector(selector);
  if (!canvas) {
    console.error(`Элемент с селектором '${selector}' не найден.`);
    return;
  }

  // Получаем размеры canvas
  const rect = canvas.getBoundingClientRect();
  const randomX = Math.random() * rect.width;
  const randomY = Math.random() * rect.height;

  console.log(`Сначала перемещаем мышь к (${rect.left + randomX}, ${rect.top + randomY})`);

  // Случайное движение мыши
  await randomMouseMovement(rect);

  // Задержка перед кликом (имитация размышлений)
  const thinkDelay = randomDelay(100, 500);
  console.log(`Пауза перед кликом: ${thinkDelay} мс`);
  await new Promise(resolve => setTimeout(resolve, thinkDelay));

  // Клик
  const clickEvent = new MouseEvent("click", {
    clientX: rect.left + randomX,
    clientY: rect.top + randomY,
    bubbles: true,
    cancelable: true,
  });
  canvas.dispatchEvent(clickEvent);
  console.log(`Клик по (${rect.left + randomX}, ${rect.top + randomY})`);
}

// Бесконечные клики с паузами
(async () => {
  const canvasSelector = "canvas[data-sentry-element='Stage']";
  const sessionStartTime = Date.now();
  let lastBreakTime = Date.now();
  const maxWorkTime = randomDelay(8 * 60 * 60 * 1000, 10 * 60 * 60 * 1000); // Максимальное время работы (8-10 часов)
  const sleepTime = randomDelay(14 * 60 * 60 * 1000, 16 * 60 * 60 * 1000); // Время на сон (14-16 часов)

  while (true) {
    const timeSpent = Date.now() - sessionStartTime;
    
    if (timeSpent >= maxWorkTime) {
      // Если рабочее время закончено, "засыпаем"
      const remainingSleepTime = sleepTime - (timeSpent - maxWorkTime);
      console.log(`Рабочее время завершено. Спим ${remainingSleepTime / 1000} секунд.`);
      await new Promise(resolve => setTimeout(resolve, remainingSleepTime));
      // После сна начинается новый рабочий цикл
      sessionStartTime = Date.now();
    }

    await clickWithDelay(canvasSelector); // Клик с задержкой и случайным движением
    const delay = randomDelay(300, 2000); // Задержка между кликами
    console.log(`Ожидание ${delay} мс перед следующим кликом`);
    await new Promise(resolve => setTimeout(resolve, delay));

    // Пауза каждые 10-15 минут
    const timeSinceLastBreak = Date.now() - lastBreakTime;
    if (timeSinceLastBreak > randomDelay(10 * 60 * 1000, 15 * 60 * 1000)) {
      const breakDuration = randomDelay(1 * 60 * 1000, 2 * 60 * 1000); // Перерыв на 2-5 минут
      console.log(`Перерыв на ${breakDuration / 1000} секунд.`);
      await new Promise(resolve => setTimeout(resolve, breakDuration));
      lastBreakTime = Date.now(); // Обновление времени последнего сна
    }
  }
})();
