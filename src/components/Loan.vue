<template>
  <h1>Calculateur de prêt</h1>

    <div class="container">
      <div class="input-group mb-3">
        <span class="input-group-text" id="priceCurrency">€</span>
        <input type="number" v-model="rawAmount" class="form-control" id="housePrice" placeholder="Montant du bien" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="buyerAmount">€</span>
        <input type="number" v-model="contribution" class="form-control" id="buyerAmount" placeholder="Montant de l'apport" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="rate">%</span>
        <input type="float"  v-model="rate" class="form-control" id="rate" placeholder="Taux du prêt" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="tax">Type</span>
      <select v-model="tax" class="form-select" aria-label="Default select example">
        <option value="8" selected>Ancien (8% de Frais de notaire)</option>
        <option value="3">Neuf (3% de Frais de notaire)</option>
        <option value="0">Neuf (FDN offert)</option>
      </select>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="duration">Années</span>
        <input type="number" v-model="duration" class="form-control" id="duration" placeholder="Durée du prêt" />
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="salaryByMonth">€</span>
        <input type="number" v-model="monthlySalary" class="form-control" id="salaryByMonth" placeholder="Salaire net mensuel" />
      </div>
      <div class="input-group mb-3">
        <button @click="calculate" class="btn btn-primary" id="submit">Calculer !</button>
      </div>
    </div>
      <p v-if="amountTaxIncluded !== undefined">Prix FDN inclus: {{amountTaxIncluded.toFixed(2)}} €</p>
      <p v-if="loanPrice !== undefined">Count du crédit: {{loanPrice.toFixed(2)}} €</p>
      <p v-if="monthlyRent !== undefined"><strong>Mensualité: {{monthlyRent.toFixed(2)}} €</strong></p>
      <p v-if="typeof monthlydebtRate === 'number'" :style="{color: debtColor}"><strong>Endettement: {{monthlydebtRate.toFixed(2)}}%</strong></p>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      rawAmount: undefined,
      contribution: undefined,
      rate: undefined,
      duration: 25,
      monthlyRent: 0,
      tax: 8,
      monthlySalary: undefined,
      monthlydebtRate: undefined,
      debtColor: undefined,
      loanPrice: undefined,
      amountTaxIncluded: undefined
  };
},
  methods: {
    calculate () {
      console.log({tax: this.tax})
      const percentage = (100 + Number(this.tax)) / 100;
      console.log({appliedPercentage: percentage})
      this.amountTaxIncluded = (this.rawAmount ?? 0) * percentage;

      const monthlyRate = this.rate / 12 / 100;
      const numberOfMonths = this.duration * 12;

      const amountToLoan = this.amountTaxIncluded - (this.contribution ?? 0);

      const firstPart = amountToLoan * monthlyRate;
      const secondPart = Math.pow((1 + monthlyRate), (-1 * numberOfMonths));

      this.monthlyRent = firstPart / (1 - secondPart);

      console.log({monthlyRent:  this.monthlyRent})
      console.log({monthlySalary:  this.monthlySalary})

      this.monthlydebtRate = (Number(this.monthlyRent) / Number(this.monthlySalary)) * 100;
      console.log({monthlydebtRate: this.monthlydebtRate})
      if (this.monthlydebtRate < 33.34) {
        this.debtColor = 'green';
      } else if (this.monthlydebtRate < 35) {
        this.debtColor = 'orange';
      } else {
        this.debtColor = 'red';
      }

      this.loanPrice = (Number(this.monthlyRent) * numberOfMonths) - amountToLoan;
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
