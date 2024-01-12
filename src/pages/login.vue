<template>
  <q-page class="flex justify-center image-container" >
    <div class="q-pa-md" style="min-width: 400px;">
      <q-card class="my-card0">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input class="entrada" outlined v-model="username" label="E-mail" />
          <q-input class="entrada" outlined v-model="password" @keyup.enter="submitForm"
          type="password" label="Senha" />
          <div class="card0">
            <q-btn
              unelevated
              rounded
              @click="submitForm"
              color="orange"
              icon="send"
              label="Entrar"
              v-show="showButton"
              to="/home"
            />
            <q-spinner
              :size="80"
              :color="loading ? 'red' : 'transparent'"
              v-show="!showButton"
            />
          </div>
        </q-form>
      </q-card>
    </div>

    <q-dialog v-model="missingFieldsDialog"
    persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-red-7 text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-white">Atenção</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-white">
        Existem campos obrigatórios que devem ser preenchidos.
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Falha de autenticação</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Não foi possível fazer login. Tente novamente mais tarde.
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
import { QSpinner } from 'quasar'
import { api } from 'boot/axios'

export default {
  name: 'login_',
  components: {
    QSpinner

  },
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      showButton: true,
      persistent: false,
      missingFieldsDialog: false
    }
  },

  methods: {
    async submitForm (event) {
      event.preventDefault()

      if (this.username && this.password) {
        try {
          this.loading = true
          this.showButton = false

          const payload = {
            email: this.username,
            senha: this.password
          }

          const response = await api.post('/login', payload)
          const { token } = response.data
          const { tipo } = response.data

          localStorage.setItem('token', token)
          localStorage.setItem('tipo', tipo)

          this.$router.push('/home')
        } catch (error) {
          console.log(error)
          this.persistent = true
        } finally {
          this.loading = false
          this.showButton = true
        }
      } else {
        this.missingFieldsDialog = true
      }
    }
  }

}
</script>

<style scoped>
.my-card0 {
  top: 10%;
  padding: 10%;
  width: 100%;
  background-color: rgb(216, 212, 5,0.5);
}

.card0 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image-container {
  position: relative;
  background-image: url('../assets/pizza2.jpg');
  background-size: cover;
  background-position: center;
  height: 300px; /* Ajuste a altura conforme necessário */
}
.image-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(rgba(255, 255, 255, 0.4) 10%,  rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 70%);
}
</style>
