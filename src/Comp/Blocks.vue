<template>
  <div>
    <h3 style="font-size: 24px; text-align: center; margin-top: 50px; color: rgba(255,255,255,0.95)">LBRY Blockchain Explorer</h3>
    <h2 v-if="blockData.height = 0">ChainQuery is currently down.</h2>


    <div style="display: flex;
      flex-direction: column;
      width: 100%; margin: 30px auto;">
      <div style="position: relative; width: 300px; display: flex; align-self: center; justify-content: space-around" class="searchBar">

        <input id="transactionId" style="" placeholder="Enter an address, txID or block number" autocomplete="off" v-model="linkCreator">
        <a @click="linkTypeCheck">
          <div class="figCon" v-bind:href="link" target="_blank">
            <figure>
              <div>
                <a style="font-size: 16px; text-decoration: none" target="_blank">Search Transaction</a>
                <a style="font-size: 16px; text-decoration: none" target="_blank">on Explorer</a>
              </div>
            </figure>
          </div>
        </a>
      </div>
      </div>


    <table class="table-fill" style="margin-top: 50px" @mouseover="">
      <thead>
      <tr>
        <th class="text-left">Height</th>
        <th class="text-left">Creation Date</th>
        <th class="text-left">Confirmations</th>
        <th class="text-left">Transactions</th>
        <th class="text-left">Difficulty</th>
        <th class="text-left">Block Size</th>
      </tr>
      </thead>


      <tbody class="table-hover">
      <tr v-for="blocks in blockData" @click="'http://explorer.lbry.com/blocks/' + blocks.height">
        <td class="text-left">
          <a target="_blank" class="td" style="text-align: center; margin: 0 auto; text-decoration: none; font-size: 18px; font-family: Roboto,sans-serif;"
             v-bind:href="'http://explorer.lbry.com/blocks/' + blocks.height">
            {{ blocks.height}}
          </a></td>
        <td class="text-left" style="font-size: 14px">{{blocks.created_at.substring(0 , 10)}} {{blocks.created_at.substring(11,19)}}</td>
        <td class="text-left">{{latestBlock - blocks.height + 1}}</td>
        <td class="text-left">{{Math.round((blocks.transaction_hashes.length/65))}}</td>
        <td class="text-left">{{blocks.difficulty.substring(0 , 15)}}</td>
        <td class="text-left">{{blocks.block_size}}KB</td>
        <td class="text-left">
          <a target="_blank" class="td"
             style="text-align: center; margin: 0 auto; text-decoration: none; font-size: 14px; font-family: Roboto,sans-serif; font-weight: 500"
             v-bind:href="'http://explorer.lbry.com/blocks/' + blocks.height">
            See the transactions in this block<i class="fa fa-globe"></i>
          </a></td>
      </tr>
      </tbody>
    </table>

    <div style="display: flex; overflow: hidden">
      <figure style="margin: 50px auto 0">
        <div>
          <a href="http://explorer.lbry.com/blocks/" style="font-size: 18px; font-weight: 600; color:#fff; text-decoration: none">SEE ALL BLOCKS</a>
          <a href="http://explorer.lbry.com/blocks/" style="font-size: 18px; font-weight: 600; text-decoration: none; color:#2f9176">ON LBRY EXPLORER</a>
        </div>
      </figure>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
          return{
              blockData : {
                  block_size : "",
                  confirmations : "",
                  id : "",
                  difficulty : "",
                  created_at : "",
                  height : 0,
                  transaction_hashes : ""
              },
              latestBlock : 0,
              linkCreator : "",
              link : ""
          }
        },
        methods: {
            linkTypeCheck : function () {
                if(this.linkCreator.length <= 11){
                    this.link = "https://explorer.lbry.com/blocks/" + this.linkCreator
                    window.open(this.link,'_blank');
                }else if (this.linkCreator.length == 64){
                    this.link = "https://explorer.lbry.com/tx/" + this.linkCreator
                    window.open(this.link,'_blank');

                } else if (this.linkCreator.length == 34){
                    this.link = "https://explorer.lbry.com/address/" + this.linkCreator
                    window.open(this.link,'_blank');
                }
                else {
                    alert("Please enter a valid txID, address or block number")
                }
            }
        },
        watch :{

        },
        mounted() {
                // when the Vue app is booted up, this is run automatically.
        var dataUrl= "https://chainquery.lbry.com/api/sql?query=select%20*%20from%20block%20order%20by%20created_at%20desc%20limit%208";
        var self = this; // create a closure to access component in the callback below
        $.getJSON(dataUrl, function(blockData) {
            self.blockData = blockData.data;
            self.blockData.height = blockData.data.height
            self.latestBlock = blockData.data[0].height
            console.log(blockData)


        });
    },
    }
</script>

<style scoped lang="scss">
  @import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700,300,100);
  footer{
    position: fixed;
    bottom: 20px;
    width: 100%;
  }


  .redFont{
    color: red;
  }
  .greenFont{
    color: green;
    font-weight: 400;
  }
  h3 {
    font-family: sans-serif;
  }
  .active{
    color: green;
    font-weight: 500;
  }
  .bgRed {
    background: red;
  }
  html{
    overflow: hidden;
  }
  .bg{
    min-height: 100vh;
    min-width: 100vw;
    position: fixed;
    z-index: -1;
    background:linear-gradient(180deg, #2f9176, #2f5176);
    display: block;
    content: '';
  }
  body {
    font-family: "Roboto", helvetica, arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    text-rendering: optimizeLegibility;
    background: none;
    min-height: 100vh;
  }
  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
    animation: fadeIn 500ms ease-in-out;
  }
  @-webkit-keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .fadeOut {
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
    animation: fadeOut 200ms ease-in-out;
  }


  .noanim{
    animation: none;
  }

  *{
    margin: 0;
    padding: 0;
  }

  .table-fill {
    background: transparent;
    border-radius:3px;
    border-collapse: collapse;
    height: 320px;
    margin: auto;
    max-width: 600px;
    padding:5px;
    width: 100%;
  }

  th {
    color:#D5DDE5;;
    background:#1b1e24;
    border-bottom:4px solid #9ea7af;
    border-right: 1px solid #343a45;
    font-size:18px;
    font-weight: 300;
    padding:24px;
    text-align:left;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
    vertical-align:middle;
  }

  th:first-child {
    border-top-left-radius:3px;
  }

  th:last-child {
    border-top-right-radius:3px;
    border-right:none;
  }

  tr  {
    border-top: 1px solid #C1C3D1;
    border-bottom-: 1px solid #C1C3D1;
    color:#666B85;
    font-size:16px;
    font-weight:normal;
    text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
  }
  tr a{
    color:#666B85;
  }
  tr:hover td a{
    color:#dddddd;
  }

  tr:hover td {
    background:#4E5066;
    color:#FFFFFF;
    border-top: 1px solid #22262e;
  }

  tr:first-child {
    border-top:none;
  }

  tr:last-child {
    border-bottom:none;
  }

  tr:nth-child(odd) td {
    background:#EBEBEB;
  }

  tr:nth-child(odd):hover td {
    background:#4E5066;
  }

  tr:last-child td:first-child {
    border-bottom-left-radius:3px;
  }

  tr:last-child td:last-child {
    border-bottom-right-radius:3px;
  }

  td {
    background:#FFFFFF;
    padding:20px;
    text-align:left;
    vertical-align:middle;
    font-weight:300;
    font-size:16px;
    text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    border-right: 1px solid #C1C3D1;
  }

  tr:first-child td:last-child {
    border-right: 0;
    border-top: 4px solid #9ea7af;
  }
  td:last-child{

  }
  th.text-left {
    text-align: center;
  }

  th.text-center {
    text-align: center;
  }

  th.text-right {
    text-align: center;
  }

  td.text-left {
    text-align: center;
  }

  td.text-center {
    text-align: center;
  }

  td.text-right {
    text-align: center;
  }

table{
  max-width: 100px !important;
}
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  $color:#2f9176;
  figure{width:200px;height:60px;cursor:pointer;perspective:500px;-webkit-perspective:500px;}
  figure div{height:100%;transform-style:preserve-3d;-webkit-transform-style:preserve-3d;transition:0.25s;-webkit-transition:0.25s;}
  figure:hover div{transform:rotateX(-90deg);}
  span{width:100%;height:100%;position:absolute;box-sizing:border-box;border:5px solid #fff;font-family:'Source Sans Pro',sans-serif;line-height:50px;font-size:17pt;text-align:center;text-transform:uppercase;}
  span:nth-child(1){color:#fff;transform: translate3d(0, 0, 30px);-webkit-transform: translate3d(0, 0, 30px);}
  span:nth-child(2){color:$color;background:#fff;transform: rotateX(90deg) translate3d(0, 0, 30px);-webkit-transform: rotateX(90deg) translate3d(0, 0, 30px);}


  input{
    border:5px solid white; padding: 10px 15px; position:relative; font-size: 16px; max-width: 250px; align-self: center; justify-self: center;
    box-shadow: 1px 1px 6px rgba(0,0,0,0.1);
    background: transparent;
    color: white;
    font-weight: 400;
    font-family: "Roboto", sans-serif;

    &::placeholder{
      color: rgba(255,255,255,0.8);
      font-weight: 500;    font-family: "Roboto", sans-serif;
      font-size: 10px;
    }
    &:focus{
      box-shadow: 1px 3px 7px rgba(0,0,0,0.2);
      outline: none;

    }
  }
  figure{width:200px;height:60px;cursor:pointer;perspective:500px;-webkit-perspective:500px;
  }
  figure div{height:100%;transform-style:preserve-3d;-webkit-transform-style:preserve-3d;transition:0.25s;-webkit-transition:0.25s;}
  figure:hover div{transform:rotateX(-90deg); }
  figure div a{width:100%;height:100%;position:absolute;box-sizing:border-box;border:5px solid #fff;    font-family: "Roboto", sans-serif;
    line-height:50px;font-size:17pt;text-align:center;text-transform:uppercase;}
  figure div a:nth-child(1){color:#fff;transform: translate3d(0, 0, 30px);-webkit-transform: translate3d(0, 0, 30px);}
  figure div a:nth-child(2){color:$color;background:#fff;transform: rotateX(90deg) translate3d(0, 0, 30px);-webkit-transform: rotateX(90deg) translate3d(0, 0, 30px);
  }
  figure{
    transform: scale(0.77);
    &:hover{
      transform: scale(0.8);
    }
  }
  .figcon{
    &:hover{
    }
  }


  @media only screen and (max-width: 768px) {
    thead tr th:nth-child(3){
      display: none;
    }
    tbody tr td:nth-child(3) {
      display: none;
    }
    thead tr th:nth-child(5){
      display: none;
    }
    tbody tr td:nth-child(5) {
      display: none;
    }
    thead tr th:nth-child(6){
      display: none;
    }
    tbody tr td:nth-child(6) {
      display: none;
    }
    td {
      a{
        font-size: 12px!important;
      }
      max-width: 100px;
      background: #FFFFFF;
      padding: 0!important;
      text-align: left;
      vertical-align: middle;
      font-weight: 400;
      font-size: 14px;
      text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
      border-right: 1px solid #C1C3D1;
    }
  }

  @media only screen and (max-width: 426px) {
    .searchBar{
      display: flex;
      flex-direction: column;
      align-self: center;
      align-items: center;
      justify-content: space-evenly;
      align-content: space-evenly;
      input{
        margin-bottom: 20px;
      }
    }
    table, thead, tbody{
      align-self: center!important;
      justify-self: center!important;
      margin: 0 auto;
    }
    td {
      background: #FFFFFF;
      padding: 5px!important;
      text-align: left;
      vertical-align: middle;
      font-weight: 400;
      font-size: 12px;
      text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
      border-right: 1px solid #C1C3D1;
    }
    td:last-child a{
      font-size: 11px!important;
    }
    thead tr th:nth-child(3){
      display: none;
    }
    tbody tr td:nth-child(3) {
      display: none;
    }
  }
  figure{
  }
</style>
