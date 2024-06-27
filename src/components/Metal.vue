<template>
  <h1>Calculateur de prime</h1>

    <div class="container">
      <div class="input-group mb-3">
        <span class="input-group-text" id="itemPrice">€</span>
        <input type="number" v-model="itemPrice" class="form-control" id="itemPrice" placeholder="Montant de l'item" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="itemWeight">g</span>
        <input type="number" v-model="itemWeight" class="form-control" id="itemWeight" placeholder="Poid de l'item en grammes" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="ozPrice">€</span>
        <input type="number" v-model="ozPrice" class="form-control" id="ozPrice" placeholder="Prix de la once" />
      </div>

      <div class="input-group mb-3">
        <button @click="calculate" class="btn btn-primary" id="submit">Calculer !</button>
      </div>
    </div>
      <p v-if="prime !== undefined">Prix au Gramme: {{pricePerGram.toFixed(2)}} €</p>
      <p v-if="prime !== undefined">Prime: {{prime.toFixed(2)}} %</p>
</template>

<script>
const gramsInOz = 31.1034768;

export default {
  name: 'App',
  data() {
    return {
      itemPrice: undefined,
      itemWeight: undefined,
      ozPrice: undefined,
      // calculated
      pricePerGram: undefined,
      prime: undefined
  };
},
  methods: {
    calculate () {
      // TODO ...
      this.pricePerGram = this.ozPrice / gramsInOz;
      const itemPricePerGram = this.itemPrice / this.itemWeight;
      this.prime = ((itemPricePerGram - this.pricePerGram) / this.pricePerGram) * 100;
    }
  },
  watch: {
    rate: function (newVal) {
      if (typeof newVal === 'string' && newVal.includes(',')) {
        this.rate = newVal.replace(',', '.')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
