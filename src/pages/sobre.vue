<template>
  <q-page class="flex flex-center page">
  <div class="q-pa-md">
    <div class="q-pa-md">
    <q-card class="my-card">
      <q-parallax
        src="../assets/pizzabanner.jpg"
        :height="250"
      />

      <q-card-section>
        <div class="text-h6"> Bem-vindo à Pizzaria Veneza</div>
        <div class="text-subtitle2">O Sabor da Tradição em Cada Fatia!</div>
        <div class="text"> Em um cantinho aconchegante da cidade de Picos, a Pizzaria Veneza abre suas portas para transportar você a uma experiência gastronômica única.
          Com raízes profundas na tradição italiana, cada pedaço de nossa pizza é uma obra-prima preparada com paixão e os melhores ingredientes.</div>
      </q-card-section>
    </q-card>
  </div>

    <q-card class="my-card q-ma-auto" flat bordered>
    <q-card-section horizontal class="flex" style="min-width: 50%">
      <q-card-section >
        <div class="text-h6">🎊 Pizzaria Veneza:Uma História de Sabor! 🎊</div>
        <q-separator spaced inset vertical dark />
        <div class="text-h7">📍 R. São Sebastião, 799 - Canto da Várzea, Picos - PI, 64600-000 </div>
        <div class="text-h7">☎️ Telefone: (89) 99919-4045</div>
        <div class="text-h7">🌐 Saiba mais: [Site da Pizzaria]</div>
      </q-card-section>
      <q-card-section >
        <div class="text-h6">🎊 Pizzaria Veneza:Uma História de Sabor! 🎊</div>
        <q-separator spaced inset vertical dark />
        <div class="text-h7">📍 R. São Sebastião, 799 - Canto da Várzea, Picos - PI, 64600-000 </div>
        <div class="text-h7">☎️ Telefone: (89) 99919-4045</div>
        <div class="text-h7">🌐 Saiba mais: [Site da Pizzaria]</div>
      </q-card-section>
      <q-card-section >
        <div class="text-h6">🎊 Pizzaria Veneza:Uma História de Sabor! 🎊</div>
        <q-separator spaced inset vertical dark />
        <div class="text-h7">📍 R. São Sebastião, 799 - Canto da Várzea, Picos - PI, 64600-000 </div>
        <div class="text-h7">☎️ Telefone: (89) 99919-4045</div>
        <div class="text-h7">🌐 Saiba mais: [Site da Pizzaria]</div>
      </q-card-section>

    </q-card-section>
  </q-card>
  </div>
  </q-page>

</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'paginaSobre',
  setup () {
    return {
      slide: ref(1),
      autoplay: ref(true)
    }
  }
})
</script>

<style scoped>
.page {
  background-color: rgb(27, 3, 52)
}
.my-card {
  top: 20px;
}
.imgbanner {
  height: 200px;
  width: 50%;
  font-family: 'Courier New';
  font-weight: bold;
  top: 20px;
  border: 2px solid #FFA500;
  border-radius: 10px;
  color: #000000;
  margin-bottom: 20px;
  padding: 12px;

}
.card-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.image-content {
  position: relative;
  width: 50%;
  border-radius: 50%;
  padding-bottom: 50%;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  padding: 0;
  transition: opacity 0.3s ease;
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 5px;
  padding: 0%;
}
.card-img {
  width: 200%;
  height: 80%;
  object-fit: contain;
  object-position: center;
}

.card-content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.name {
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
}

.description {
  color: #777;
  margin: 0;
}

.social-links {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.social-links a {
  display: inline-block;
  margin-right: 10px;
}

.social-links img {
  width: 24px;
  height: 24px;
}

.row {
  margin-top: 20px;
}

.q-btn-toggle {
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.q-btn-toggle__content {
  padding: 5px;
}

.q-btn-toggle__option {
  min-width: 32px;
  padding: 5px;
}

.q-btn-toggle__label {
  font-size: 12px;
}/* Cor do botão */

</style>
