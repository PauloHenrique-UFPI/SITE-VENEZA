<template>
  <q-page class="page">
    <div class="carousel-container " style="margin-bottom: 30px;">
      <q-carousel
      v-model="slide"
      swipeable
      animated
      padding
      arrows
      navigation
      :autoplay="autoplay"
      infinite
      navigation-icon="radio_button_unchecked"
      class="bg-orange text-white rounded-borders"
      style="height: 400px; top: 20px;"
    >
      <q-carousel-slide :name="1" class="text-center">
        <q-scroll-area class="fit">
          <div class="text-h6"> 🍅 Ingredientes Frescos e Selecionados 🌽</div>

          <div class="q-mt-md">
            Acreditamos que a qualidade dos ingredientes é crucial para a excelência de uma boa pizza.
            Na Pizzaria Veneza, utilizamos apenas os melhores tomates, queijos frescos, ervas aromáticas
            e massas feitas artesanalmente. Cada mordida é uma explosão de sabores que captura a essência
            da tradição italiana.
          </div>
          <div class="col-4">
            <q-img
              src="../assets/frescos.jpg"
              :ratio="4/3"
              class="imgbanner"
            />
          </div>
        </q-scroll-area>
      </q-carousel-slide>

      <q-carousel-slide :name="2" class="text-center">
        <q-scroll-area class="fit">
          <div class="text-h6">🎉 Ambiente Acolhedor e Familiar 🎉</div>

          <div class="q-mt-md">
            Ao entrar na Pizzaria Veneza, você será recebido por um ambiente acolhedor,
            perfeito para encontros com amigos, celebrações em família ou simplesmente
            para desfrutar de uma refeição deliciosa em boa companhia. Nossa equipe
            dedicada está pronta para proporcionar a você uma experiência memorável,
            do primeiro ao último pedaço.
          </div>
          <div class="col-4">
            <q-img
              src="../assets/ambiente.jpg"
              :ratio="4/3"
              class="imgbanner"
            />
          </div>
        </q-scroll-area>
      </q-carousel-slide>

      <q-carousel-slide :name="3" class="text-center">
        <q-scroll-area class="fit">
          <div class="text-h6"> 🚀 Entregamos Sabor na Sua Porta 🏍️</div>

          <div class="q-mt-md">
            Se preferir a comodidade de saborear nossas pizzas no conforto de casa,
            oferecemos entregas rápidas e eficientes. Experimente a conveniência
            sem abrir mão da qualidade, e permita que a Pizzaria Veneza leve até
            você a magia de uma autêntica pizza italiana.
          </div>
          <div class="col-4">
            <q-img
              src="../assets/entrega.jpg"
              :ratio="4/3"
              class="imgbanner"
            />
          </div>
        </q-scroll-area>
      </q-carousel-slide>

      <q-carousel-slide :name="4" class="text-center">
        <q-scroll-area class="fit">
          <div class="text-h6">🎊 Faça Parte Dessa Experiência Deliciosa 🎊</div>

          <div class="q-mt-md">
            Venha nos visitar e descubra por que a Pizzaria Veneza é mais do que uma
            simples pizzaria – é um destino onde a tradição, o sabor e a hospitalidade
             se encontram. Estamos ansiosos para compartilhar momentos especiais e criar
              memórias deliciosas ao seu redor.
          </div>
          <div class="col-4">
            <q-img
              src="../assets/venha.jpg"
              :ratio="4/3"
              class="imgbanner"
            />
          </div>
        </q-scroll-area>
      </q-carousel-slide>
    </q-carousel>
    </div>

    <div class="novo-comp">

      <div class="card-wrapper2"
      v-for="(post, index) in pizzaSemana"
      :key="index"
      >
        <q-card class="my-prod" flat bordered>
          <q-img :src="post.img" :ratio="4/3" />

          <q-card-section>
            <q-btn
              fab
              color="green"
              icon="attach_money"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                {{ post.sabor }}
              </div>

            </div>

            <q-rating v-model="stars" :max="5" size="32px" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
              🍽️・Ingredientes
            </div>
            <div class="text-caption text-grey">
              {{ post.ingredientes }}
            </div>
          </q-card-section>

          <q-separator />
      </q-card>

      </div>
    </div>

  </q-page>
</template>
<script>
import { defineComponent, ref, onMounted } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'paginaHome',
  setup () {
    const isLoading = ref(true)
    const pizzaSemana = ref([])

    onMounted(async () => {
      try {
        const response = await api.get('/pizza-promocao')
        isLoading.value = false
        pizzaSemana.value = response.data
        console.log(pizzaSemana.value)
      } catch (error) {
        isLoading.value = false
        // this.isLoading = false;
      }
    })

    return {
      isLoading,
      slide: ref(1),
      autoplay: ref(true),
      pizzaSemana: []
    }
  }
})
</script>

<style scoped>
.page {
  background-color: rgb(27, 3, 52)
}

.carousel-container {
  max-width: 90%;
  margin: 0 auto;
}

.novo-comp{
  top: 30px;
  max-width: 90%;
  margin: 0 auto;
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
.my-prod {
  margin: auto;
  width: 100%;
  max-width: 300px

}

.card-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.card-wrapper2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  justify-content: center;

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
