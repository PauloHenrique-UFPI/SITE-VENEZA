<template>
  <q-page class="page flex justify-center">
    <div class="q-pa-md" style="min-width: 35%;">
      <q-card class="my-card0">
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
        <div class="d-flex flex-center text-center q-mb-md">
        <q-avatar size="100px" class="flex-center">
            <img src="../assets/logo.png" alt="Logo">
          </q-avatar>
        </div>
          <h6>Por favor digite sua nova senha: </h6>
          <div class="q-gutter-md q-mt-md q-mb-md q-flex q-items-center">
            <q-input
              rounded
              outlined
              v-model="senha"
              :type="mostrarSenha ? 'text' : 'password'"
              label="Senha"
              :readonly="loading"
            >
              <template v-slot:append>
                <q-icon
                  :name="mostrarSenha ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="mostrarSenha = !mostrarSenha"
                />
              </template>
            </q-input>

            <q-input
              rounded
              outlined
              v-model="nSenha"
              :type="mostrarSenha ? 'text' : 'password'"
              label="Confirmar Senha"
              :readonly="loading"
            >
            <template v-slot:append>
                <q-icon
                  :name="mostrarSenha ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="mostrarSenha = !mostrarSenha"
                />
              </template>
            </q-input>

          </div>
          <div class="card0">
            <q-btn
              unelevated
              rounded
              @click="submitForm"
              color="orange"
              icon="send"
              label="Enviar"
              v-show="showButton"
            />
            <q-spinner
              :size="80"
              :color="loading ? 'orange' : 'transparent'"
              v-show="!showButton"
            />
          </div>
        </q-form>
      </q-card>
    </div>

    <q-dialog v-model="senhaIgual"
    persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-red-7 text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-white">Atenção</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-white">
        As senhas precisam ser iguais !
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-red-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Falha em enviar Email</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Não foi possível Enviar o Email para redefinicão de senha.
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="notifyOK" persistent transition-show="scale" transition-hide="scale">
      <q-card class="bg-green-7 text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6 text-white">Senha Alterada</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-white">
          Senha redefinida com sucesso !
        </q-card-section>

        <q-card-actions align="center" class="bg-white text-teal">
          <q-btn flat label="OK" @click="redirecionarParaLogin" v-close-popup />
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
  props: ['token'],
  components: {
    QSpinner
  },
  data () {
    return {
      senha: '',
      nSenha: '',
      loading: false,
      showButton: true,
      persistent: false,
      senhaIgual: false,
      notifyOK: false,
      missingFieldsDialog: false,
      mostrarSenha: false,
      tokenValue: ''
    }
  },
  mounted () {
    this.tokenValue = this.$route.params.token
  },
  methods: {
    async submitForm (event) {
      event.preventDefault()
      this.loading = true
      this.showButton = false
      try {
        if (this.senha === this.nSenha) {
          const payload = {
            token: this.tokenValue,
            novaSenha: this.senha
          }

          const response = await api.post('/trocarSenha', payload)

          if (response) {
            this.notifyOK = true
          }
        } else {
          this.senhaIgual = true
        }
      } catch (error) {
        console.log(error)
        this.persistent = true
        this.loading = false
        this.showButton = true
      } finally {
        this.loading = false
        this.showButton = true
      }
    },
    redirecionarParaLogin () {
      window.location.href = '/'
    }
  }
}
</script>

<style scoped>

.page {
  background-color: rgb(27, 3, 52)
}

.my-card0 {
  top: 10%;
  padding: 10%;
  width: 100%;

}

.card0 {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
