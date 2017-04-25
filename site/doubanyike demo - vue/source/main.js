var app = new Vue({
    el:'.box',
    router:router,
    data:function () {
        return{

        }
    },
    methods:{

    },
    mounted:function () {

    }
});




/*
data:function () {
    return{

    }
},
methods:{
    getData:function () {
        var that = this;
        ajax({
            url: './api/stream.php',
            success:function (data) {
                console.log(JSON.parse(data));
                that.posts = data.result.posts
            }
        })
    }
},
mounted:function () {
    this.getData()
}*/
