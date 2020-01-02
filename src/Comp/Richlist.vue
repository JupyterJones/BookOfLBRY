<template>
  <div>
    <div class="tbl-header" style="border: 3px solid white; width: 80%; margin: 50px auto 0 auto">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
        <tr>
          <th>Address</th>
          <th>Balance</th>
          <th>Created At</th>
        </tr>
        </thead>
      </table>
    </div>
    <div class="tbl-content" style="border: 3px solid white; width: 80%; margin: 0 auto">
      <table cellpadding="0" cellspacing="0" border="0">
        <tbody id="table">
        <tr v-for="address in walletData">
          <td>
            <a
            :href="'https://explorer.lbry.com/address/'+address.address"
            style="text-decoration: none; color: white; font-family: Roboto, sans-serif;font-weight: 500">{{address.address}}</a>
            <img
              v-if="['rFLUohPG4tP3gZHYoyhvADCtrDMiaYb7Qd','bRo4FEeqqxY7nWFANsZsuKEWByEgkvz8Qt','bU2XUzckfpdEuQNemKvhPT1gexQ3GG3SC2','r9PGXsejVJb9ZfMf3QVdDEJCzxkd9JLxzL','r9srwX7DEN7Mex3a8oR1mKSqQmLBizoJvi','rFLUohPG4tP3gZHYoyhvADCtrDMiaYb7Qd'].includes(address.address)" alt="" src="../../lbryinc.png" width="12px">
          </td>
          <td>{{Math.round(address.balance)}} <span style="font-weight: 500;"> LBC</span></td>
          <td>{{address.first_seen.toString().substring(0,10) +' '+ address.first_seen.toString().substring(11,19)}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
    export default {
        data(){
            return{
                walletData : {

                },
            }
        },
        mounted() {
            // when the Vue app is booted up, this is run automatically.
            var dataUrl= "https://chainquery.lbry.com/api/sql?query=select%20*%20from%20address%20order%20by%20balance%20desc%20limit%20100";
            var self = this; // create a closure to access component in the callback below
            $.getJSON(dataUrl, function(walletData) {
                self.walletData = walletData.data;
            });
        }
    }
</script>

<style scoped lang="scss">

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
</style>
