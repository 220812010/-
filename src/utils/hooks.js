
// src/utils/hooks.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  const updateMouse = (event) => {
    x.value = event.pageX;
    y.value = event.pageY;
  };

  onMounted(() => {
    window.addEventListener('mousemove', updateMouse);
  });

  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMouse);
  });

  return { x, y };
}
