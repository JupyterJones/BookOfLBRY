<template>
<div>
<!--  <form style="margin: 0 auto; text-align: center; margin-top: 50px">-->
<!--    <input type="radio" v-model="minAmount" :value="20000">20K-->
<!--    <input type="radio" v-model="minAmount" :value="50000">50K-->
<!--    <input type="radio" v-model="minAmount" :value="100000">100K-->
<!--    <input type="radio" v-model="minAmount" :value="500000">500K-->
<!--  </form>-->
  <div style="display: flex; align-items: center; justify-content: center; flex-direction: column">
    <div class="heading">
      <p>Track the biggest transactions on LBRY Blockchain LiveTime</p>
      <p>Select the minimum amount to be shown on the latest 2000 transactions</p>
    </div>
    <div class="control-group" style="display: flex; align-items: flex-start; justify-content: space-evenly; margin-top: 20px; flex-wrap: wrap; max-width: 50%;">
      <label class="control control--radio">20000
        <input type="radio" name="radio" v-model="minAmount" :value="20000">
        <div class="control__indicator"></div>
      </label>

      <label class="control control--radio">50000
        <input type="radio" name="radio" v-model="minAmount" :value="50000">
        <div class="control__indicator"></div>
      </label>

      <label class="control control--radio">100000
        <input type="radio" name="radio" v-model="minAmount" :value="100000"  @click="check">
        <div class="control__indicator"></div>
      </label>

      <label class="control control--radio">250000
        <input type="radio" name="radio" v-model="minAmount" :value="250000"  @click="check">
        <div class="control__indicator"></div>
      </label>
    </div>
  </div>

  <div class="tbl-header" style="border: 3px solid white; width: 80%; margin: 50px auto 0 auto">
    <table cellpadding="0" cellspacing="0" border="0">
      <thead>
      <tr>
        <th>Created At</th>
        <th>Output</th>
        <th>Input</th>
        <th>Txid</th>
        <th>Amount</th>
      </tr>
      </thead>
    </table>
  </div>
  <div class="tbl-content" style="border: 3px solid white; width: 80%; margin: 0 auto">
    <table cellpadding="0" cellspacing="0" border="0">
      <tbody id="table">
      <tr v-for="tx in transactionData" v-if="tx.value>minAmount">
        <td>{{tx.created_at.substring(0,10)}}  <br> {{tx.created_at.substring(11,19) }}</td>
        <td>{{tx.output_count}}</td>
        <td>{{tx.input_count}}</td>
        <td>{{tx.hash.substring(0,20)+'...'}} <a target="_blank"
          :href="'https://explorer.lbry.com/tx/'+tx.hash" style="font-family: Roboto, sans-serif;  text-decoration: none; color: white; animation: scale 1s infinite!important;">See on explorer</a></td>
        <td>{{tx.value.toString().substring(0,9)}}+ <span style="font-weight: 500; font-size: 14px">LBC</span></td>
      </tr>
      <p v-show="table  = 0" style="margin: 0 auto; align-self: center; justify-self: center;text-align: center; margin-top: 100px">Sorry.. There is no transaction here</p>

      </tbody>
    </table>
  </div>
</div>
</template>

<script>

    export default {
        data(){
            return{
                transactionData : {
                    block_hash_id : "",
                    created_at : "",
                    output_count : "",
                    input_count : "",
                    hash : ""
                },
                minAmount : 1000,
                table : ""
            }
        },
        methods: {
            check : function () {
                this.table = $("mainTable > tr").length
            },

        },
        mounted() {
// when the Vue app is booted up, this is run automatically.
            var dataUrl= "https://chainquery.lbry.com/api/sql?query=select%20*%20from%20transaction%20order%20by%20created_time%20desc%20limit%203000";
            var self = this // create a closure to access component in the callback below
            $.getJSON(dataUrl, function(transactionData) {
                self.transactionData = transactionData.data;
            });
        },
    }
</script>

<style scoped lang="scss">


  div p {
    color: white;
    font-family: Roboto, sans-serif;
    font-size: 16px; margin-top: 50px;
    text-align: center;
    &:last-child{
      margin-top: 10px;
    }
  }

  label, input{
    font-weight: 400; font-family: Roboto, sans-serif;
    text-align: center;
    color: white;
    text-shadow: 1px 1px 6px rgba(0,0,0,0.2);
  }
  label{
    margin-left: 25px;
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  }

  table{
    width:100%;
    table-layout: fixed;
  }
  .tbl-header{
    background-color: rgba(255,255,255,0.3);
  }
  .tbl-content{
    height:300px;
    overflow-x:auto;
    margin-top: 0px;
    border: 1px solid rgba(255,255,255,0.3);
  }
  th{
    padding: 20px 15px;
    text-align: left;
    font-weight: 500;
    font-size: 12px;
    color: #fff;
    text-transform: uppercase;
    font-family: Roboto, sans-serif;
  }
  td{
    padding: 15px;
    text-align: left;
    vertical-align:middle;
    font-weight: 300;
    font-size: 12px;
    color: #fff;
    border-bottom: solid 1px rgba(255,255,255,0.1);
    font-family: Roboto, sans-serif;

  }
  .control input {
    position: absolute;
    z-index: -1;
    opacity: 0;
  }

  .control__indicator {
    position: absolute;
    top: 2px;
    left: 0;
    width: 20px;
    height: 20px;
    background: #e6e6e6;
  }

  .control--radio .control__indicator {
    border-radius: 50%;
  }

  /* Hover and focus states */
  .control:hover input ~ .control__indicator,
  .control input:focus ~ .control__indicator {
    background: #ccc;
  }

  /* Checked state */
  .control input:checked ~ .control__indicator {
    background: #2aa1c0;
  }

  /* Hover state whilst checked */
  .control:hover input:not([disabled]):checked ~ .control__indicator,
  .control input:checked:focus ~ .control__indicator {
    background: #0e647d;
  }

  /* Disabled state */
  .control input:disabled ~ .control__indicator {
    pointer-events: none;
    opacity: .6;
    background: #e6e6e6;
  }

  /* Check mark */
  .control__indicator:after {
    position: absolute;
    display: none;
    content: '';
  }

  /* Show check mark */
  .control input:checked ~ .control__indicator:after {
    display: block;
  }

  /* Checkbox tick */
  .control--checkbox .control__indicator:after {
    top: 4px;
    left: 8px;
    width: 3px;
    height: 8px;
    transform: rotate(45deg);
    border: solid #fff;
    border-width: 0 2px 2px 0;
  }

  /* Disabled tick colour */
  .control--checkbox input:disabled ~ .control__indicator:after {
    border-color: #7b7b7b;
  }

  /* Radio button inner circle */
  .control--radio .control__indicator:after {
    top: 7px;
    left: 7px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #fff;
  }

  /* Disabled circle colour */
  .control--radio input:disabled ~ .control__indicator:after {
    background: #7b7b7b;
  }
  .control {
    font-size: 18px;
    position: relative;
    display: block;
    margin-bottom: 15px;
    padding-left: 30px;
    cursor: pointer;
  }
  .control-group {

  }


  @media only screen and (max-width: 768px) {

    .control-group{
      max-width: 100% !important;
    }
  }

  @media only screen and (max-width: 426px) {
    .heading{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      p{
        width: 80%;
      }
    }

  }
</style>
