<template>
  <div class="card-wrapper">
    <div class="card">
      <div class="image-content">
        <div class="card-image">
          <q-avatar style="width: 100%; height: 100%;">
            <img :src="developer.image" alt="" class="card-img" />
          </q-avatar>
        </div>
      </div>
      <div class="card-content">
        <h2 class="name">{{ developer.name }}</h2>
        <p class="description">{{ developer.description }}</p>
        <div class="social-links">
          <a :href="developer.linkedin" target="_blank" rel="noopener noreferrer">
            <img src="../assets/linkedin.png" alt="Linkedin" />
          </a>
          <a :href="developer.github" target="_blank" rel="noopener noreferrer">
            <img src="../assets/github_PNG4.png" alt="GitHub" />
          </a>
          <a :href="'mailto:' + developer.email" target="_blank" rel="noopener noreferrer">
            <img src="../assets/gmail.png" alt="Gmail" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    developer: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
/* Seus estilos específicos para o card do desenvolvedor */
</style>
