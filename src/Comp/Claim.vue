<template>
<div style="display: flex; flex-direction: column" @scroll="scroll">
  <div class="stats" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-evenly; margin-top: 50px">
    <div class="gradient-border" style="animation-delay: 0.2s">
      <p class="gradient-border">Total Claims : {{claimStats.total_claims}}</p>
    </div>
    <div class="gradient-border">
      <p>New Claims 30D : {{claimStats.new_claims_30_days}}</p>
    </div>
    <div class="gradient-border">
      <p>New Claims 7D : {{claimStats.new_claims_7_days}}</p>
    </div>
    <div class="gradient-border">
      <p>New Claims 24H : {{claimStats.new_claims_24_hours}}</p>
    </div>
    <div class="gradient-border">
      <p>New Claims 1H : {{claimStats.new_claims_1_hour}}</p>
    </div>
  </div>
  <ul class="claim-list" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-evenly; margin-top: 20px">
    <li class="claim" style="width: 300px; min-height: 600px;margin-top: 10px;flex-basis: 25%; display: flex; flex-direction: column; align-items: center; justify-content: space-evenly; align-self: center; align-content: space-evenly; justify-self: center"
        v-for="claim in claimData.slice(0, maxClaimShown)" v-if="claim.bid_state='Active'" v-show="claim.is_nsfw==0">
      <p v-show="claim.content_type > !null">{{claim.content_type}}</p>
      <a :href="'lbry://'+ claim.name + '#' + claim.claim_id" target="_blank">
        <img style="align-self: center; width: 320px; height: 200px; background-position: center; background-size: cover; background-repeat: no-repeat;"
             v-bind:style="claim.thumbnail_url.length > 0 ? {backgroundImage: 'url(' + claim.thumbnail_url + ')'} : {backgroundImage: 'url(' + '../defaultThumbnail.jpg' + ')'}">
      </a>
      <h2
        style="font-size: 18px; font-family: Roboto,sans-serif; color:white; align-self: center; justify-self: flex-start; font-weight: 600; margin-top: 15px; width: 90%; margin-right: auto; margin-left: auto; text-align: center">{{claim.title.toString().substring(0,50) + '...' }}</h2>
      <span
        style="text-align: center; align-self: center; justify-self: center; font-size: 17px; width: 90%; color: white; font-family: 'roboto', sans-serif; font-weight: 500; margin: 20px 0; line-height: 18px;">
        Description: <span style="text-align: center; font-size: 15px; color: white; align-self: center;justify-self: center; font-family: 'roboto', sans-serif; font-weight: 400; margin: 20px 0; line-height: 18px;">
        {{claim.description.length > 0 ? claim.description.substring(0,200) + ' ... ' : 'No description.'}}</span></span>
      <p
        style="text-align: center; font-size: 15px; font-weight: 500; color: white; align-self: center;justify-self: center; font-family: 'roboto', sans-serif; width: 100%">Created at:
        {{claim.created_at.toString().substring(0,10) + '-' + claim.created_at.substring(11,19)}}</p>
      <a target="_blank"
        class="link"
        :href="'lbry://'+ claim.name + '#' + claim.claim_id"
        style=" display: flex; flex-direction:column;margin: 10px 0; text-decoration: none; color: white; font-family: Roboto,sans-serif; justify-self: center;important; width: 100%; font-size: 14px; align-self: center; text-align: center">Claim Link:<br>
        <span
          style="font-size: 10px; text-align: center; align-self: center; margin: 5px 0 15px 0">
          {{'lbry://'+ claim.name + '#' + claim.claim_id.substring(0,20)+ '...'}}</span>
        <hr
          style="width: 20%; align-self: center; justify-self: center; margin: 0 auto;"></a>
      <a  target="_blank"
          v-show="claim.thumbnail_url.length > 0"
         :href="claim.thumbnail_url.length == 0 ? '' : claim.thumbnail_url"
         style="margin: 5px 0 10px 0; text-decoration: none; color: white; font-family: Roboto,sans-serif; justify-self: flex-start!important; width: 100%; font-size: 14px; align-self: center; text-align: center">{{claim.thumbnail_url.length == 0 ? "Thumbnail not found" : 'Thumbnail:' +" "+ claim.thumbnail_url.substring(0,35)+ '...'}}</a>
      <a target="_blank"
        @click.prevent=""
        v-if="claim.thumbnail_url.length == 0"
        style="margin: 10px 0; text-decoration: none; color: white;font-weight: 400; font-family: Roboto,sans-serif; justify-self: flex-start!important; width: 100%; font-size: 14px; align-self: center; text-align: center">Thumbnail is not found</a>
      <p
        v-show="claim.source_media_type != undefined" style="margin: 10px 0; text-decoration: none; color: white;font-weight: 400; font-family: Roboto,sans-serif; justify-self: flex-start!important; width: 100%; font-size: 14px; align-self: center; text-align: center">Content Type : {{claim.source_media_type }} </p>
    </li>
  </ul>
</div>
</template>

<script>
    export default {
        data : function () {
            return{
                claimData : [],
                claimJsonLink : "https://chainquery.lbry.com/api/sql?query=select%20*%20from%20claim%20order%20by%20id%20desc%20limit%20",
                maxClaimShown : 12,
                maxChar : 150,
                claimStats : "",
            }
        },
        methods: {
            reRender : function(){
              vm.$forceUpdate()
            },
            scroll () {
                window.onscroll = () => {
                    let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
                    if (bottomOfWindow) {
                        this.maxClaimShown = this.maxClaimShown+6;
                        this.reRender()
                        this.maxClaimReach
                    }
                }
            },
        },
        computed : {
            maxClaimReach () {
                if(this.maxClaimShown > 200){
                    var answer = confirm("Max claim reached. Please refresh page to see recent claims");
                    if (answer){
                        location.reload()
                    }
                    else{
                        alert("Tesekkur ederiz")
                    }
                }
            }
        },
        watch: {
            maxClaimShown(value) {
                this.maxClaimShown = value
            }
        },
        mounted() {
            // when the Vue app is booted up, this is run automatically.
            var dataUrl = this.claimJsonLink+200;
            var self = this; // create a closure to access component in the callback below
            $.getJSON(dataUrl, function(claimData) {
                self.claimData = claimData.data;
                self.claimData.bid_state = claimData.data.bid_state;
            });
            // when the Vue app is booted up, this is run automatically.
            var claimStats = "https://brendonbrewer.com/lbrynomics/claims_stats.json";
            $.getJSON(claimStats, function(claimStats) {
                self.claimStats = claimStats;
            });
            this.scroll()

        },
    }
</script>

<style scoped lang="scss">
  @import url("https://raw.github.com/daneden/animate.css/master/animate.css");

  ul li {
    border: 1px solid #fff;
    padding: 40px 0;
    margin-top: 50px!important;
    position: relative;
    background: #2f9176;
    overflow: hidden;
    transition: 300ms;
    &:hover{
      box-shadow: 1px 4px 6px rgba(0,0,0,0.7);
    ;
    }
    a{

    }

    img {
      transition: 200ms;
      box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);

      &:hover {
        transform: scale(1.025);
        box-shadow: 1px 6px 12px rgba(0, 0, 0, 0.5);
        animation: flip;
      }
    }
  }
  .link{
    width: 50% !important;
    align-self: center;
    text-align: center;
  }


    @media only screen and (max-width: 768px) {
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
    thead tr th:nth-child(4){
      display: none;
    }
    tbody tr td:nth-child(4) {
      display: none;
    }
    .claim-list{
      display: flex;
      flex-wrap: wrap;
      li{
        flex-basis: 50% !important;
        p{
          width: 50%;
          font-size: 14px!important;

        }
        a span{
          width: 50%;
        }
        span{
          font-size: 14px!important;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    .claim-list{
      display: flex;
      flex-wrap: wrap;
      li{
        flex-basis: 95% !important;
        p{
          width: 100%;
          font-size: 14px!important;
        }
        a{}
        a span{
          width: 100%;
          align-self: flex-start!important;
        }
        span{
          font-size: 14px!important;

        }
      }
    }
  }

  .stats{
    div{
      flex-direction: row;
      align-items: center;
      justify-content: center!important;
      margin: 20px 10px;
    }
    p{
      font-family: "Roboto", sans-serif;
      font-size: 18px;
      text-transform: uppercase;
      color: white;
      font-weight: 400;
    }
  }
  .gradient-border {
    --borderWidth: 3px;
    position: relative;
    background: transparent;
    border-radius: var(--borderWidth);
  }
  .gradient-border:after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(60deg, #2f9176, #2f5176, #2f9176, #2f5176, #2f9176, #2f5176, #2f9176, #2f5176);
    border-radius: 2px;
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    background-size: 300% 300%;
  }
  .gradient-border:nth-child(2):after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(60deg, #2f9176, #2f5176, #2f9176, #2f5176, #2f9176, #2f5176, #2f9176, #2f5176);
    border-radius: 2px;
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    animation-delay: 0.25s;
    background-size: 300% 300%;
  }
  .gradient-border:nth-child(3):after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(60deg, #2f9176, #2f5176, #2f9176, #2f5176, #2f9176, #2f5176, #2f9176, #2f5176);
    border-radius: 2px;
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    animation-delay: 0.50s;
    background-size: 300% 300%;
  }
  .gradient-border:nth-child(4):after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(60deg, #2f9176, #2f5176, #2f9176, #2f5176, #2f9176, #2f5176, #2f9176, #2f5176);
    border-radius: 2px;
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    animation-delay: 0.75s;
    background-size: 300% 300%;
  }
  .gradient-border:nth-child(5):after {
    content: '';
    position: absolute;
    top: calc(-1 * var(--borderWidth));
    left: calc(-1 * var(--borderWidth));
    height: calc(100% + var(--borderWidth) * 2);
    width: calc(100% + var(--borderWidth) * 2);
    background: linear-gradient(60deg, #2f9176, #2f5176, #2f9176, #2f5176, #2f9176, #2f5176, #2f9176, #2f5176);
    border-radius: 2px;
    z-index: -1;
    animation: animatedgradient 3s ease alternate infinite;
    animation-delay: 1s;
    background-size: 300% 300%;
  }


  @keyframes animatedgradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .animated{
    animation: heartBeat 1s infinite!important;
    animation-delay: 1s!important;
  }

  @keyframes heartBeat {
    0%{
      transform: scale(2);
    }
    14%{

    }
    28%{

    }
    56%{

    }
    80%{

    }
    100%{
      transform: scale(1);
    }
  }



</style>
