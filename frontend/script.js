document.addEventListener('DOMContentLoaded', () => {
  let time = 0;
  let interval = null;
  let isRunning = false;

  const timerDisplay = document.getElementById('timer');
  const saveContainer = document.getElementById('save-container');
  const timerList = document.getElementById('timer-list');
  const labelInput = document.getElementById('label');
  const themePicker = document.getElementById('theme-picker');

  document.getElementById('start').addEventListener('click', () => {
    if (!isRunning) {
      interval = setInterval(() => {
        time++;
        updateDisplay();
      }, 1000);
      isRunning = true;
    }
  });

  document.getElementById('pause').addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;
  });

  document.getElementById('reset').addEventListener('click', () => {
    clearInterval(interval);
    isRunning = false;
    if (time > 0) {
      saveContainer.classList.remove('hidden');
    }
  });

  document.getElementById('save').addEventListener('click', () => {
    const label = labelInput.value.trim();
    if (label) {
      const timers = JSON.parse(localStorage.getItem('timers') || '[]');
      timers.push({ label, duration: time });
      localStorage.setItem('timers', JSON.stringify(timers));
      renderSavedTimers();
      labelInput.value = '';
      saveContainer.classList.add('hidden');
      time = 0;
      updateDisplay();
    }
  });

  document.getElementById('discard').addEventListener('click', () => {
    labelInput.value = '';
    saveContainer.classList.add('hidden');
    time = 0;
    updateDisplay();
  });

  document.getElementById('toggle-theme').addEventListener('click', () => {
    themePicker.classList.toggle('hidden');
  });

  document.querySelectorAll('.color-circle').forEach(circle => {
    circle.addEventListener('click', () => {
      const theme = circle.dataset.theme;
      document.body.className = theme;
      themePicker.classList.add('hidden');
    });
  });

  function updateDisplay() {
    const mins = String(Math.floor(time / 60)).padStart(2, '0');
    const secs = String(time % 60).padStart(2, '0');
    timerDisplay.textContent = `${mins}:${secs}`;
  }

  function renderSavedTimers() {
    timerList.innerHTML = '';
    const timers = JSON.parse(localStorage.getItem('timers') || '[]');
    timers.forEach((t, i) => {
      const li = document.createElement('li');
      li.textContent = `${t.label} - ${formatTime(t.duration)}`;
      const del = document.createElement('button');
      del.textContent = '🗑️';
      del.addEventListener('click', () => {
        timers.splice(i, 1);
        localStorage.setItem('timers', JSON.stringify(timers));
        renderSavedTimers();
      });
      li.appendChild(del);
      timerList.appendChild(li);
    });
  }

  function formatTime(t) {
    const mins = String(Math.floor(t / 60)).padStart(2, '0');
    const secs = String(t % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  }

  renderSavedTimers();
  updateDisplay();
});
