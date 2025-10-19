<template>
  <UFooter class="p-5 bg-gradient-to-br from-gray-900 via-gray-950 to-gray-900">
    <template #left>
      <p class="text-muted text-sm">Copyright Synch Finanças © {{ new Date().getFullYear() }}</p>
    </template>

    <template #right>
      <UButton
          icon="i-simple-icons-linkedin"
          color="neutral"
          variant="ghost"
          to="https://www.linkedin.com/in/andrewgpsilva"
          target="_blank"
          aria-label="LinkedIn"
      />
      <UButton
          icon="i-simple-icons-x"
          color="neutral"
          variant="ghost"
          to="https://x.com/AndrewGPS13"
          target="_blank"
          aria-label="X"
      />
      <UButton
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          to="https://github.com/AndrewGPFranco"
          target="_blank"
          aria-label="GitHub"
      />
    </template>
  </UFooter>
</template>