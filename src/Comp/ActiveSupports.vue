<template>
  <div>
    <div class="tbl-header" style="border: 3px solid white; width: 80%; margin: 50px auto 0 auto">
      <table cellpadding="0" cellspacing="0" border="0">
        <thead>
        <tr>
          <th>Amount</th>
          <th>Claim ID</th>
          <th>Created At</th>
        </tr>
        </thead>
      </table>
    </div>
    <div class="tbl-content" style="border: 3px solid white; width: 80%; margin: 0 auto">
      <table cellpadding="0" cellspacing="0" border="0">
        <tbody id="table">
        <tr v-for="support in supportData">
          <td>{{support.support_amount.toString().substring(0,10)}}</td>
          <td><a
            v-bind:href="'https://explorer.lbry.com/claims/'+support.supported_claim_id"
            target="_blank" style="color: white; text-decoration: none; line-height: 20px">
            {{support.supported_claim_id.toString().substring(0,20)+ '... '}}
            See this claim on explorer</a></td>
          <td>{{support.modified_at.toString().substring(0,10)}} - {{support.modified_at.toString().substring(11,19)}}</td>
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
                supportData : {
                    support_amount :"",
                    supported_claim_id : "",
                }
            }

        },
        mounted() {
            // when the Vue app is booted up, this is run automatically.
            var dataUrl= "https://chainquery.lbry.com/api/sql?query=select%20*%20from%20support%20order%20by%20support_amount%20desc%20limit%20200";
            var self = this; // create a closure to access component in the callback below
            $.getJSON(dataUrl, function(supportData) {
                self.supportData = supportData.data;
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
