<template>
 <q-page  class="flex flex-center page">
  <q-card class="my-card2" flat bordered>
    <q-card-section horizontal>
      <q-img class="col-4" src="../assets/pizzaria-real.png" />

      <q-card-section class="col-8">
        <div class="texto-p1 flex-grow">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the leap
            into electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets containing
            Lorem Ipsum passages, and more recently with desktop publishing software
            like Aldus PageMaker including versions of Lorem Ipsum.
        </div>

        <div class="custom-separator">
          <div class="separator-line"></div>
          <div class="separator-icon">
            <q-icon name="history_edu" size="sm" color="black" />
          </div>
          <div class="separator-line"></div>
        </div>

        <!-- Flex container para as duas divs -->
        <div class="d-flex flex-column justify-end">
          <!-- Conteúdo da div text-p2 -->
          <div class="texto-p2">
            <q-card-section>
              <div class="text-h6">🎊 Pizzaria Veneza: Uma História de Sabor! 🎊</div>
              <q-separator spaced inset vertical dark />
              <div class="text-h7">📍 R. São Sebastião, 799 - Canto da Várzea, Picos - PI, 64600-000 </div>
              <div class="text-h7">☎️ Telefone: (89) 99919-4045</div>
              <div class="text-h7">🌐 Saiba mais: [Site da Pizzaria]</div>
              <div class="text-h7">➕ Redes Sociais: </div>
              <div class="social-links">
                <a href="mailto:eduardosousa@ufpi.edu" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/gmail.png" alt="Gmail" />
                    </a>
                    <a href="https://www.linkedin.com/in/eduardo-de-sousa-3a02a2254" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/facebook.png" alt="Linkedin" />
                    </a>
                    <a href="https://github.com/eduardosousaa" target="_blank" rel="noopener noreferrer">
                      <img src="../assets/instagram.jpeg" alt="GitHub" />
                    </a>

                  </div>

            </q-card-section>
          </div>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
 </q-page>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'paginaContato'
})
</script>

<style>
.page {
  background-color: rgb(27, 3, 52)
}
.my-card2 {
  width: 100%;
  max-width: 80%;
}
.custom-separator {
  display: flex;
  align-items: center;
}

.texto-p1 {
  margin-bottom: 15px;
}

.separator-line {
  flex-grow: 1;
  height: 1px;
  background-color: black;
}

.separator-icon {
  margin: 0 10px;  /* Ajuste conforme necessário */
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

</style>
