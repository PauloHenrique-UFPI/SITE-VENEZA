<template>
  <q-page class="flex justify-center image-container" >
          <div class="q-pa-md" style="min-width: 400px;">
            <q-card class="my-card0">
              <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
              >
            <div class="q-pa-md">
              <q-input v-model="email" filled type="email" hint="Email"
              label="Email *"
               :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
              />

              <q-input v-model="senha" filled :type="isPwd ? 'password' : 'text'" hint="Senha" label="Senha *"
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              <q-input v-model="confirmaSenha" filled :type="isPwd ? 'password' : 'text'" hint="Confirmar senha"
              label="Confirmar Senha *"
              :rules="[ val => val && val.length > 0 || 'Campo obrigatório']">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>

              <div class="inputs-container">
                <q-input v-model="telefone" filled type="tel" hint="(##) # ####-####" mask="(##) # ####-####" label="Numero *"
                 class="q-mb-md input-spacing" :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"/>
                <q-input v-model="dateN" filled type="date" hint="Data de Nascimento" class="q-mb-md input-spacing"
                :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"/>
             </div>
             <div>
                  <q-input v-model="cep" filled type="tel" hint="CEP" mask="###-####" label="CEP *"
                  :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"/>
                  <a href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                  class="text-primary" target="_blank" style="text-align: right; display: block;">
                    Como Descobrir meu CEP ?
                  </a>
                </div>

             <q-input v-model="endereco" filled  hint="Endereço" label="Endereço *"
             :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"/>
        </div>
          <div class="card0">
            <q-btn
              unelevated
              rounded
              @click="submitForm"
              color="green"
              icon="send"
              label="Cadastrar"
              v-show="showButton"
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

    <q-dialog v-model="flag"
    persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-red-7 text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-white">Atenção</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-white">
        {{ mensagem }}
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="flag2"
    persistent transition-show="scale" transition-hide="scale">
    <q-card class="bg-green-7 text-white" style="width: 300px">
      <q-card-section>
        <div class="text-h6 text-white">Atenção</div>
      </q-card-section>

      <q-card-section class="q-pt-none text-white">
        {{ mensagem }}
      </q-card-section>

      <q-card-actions align="center" class="bg-white text-teal">
        <q-btn flat label="OK" to="/" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  </q-page>
</template>

<script>
import { QSpinner } from 'quasar'
import { api } from 'boot/axios'
import { ref } from 'vue'

export default {
  name: 'login_',
  components: {
    QSpinner

  },
  data () {
    return {

      isPwd: ref(true),

      email: ref(''),
      senha: ref(''),
      confirmaSenha: ref(''),
      telefone: ref(''),
      dateN: ref(''),
      cep: ref(''),
      endereco: ref(''),

      flag: false,
      flag2: false,
      mensagem: '',

      loading: false,
      showButton: true,
      persistent: false,
      missingFieldsDialog: false
    }
  },

  methods: {
    async submitForm (event) {
      event.preventDefault()
      if (this.senha !== this.confirmaSenha) {
        this.flag = true
        this.mensagem = 'As Senhas não são iguais !'
        return
      }

      if (!this.email || !this.senha) {
        this.flag = true
        this.mensagem = 'Existem Campos Obrigatórios vazios !'
        return
      }

      const dataNascimento = `${this.dateN}T00:00:00`

      try {
        this.loading = true
        this.showButton = false

        const formData = new FormData()
        const tipo = 'user'

        formData.append('email', this.email)
        formData.append('senha', this.senha)
        formData.append('telefone', this.telefone)
        formData.append('dataNascimento', dataNascimento)
        formData.append('cep', this.cep)
        formData.append('endereco', this.endereco)
        formData.append('tipo', tipo)

        await api.post('/criar', formData, {
          headers: {
            'Content-Type': 'application/json'
          }

        })

        this.flag2 = true
        this.mensagem = 'Cadastrado com Sucesso, você será redirecionado para o Login !'
      } catch (error) {
        console.log(error)
        this.flag = true
        this.mensagem = 'Falha ao tentar cadastrar, por favor espere 10 minutos e tente novamente !'
      } finally {
        this.loading = false
        this.showButton = true
      }
    }
  }

}
</script>

<style scoped>
.my-card0 {
  top: 2%;
  padding: 2%;
  width: 100%;
  background-color: rgb(253, 253, 253,0.8);
}

.card0 {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.image-container {
  position: relative;
  background-image: url('../assets/pizza2.jpg');
  background-size: cover;
  background-position: center;
  height: 100%;
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

.inputs-container {
    display: flex;
    justify-content: space-between;
  }

.input-spacing {
  margin-right: 10px;
}

</style>
