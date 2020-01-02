<template>
  <div id="app" style="" @mouseenter="mountData">
    <header>
      <div class="bg"></div>
      <div style="margin: 0 auto;">
        <div style="display: flex">
          <svg width="150" height="150" viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 50px auto 0; text-align: center; animation: scale 5s infinite">
            <path d="M125 250C194.036 250 250 194.036 250 125C250 55.9644 194.036 0 125 0C55.9644 0 0 55.9644 0 125C0 194.036 55.9644 250 125 250Z" fill="#006149"/>
            <path d="M188.875 134.25L182.648 132.695L184.539 125.117L203.953 129.969L199.109 149.383L191.523 147.492L193.203 140.758L123.891 183.672L47.0234 145.266V115.953L126.898 66L200.141 101.727V113.789L123.898 161.156L67.2812 133.086L70.75 126.086L123.477 152.227L192.328 109.445V106.609L127.367 74.9219L54.8437 120.281V140.437L123.492 174.734L188.875 134.25Z" fill="white"/>
          </svg>
        </div>
      </div>
      <div class="buttons" style="width: 100%; margin: 0 auto; margin-top: 50px">
        <a @click.prevent>
          <figure @click.prevent="activePage = 1">
          <div>
            <span style="font-size: 16px">Youtube Sync Stats</span>
            <span style="font-size: 16px">Youtube Sync Stats</span>
          </div>
        </figure>
        </a>

        <a @click.prevent>
          <figure @click.prevent="activePage = 2">
            <div>
              <span style="font-size: 16px">Blockchain Explorer</span>
              <span style="font-size: 16px">Blockchain Explorer</span>
            </div>
          </figure>
        </a>
        <a @click.prevent>
          <figure @click.prevent="activePage = 3">
            <div>
              <span style="font-size: 16px">Latest Claims</span>
              <span style="font-size: 16px">Latest Claims</span>
            </div>
          </figure>
        </a>

        <a @click.prevent>
          <figure @click.prevent="activePage = 4">
          <div>
            <span style="font-size: 16px">Whale Hunter</span>
            <span style="font-size: 16px">Latest 2000 TX</span>
          </div>
        </figure>
        </a>

        <a @click.prevent>
          <figure @click.prevent="activePage = 5">
            <div>
              <span style="font-size: 16px">Biggest Supports</span>
              <span style="font-size: 16px">of LBRY History</span>
            </div>
          </figure>
        </a>

        <a @click.prevent>
          <figure @click.prevent="activePage = 6">
            <div>
              <span style="font-size: 16px">RichList</span>
              <span style="font-size: 16px">Top 100</span>
            </div>
          </figure>
        </a>

        <a v-bind:href="'https://www.lbry.social/lbrynomics'" target="_blank">
          <figure>
          <div>
            <span style="font-size: 16px">More Stats</span>
            <span style="font-size: 16px; text-align: center; text-decoration: none; padding-right: 10px">on <img src="../lbrysocial.png" alt="" style="width: 25px; position: absolute; right:20px; top: 12px">LBRYnomics </span>
          </div>
        </figure>
        </a>
      </div>
    </header>

      <transition name="section1"  enter-active-class="fadeIn"  leave-active-class="fadeOut" leave-to-class="fadeIn">
        <div style="min-height: 500px;" v-if="activePage == 1" key="Youtube">
          <h3 style="font-size: 24px; text-align: center; margin-top: 50px; color: rgba(255,255,255,0.95)">LBRY - Youtube Sync Status</h3>
          <table class="table-fill" style="margin-top: 50px" @mouseover="mountData">
            <thead>
            <tr>
              <th class="text-left">Status</th>
              <th class="text-left"><p class="redFont" :class="{greenFont: syncData.success}">{{ syncStatus }}</p></th>
            </tr>
            </thead>
            <tbody class="table-hover">
            <tr>
              <td class="text-left">New channels in queue to sync</td>
              <td class="text-left">{{syncData.data.NewPending}}  </td>
            </tr>
            <tr>
              <td class="text-left">Channels with new videos awaiting sync</td>
              <td class="text-left">{{syncData.data.PendingUpdate}}</td>
            </tr>
            <tr>
              <td class="text-left">Needs rerun</td>
              <td class="text-left">{{syncData.data.PendingUpgrade}}</td>
            </tr>
            <tr>
              <td class="text-left">Needs manual intervention</td>
              <td class="text-left">{{syncData.data.Failed}}</td>
            </tr>
            <tr>
              <td class="text-left">General Status</td>
              <td class="text-left" style="font-weight: 500" :class="{ bgRed: syncData.data.GeneralStatusHalted }">{{syncData.data.GeneralStatus}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </transition>

      <transition name="section2"  enter-active-class="fadeIn" leave-active-class="fadeOut" leave-class="" leave-to-class="fadeIn">
        <div style="min-height: 500px;" v-if="activePage == 2" key="Blocks">
          <appBlocks>

          </appBlocks>
        </div>
      </transition>
      <transition name="section3"  enter-active-class="fadeIn" leave-active-class="fadeOut" leave-class="" leave-to-class="fadeIn">
        <div style="min-height: 500px;" v-if="activePage == 3" key="Claims">
          <appClaim>

          </appClaim>
        </div>
      </transition>
    <transition name="section4"  enter-active-class="fadeIn" leave-active-class="fadeOut" leave-class="" leave-to-class="fadeIn">
      <div style="min-height: 500px;" v-if="activePage == 4" key="Lbrynomics">
        <appWhale>

        </appWhale>
      </div>
    </transition>


    <transition name="section5"  enter-active-class="fadeIn" leave-active-class="fadeOut" leave-class="" leave-to-class="fadeIn">
      <div style="min-height: 500px;" v-if="activePage == 5" key="BiggestSupports">
        <appBiggestSupports>

        </appBiggestSupports>
      </div>
    </transition>

    <transition name="section6"  enter-active-class="fadeIn" leave-active-class="fadeOut" leave-class="" leave-to-class="fadeIn">
      <div style="min-height: 500px;" v-if="activePage == 6" key="RichList">
        <appRichList>

        </appRichList>
      </div>
    </transition>














    <transition name="partners">
      <div style=" margin: 25px 0; display: flex; align-items:center; flex-direction: column" key="Partners" class="partners">
        <h1 style="font-size: 24px; text-align: center; margin: 50px; color: rgba(255,255,255,0.95); font-family: Roboto, sans-serif;"> Partners and Supporters</h1>
        <div style="width: 50%; display: flex; align-items: center; justify-content: center; margin: 25px 0;">
          <div style="display: flex; align-items: center; justify-content: space-evenly; flex-wrap: wrap; align-self: center">
            <a href="https://www.lbry.com" target="_blank"><img src="lbry.png" height="100" width="100" alt="lbry" /></a>
            <a href="https://www.lbry.social" target="_blank"><img src="lbrysocial.png" height="100" width="100" alt="lbry social" /></a>
            <a href="https://www.lbryturkey.com" target="_blank"><img src="lbryturkey.png" height="100" width="100" alt="lbry turkey" /></a>
          </div>
        </div>
      </div>
    </transition>
      <footer style="text-align: center; margin: 25px">
        <a href="https://www.lbry.com" style="color: white; font-weight: 500; font-family: Roboto, helvetica, arial, sans-serif; text-decoration: none">LBRY.com</a>
        <hr style="width: 25%; border-color: black; margin: 10px auto;">
        <a href="https://www.lbryturkey.com" style="color: white ;font-weight: 500; font-family: Roboto, helvetica, arial, sans-serif;text-decoration: none">LBRYTurkey.com</a>
      </footer>
  </div>

</template>

<script>
    import Claim from "./Comp/Claim";
    import Blocks from "./Comp/Blocks";
    import WhaleHunter from "./Comp/WhaleHunter";
    import ActiveSupports from "./Comp/ActiveSupports"
    import Richlist from "./Comp/Richlist"
    export default {
        components: {
            appBlocks : Blocks,
            appClaim: Claim,
            appWhale: WhaleHunter,
            appBiggestSupports: ActiveSupports,
            appRichList : Richlist
        },
            data(){
            return{
                activePage : "1",
                syncStatus : "",
                syncData:{
                    success : null,
                    data : {
                        NewPending : "",
                        PendingUpdate : "",
                        PendingUpgrade : "",
                        Failed : "",
                        GeneralStatus : "",
                        GeneralStatusHalted : false
                    }

            }
            }
        },
        computed: {

        },
        methods : {
                cons : function(){},
            syncStatusGet : function () {
                if (this.syncData.success = true){
                    this.syncStatus = "Active"
                }
                else{
                    this.syncStatus = "Down"
                }
            },
            updateData : function () {
                setInterval(function () {
                    this.mounted()
                },2000)
            },
            getData : function () {
                var dataUrl= "https://api.lbry.com/yt/queue_status"
                var self = this // create a closure to access component in the callback below
                $.getJSON(dataUrl, function(data) {
                    self.syncData = data;
                });
                if (this.syncData.data.GeneralStatus === "heavily loaded / halted"){
                    this.syncData.data.GeneralStatusHalted = true
                }
                else{
                    this.syncData.data.GeneralStatusHalted = false
                }},
            mountData : function () {
                this.getData()
            },
            getStatus : function () {

            }
        },
        mounted() {
            this.syncStatusGet()
// when the Vue app is booted up, this is run automatically.
            var dataUrl= "https://api.lbry.com/yt/queue_status"
            var self = this // create a closure to access component in the callback below
            $.getJSON(dataUrl, function(data) {
                self.syncData = data;
            });
              if (this.syncData.data.GeneralStatus === "heavily loaded / halted"){
                  this.syncData.data.GeneralStatusHalted = true
              }
              else{
                  this.syncData.data.GeneralStatusHalted = false
              }
            },
    }
</script>

<style lang="scss" scoped>
  @import url(https://fonts.googleapis.com/css?family=Roboto:400,500,700,300,100);

      div {
          img{
          border-radius: 50%;
            margin-left: 25px;
        }
      }

  figure{
    span{
      font-weight: 600;
    }
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
    overflow-x: hidden;
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
    background: none;
    min-height: 100vh;
  }

  div.table-title {
    display: block;
    margin: auto;
    max-width: 600px;
    padding:5px;
    width: 100%;
  }

  .table-title h3 {
    color: #fafafa;
    font-size: 30px;
    font-weight: 400;
    font-style:normal;
    font-family: "Roboto", helvetica, arial, sans-serif;
    text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    text-transform:uppercase;
  }


  /*** Table Styles **/

  .table-fill {
     background: white;
     border-radius:3px;
     border-collapse: collapse;
     height: 320px;
     margin: auto;
     max-width: 600px;
     padding:5px;
     width: 100%;
     box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
     animation: float 5s infinite;
   }

  th {
    color:#D5DDE5;;
    background:#1b1e24;
    border-bottom:4px solid #9ea7af;
    border-right: 1px solid #343a45;
    font-size:23px;
    font-weight: 100;
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

  tr {
    border-top: 1px solid #C1C3D1;
    border-bottom-: 1px solid #C1C3D1;
    color:#666B85;
    font-size:16px;
    font-weight:normal;
    text-shadow: 0 1px 1px rgba(256, 256, 256, 0.1);
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
    font-size:18px;
    text-shadow: -1px -1px 1px rgba(0, 0, 0, 0.1);
    border-right: 1px solid #C1C3D1;
  }

  td:last-child {
    border-right: 0px;
  }

  th.text-left {
    text-align: left;
  }

  th.text-center {
    text-align: center;
  }

  th.text-right {
    text-align: right;
  }

  td.text-left {
    text-align: left;
  }

  td.text-center {
    text-align: center;
  }

  td.text-right {
    text-align: right;
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
  .buttons{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    overflow: hidden;
  }
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
  $color:#2f9176;

  figure{width:200px;height:60px;cursor:pointer;perspective:500px;-webkit-perspective:500px;}
  figure div{height:100%;transform-style:preserve-3d;-webkit-transform-style:preserve-3d;transition:0.25s;-webkit-transition:0.25s;}
  figure:hover div{transform:rotateX(-90deg);}
  span{width:100%;height:100%;position:absolute;box-sizing:border-box;border:5px solid #fff;font-family:'Source Sans Pro',sans-serif;line-height:50px;font-size:17pt;text-align:center;text-transform:uppercase;}
  span:nth-child(1){color:#fff;transform: translate3d(0, 0, 30px);-webkit-transform: translate3d(0, 0, 30px);}
  span:nth-child(2){color:$color;background:#fff;transform: rotateX(90deg) translate3d(0, 0, 30px);-webkit-transform: rotateX(90deg) translate3d(0, 0, 30px);}

  body{background:$color;position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);margin:0;}


  @media only screen and (max-width: 1024px) {
    figure{
      flex-basis: 50%;
      transform: scale(0.75);
    }
  }

  @media only screen and (max-width: 768px) {
    .buttons{
      display: flex;
      flex-wrap: wrap;
      figure{
        flex-basis: 75%;
        transform: scale(0.75);
      }
    }
  }
  @media only screen and (max-width: 426px) {
    .partners{
      margin-top: 0!important;
      h1{
        margin: 0!important;
      }
      div{
        div{
          a{
            margin-top: 20px;
          }
        }
      }
    }

    .buttons{
      a{
        margin-top: 20px;
      }
    }


    .table-fill {
      background: white;
      border-radius:3px;
      border-collapse: collapse;
      height: 320px;
      margin: auto;
      max-width: 600px;
      padding:5px;
      width: 90%;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
      animation: float 5s infinite;
    }
    th{
      padding: 15px;
    }
    figure{
      transform: scale(0.75) !important;
      div{
        span{
          font-size: 12px!important;
          border-width: 3px;
        }
      }
    }
  }
  @media only screen and (max-width: 426px) {
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
    th, p{
      font-size: 15px;
      font-weight: 600!important;
    }
    thead tr th:nth-child(4){
      display: none;
    }
    tbody tr td:nth-child(4) {
      display: none;
    }
    .buttons{
      margin-top: 50px!important;
      display: flex;
      flex-wrap: wrap;
      figure{
        flex-basis: 50%;
        transform: scale(.9) !important;
      }
    }
  }


</style>
