<template>
  <q-page class="page flex justify-center" :style="{
      backgroundImage: `url(${require('../assets/pizza2.jpg')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }">
    <div class="q-pa-md" style="min-width: 35%;">
      <q-card class="my-card0">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input class="entrada" rounded outlined v-model="username" label="E-mail" />
          <q-input class="entrada" rounded outlined v-model="password" @keyup.enter="submitForm"
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
  }

}
</script>

<style scoped>
.my-card0 {
  top: 10%;
  padding: 10%;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
}

.card0 {
  display: flex;
  justify-content: center;
  align-items: center;
}

.entrada{

}
</style>
