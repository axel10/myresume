var app = new Vue({
    el:'#douban',
    router:router,
    data:function () {
        return {
            currentCategory:currentCategory,
            search:''
        }
    },
    methods:{
        getData: getData,
        getSearch:function (event) {
        if(event.keyCode == 13){
            window.location.href = '#/search/1'
            this.getData('search')
        }
    }},
    mounted:function () {
        main = this;
        this.currentCategory = currentCategory
    }
})
