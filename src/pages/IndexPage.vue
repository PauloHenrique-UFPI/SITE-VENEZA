<template>
  <q-page
    class="flex flex-center"
    :style="{
      backgroundImage: `url(${require('../assets/pizza4.jpg')})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }"
  >
    <div class="add" style="position: absolute;">
      <q-fab
        vertical-actions-align="right"
        color="orange"
        glossy
        icon="keyboard_arrow_up"
        direction="up"
      >
        <q-fab-action color="green" icon="add" label="Adicionar" @click="abrirAddPedido" />
      </q-fab>
    </div>

    <div>
      <div>
        <q-item-label header align="center" class="custom-header-label">
          Lista de Pedidos
        </q-item-label>
      </div>

      <q-list bordered class="rounded-borders" style="max-width: 600px; overflow-y: auto; max-height: 400px;">
        <q-item
          v-for="(pedido, index) in pedidos"
          :key="index"
          class="q-mb-xl"
          style="background-color: aliceblue; border-radius: 30px; width: 400px; margin-bottom: 12px;"
        >
          <q-item-section top class="col-2 gt-sm">
            <q-avatar color="orange" text-color="white" class="custom-avatar">
            </q-avatar>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-grey-8">{{ pedido.id }} - {{ pedido.nomeCliente }}</span>
            </q-item-label>
            <q-item-label caption lines="1">
              {{ pedido.tipo }} - {{ pedido.tamanho }}
            </q-item-label>
            <q-item-label lines="1" class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase">
              <span class="cursor-pointer" @click="abrirDetalhesPedido(pedido)">Detalhar Pedido</span>
            </q-item-label>
          </q-item-section>

          <q-item-section top side>
            <div class="text-grey-8 q-gutter-xs">
              <q-btn class="gt-xs" size="12px" flat dense round icon="delete"
              @click="deletarPedido(pedido.id)"/>
              <q-btn class="gt-xs" size="12px" flat dense round icon="edit" />
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="search"
                @click="abrirDetalhesPedido(pedido)"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-list>

      <q-dialog v-model="dialogAdicionarPedido" >
        <q-card>
          <q-card-section>
            <h3 class="titulo-pizza">Adicionar Pedido</h3>
            <q-select
              outlined
              v-model="tipo"
              :options="optionsP"
              label="Sabor da Pizza *"
              class="q-mb-md"
              />

            <q-select
              outlined
              v-model="tamanho"
              :options="optionsT"
              label="Tamanho da Pizza *"
              class="q-mb-md"
              />

              <q-input
                outlined
                v-model="complemento"
                label="Complemento"
                class="q-mb-md"
                :rules="[
                  val => val !== null && val !== '' || 'Este campo é obrigatório',
                ]"
                />

                <div class="inputs-container">
                  <q-input
                    outlined
                    v-model="preco"
                    label="Preço *"
                    :rules="[val => val !== null && val !== '' || 'obrigatório']"
                    mask="R$ ##,##"
                    type="tel"
                    class="q-mb-md input-spacing"
                  />
                  <q-input
                    outlined
                    v-model="troco"
                    label="Troco *"
                    mask="R$ ##,##"
                    type="tel"
                    class="q-mb-md"
                  />
                </div>
                <q-input
                outlined
                v-model="endereco"
                label="Endereço *"
                :rules="[
                  val => val !== null && val !== '' || 'Este campo é obrigatório',
                ]"
                />
                <q-input
                outlined
                v-model="nomeCliente"
                label="Nome Cliente *"
                :rules="[
                  val => val !== null && val !== '' || 'Este campo é obrigatório',
                ]"
                />

                <q-input
                  outlined
                  v-model="contato"
                  label="Nº Telefone *"
                  mask="(##) # ####-####"
                  :rules="[ val => val && val.length > 0 || 'Campo obrigatório']"
                  type="tel"
                />

          </q-card-section>
          <q-card-actions align="center">
            <q-btn label="Cancelar" color="red" @click="fecharAddPedido" />
            <q-btn label="Adicionar" color="green" @click="submitFormAddPedido" />
          </q-card-actions>
        </q-card>
    </q-dialog>

      <q-dialog v-model="confirmarExclusao">
        <q-card>
          <q-card-text>
            Você tem certeza que deseja excluir este pedido?
          </q-card-text>
          <q-card-actions align="center">
            <q-btn label="Cancelar" color="primary" @click="cancelarExclusao" />
            <q-btn label="Confirmar" color="negative" @click="confirmarExclusaoPedido" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-dialog v-model="dialogDetalhesPedido">
        <q-card>
          <q-card-section>
            <h3 class="titulo-pizza">Pizza de {{ pedidoSelecionado.tipo }}</h3>
            <div>
              <p>Nome do Cliente: {{ pedidoSelecionado.nomeCliente }}</p>
              <p>Tamanho: {{ pedidoSelecionado.tamanho }}</p>
              <p>ID do Pedido: {{ pedidoSelecionado.id }}</p>
              <p>Complemento: {{ pedidoSelecionado.complemento }}</p>
              <p>Preço: R$ {{ pedidoSelecionado.preco }}</p>
              <p>Troco: R$ {{ pedidoSelecionado.troco }}</p>
              <p>Endereco: {{ pedidoSelecionado.endereco }}</p>
              <p>Contato: {{ pedidoSelecionado.contato }}</p>
              <p>Status: {{ pedidoSelecionado.status }}</p>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn label="Fechar" color="orange" @click="fecharDetalhesPedido" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { api } from 'boot/axios'

export default defineComponent({
  name: 'IndexPage',
  data () {
    return {
      pedidos: [],

      tipo: '',
      tamanho: '',
      complemento: 'Não',
      preco: '',
      troco: '0000',
      endereco: '',
      nomeCliente: '',
      contato: '',
      status: 'on',

      optionsP: [
        'Calabresa', 'Portuguesa', 'Marguerita', 'Muçarela', 'Napolitana'
      ],
      optionsT: [
        'P', 'M', 'G', 'GG'
      ],

      pedidoSelecionado: {},
      dialogDetalhesPedido: false,
      dialogAdicionarPedido: false,
      confirmarExclusao: false
    }
  },
  mounted () {
    this.carregar()
  },
  methods: {
    async carregar () {
      const token = localStorage.getItem('token')
      try {
        const response = await api.get('/todos-pedidos', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.pedidos = response.data.groups
        this.isLoading = false
      } catch (error) {
        console.log(error)
        this.isLoading = false
      }
    },
    abrirDetalhesPedido (pedido) {
      this.pedidoSelecionado = pedido
      this.dialogDetalhesPedido = true
    },
    fecharDetalhesPedido () {
      this.pedidoSelecionado = {}
      this.dialogDetalhesPedido = false
    },
    async deletarPedido (pedidoId) {
      this.confirmarExclusao = true
      this.pedidoSelecionado = { id: pedidoId }
    },

    abrirAddPedido () {
      this.dialogAdicionarPedido = true
    },

    fecharAddPedido () {
      this.tipo = ''
      this.tamanho = ''
      this.complemento = 'Não'
      this.preco = ''
      this.troco = '0000'
      this.endereco = ''
      this.nomeCliente = ''
      this.contato = ''
      this.dialogAdicionarPedido = false
    },

    cancelarExclusao () {
      this.confirmarExclusao = false
      this.pedidoSelecionado = {}
    },

    async confirmarExclusaoPedido () {
      this.confirmarExclusao = false

      const token = localStorage.getItem('token')
      try {
        await api.delete(`/deletar-pedido/${this.pedidoSelecionado.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        this.carregar()
      } catch (error) {
        console.error('Erro ao deletar o pedido', error)
      }

      this.pedidoSelecionado = {}
    },

    async submitFormAddPedido () {
      try {
        this.loading = true
        const token = localStorage.getItem('token')
        const formData = new FormData()

        formData.append('tipo', this.tipo)
        formData.append('tamanho', this.tamanho)
        formData.append('complemento', this.complemento)
        formData.append('preco', this.preco)
        formData.append('troco', this.troco)
        formData.append('endereco', this.endereco)
        formData.append('nomeCliente', this.nomeCliente)
        formData.append('contato', this.contato)
        formData.append('status', this.status)

        await api.post('/criar-pedido', formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        this.fecharAddPedido()
        this.carregar()
      } catch (error) {
        this.persistent = true
        this.loading = false
      } finally {
        this.loading = false
      }
    }

  }
})
</script>

<style>
.custom-header-label {
  font-size: 24px;
  font-family: 'Courier New';
  font-weight: bold;
  padding: 10px;
  border: 10px solid #FFA500;
  background-color: #FFFF00;
  border-radius: 10px;
  color: #000000;
  margin-bottom: 20px;
}

.custom-avatar {
  width: 40px;
  height: 40px;
  font-size: 18px;
}

.add{
  position: fixed;

  left:85%;
  top: 85%;
  z-index: 2;

}

.titulo-pizza{
  font-size: 24px;
  font-family: 'Courier New';
  font-weight: bold;
  border: 10px solid #FFA500;
  border-radius: 10px;
  color: #000000;
  margin-bottom: 20px;
  padding: 12px;
}

.inputs-container {
    display: flex;
    justify-content: space-between;
  }

  .input-spacing {
    margin-right: 10px;
  }
</style>
