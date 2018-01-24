<template>
  <div class="page-loadmore">
    <h1 class="page-title">Pull up</h1>

    <div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
      <mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange"       :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" ref="loadmore">
        
        <ul class="page-loadmore-list">
          <li v-for="item in list" class="page-loadmore-listitem">{{ item }}</li>
        </ul>


       <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">
           <!-- <mt-spinner type="snake"></mt-spinner>-->
          </span>
        </div>    


        <div slot="bottom" class="mint-loadmore-bottom">
          <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
          <span v-show="bottomStatus === 'loading'">
          	上拉刷新
            <!--<mt-spinner type="snake"></mt-spinner>-->
          </span>
        </div>
      </mt-loadmore>




    </div>
  </div>
</template>


<script>
	import { Loadmore } from 'mint-ui';
  export default {
    data() {
      return {
        list: [],
        allLoaded: false,


        bottomStatus: '',
        wrapperHeight: 0,



        topStatus: '',
        //wrapperHeight: 0,
        translate: 0,
        moveTranslate: 0



      };
    },

    methods: {
      handleBottomChange(status) {
      	console.log(status);
        this.bottomStatus = status;
      },

      loadBottom() {
      	console.log('上拉');
        setTimeout(() => {
          let lastValue = this.list[this.list.length - 1];
          if (lastValue < 60) {
            for (let i = 1; i <= 10; i++) {
              this.list.push(lastValue + i);
            }
          } else {
            this.allLoaded = true;
          }
          this.$refs.loadmore.onBottomLoaded();
        }, 1500);
      },
    







      handleTopChange(status) {
        this.moveTranslate = 1;
        this.topStatus = status;
      },
      translateChange(translate) {
        const translateNum = +translate;
        this.translate = translateNum.toFixed(2);
        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
      },
      loadTop() {
        setTimeout(() => {
          let firstValue = this.list[0];
          for (let i = 1; i <= 10; i++) {
            this.list.unshift(firstValue - i);
          }
          this.$refs.loadmore.onTopLoaded();
        }, 1500);
      },
    
},




    created() {
      for (let i = 1; i <= 20; i++) {
        this.list.push(i);
      }
    },

    mounted() {
      this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    },
    components:{
    	mtLoadmore: Loadmore
    },
    watch: {
			shop(val,oldval){
				const documentHeight = document.documentElement.clientHeight;
				const wrapperHeight = documentHeight - this.$refs.wrapper.getBoundingClientRect().top;
				const length = val.length / 2 * 100;
				const height = length * 234 / 100;
				const test = 234 * 2;
				const htmlQuer = document.querySelector('html');
				const fontHeght = parseInt(htmlQuer.style.fontSize);
				console.log('height  ' + parseInt(height));
				console.log('documentHeight  ' + parseInt(documentHeight));
				console.log('wrapperHeight  ' + parseInt(wrapperHeight));
				if(parseInt(height) > parseInt(wrapperHeight)){
					this.wrapperHeight = parseInt(test);
				}else{
					this.wrapperHeight = parseInt(wrapperHeight);
				}
				
			}
		}
  };
</script>



<style scoped="">
 


.loading-background, .mint-loadmore-top span {
    -webkit-transition: .2s linear;
    transition: .2s linear
}
.mint-loadmore-top span {
    display: inline-block;
    vertical-align: middle
}

.mint-loadmore-top span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}

.page-loadmore .mint-spinner {
    display: inline-block;
    vertical-align: middle
}

.page-loadmore-desc {
    text-align: center;
    color: #666;
    padding-bottom: 5px
}

.page-loadmore-desc:last-of-type,
.page-loadmore-listitem {
    border-bottom: 1px solid #eee
}

.page-loadmore-listitem {
    height: 50px;
    line-height: 50px;
    text-align: center
}

.page-loadmore-listitem:first-child {
    border-top: 1px solid #eee
}
.page-loadmore-wrapper {
	overflow: scroll;
}
.page-loadmore-wrapper::-webkit-scrollbar{
	  display:none;
	
    
    
}

.mint-loadmore-bottom span {
    display: inline-block;
    -webkit-transition: .2s linear;
    transition: .2s linear;
    vertical-align: middle
}

.mint-loadmore-bottom span.is-rotate {
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg)
}

</style>
