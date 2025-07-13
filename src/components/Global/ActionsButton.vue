<template>
  <Transition name="fade">
    <button
      v-if="!isHome"
      class="button-home"
      @click="goHome"
      :class="{ 'button-home--hidden': isHome }"
    >
      <svg class="home-icon" viewBox="0 0 24 24" stroke="currentColor">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
      <span class="home-text">HOME</span>
    </button>
  </Transition>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const isHome = computed(() => route.name === 'home')

const goHome = () => {
  router.push({ name: 'home' })
}
</script>

<style scoped lang="scss">
.button-home {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;

  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.05em;

  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
    background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 10px rgba(102, 126, 234, 0.4);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.3);
  }
}

.home-icon {
  width: 1.2rem;
  height: 1.2rem;
  stroke-width: 2;
  flex-shrink: 0;
}

.home-text {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.9);
}

@media (max-width: 768px) {
  .button-home {
    bottom: 1rem;
    right: 1rem;
    padding: 0.6rem 1.2rem;
    font-size: 0.8rem;
  }

  .home-icon {
    width: 1rem;
    height: 1rem;
  }
}

@media (prefers-color-scheme: dark) {
  .button-home {
    background: linear-gradient(135deg, #1f2937 0%, #374151 100%);
    box-shadow: 0 4px 15px rgba(31, 41, 55, 0.4);

    &:hover {
      background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
      box-shadow: 0 8px 25px rgba(31, 41, 55, 0.6);
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }
  }
}
</style>
