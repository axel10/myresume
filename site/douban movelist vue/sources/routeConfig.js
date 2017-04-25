var Today = {
    template: `<div id="here">
<h3 v-if="!loading">总共{{total}}部电影</h3>
<div class="panel panel-default" v-for="data in subjects">
    <div class="panel-body">
        <div class="media">
            <div class="media-left">
                <a href="#">
                    <img class="media-object" v-bind:src="data.images.medium" alt="...">
                </a>
            </div>
            <div class="media-body">
                <router-link v-bind:to="'/detail/'+data.id"><h4 class="media-heading">{{data.title}}</h4></router-link>
                导演：<span v-for="cast in data.casts">{{cast.name +'、'}}</span>
            </div>
        </div>
    </div>
</div>
<nav>
    <ul class="pagination"  v-show="!loading">

        <li v-for="(page,index) in pages" v-bind:class="page==activepage?'active':''">
            <a v-bind:href="'#/'+$route.params.category+'/'+page" @click="getData($route.params.category,page)">{{page}}</a>
        </li>
        
        <li v-if="$route.params.page<96 && total>7"><a>…</a></li>
        
        <li v-if="$route.params.page<97 && total>7">
            <a v-bind:href="'#/'+$route.params.category+'/'+total" @click="getData($route.params.category,total)">{{total}}</a>
        </li>
    </ul>
    <input v-model="tiaozhuan" type="text" @keyup="jump($event)" v-if="!loading">
</nav>

<div class="sk-folding-cube" v-if="loading">
    <div class="sk-cube1 sk-cube"></div>
    <div class="sk-cube2 sk-cube"></div>
    <div class="sk-cube4 sk-cube"></div>
    <div class="sk-cube3 sk-cube"></div>
</div>


</div>

`,
    data: function () {
        return {
            subjects: {},
            pages: [],
            that: {},
            loading: true,
            total: '',
            tiaozhuan:'',
        }
    },
    methods: {
        getData: getData,
        jump:function (event) {
            if(event.keyCode == 13){
                getData(that.$route.params.category,that.tiaozhuan);
                window.location.href = '#/'+ that.$route.params.category + '/' + that.tiaozhuan;
            }
        }
    },
    mounted: function () {
        that = this;
        that.getData(that.$route.params.category,that.$route.params.page);
    },

};


var subject = {
    template: `<div>
<div class="jumbotron">
    <h1>{{movie.title}}</h1>
    <img v-bind:src="img" alt="">
    <p>{{movie.summary}}</p>
</div>
</div>`,
    methods: {
        getSubject: function () {
            var sub = this;
            sub.movie = {};
            ajax({
                url: 'http://api.douban.com/v2/movie/subject/' + sub.$route.params.id,
                dataType: 'jsonp',
                success: function (res) {
                    var data = res;
                    sub.movie = data;
                    sub.img = data.images.large;
                }
            })
        }
    },
    data: function () {
        return {
            movie: {},
            img: ''
        }
    },
    mounted: function () {
        this.getSubject();

    }
};


var routes = [{
    path: '/detail/:id',
    component: subject
}, {
    path: '/:category/:page',
    component: Today
}, {
    path: '*',
    redirect: '/in_theaters/1'
}];

var router = new VueRouter({
    routes: routes
});


var that;
var main;
var currentCategory;



function getData(category, page) {
    if (main) {
        main.currentCategory = category;
    }
    currentCategory = that.$route.params.category
    that.loading = true;
    that.subjects = '';
    var category = category || 'in_theaters';
    var page = page || 1;
    if (main) {
        var q = main.search;
    }
    ajax({
        url: 'https://api.douban.com/v2/movie/' + category + '?start=' + (page - 1) * 20,
        data: {q: q},
        dataType: 'jsonp',
        success: function (res) {
            that.loading = false;
            that.pages = [];
            var data = res;
            that.subjects = data.subjects;
            var total = data.total;
            var count = data.count;
            var pages = Math.ceil(total / count);
            if (pages > 100) {
                that.total = 100;
                pages = 100;
            } else {
                that.total = pages;
            }


            if (pages > 7) {
                if (that.$route.params.page > 3) {
                    if (that.$route.params.page >= pages - 3) {
                        for (var i = 6; i >= 0; i--) {
                            that.pages.push(pages - i);
                        }
                    } else {
                        for (var i = -3; i <= 3; i++) {
                            that.pages.push(parseInt(that.$route.params.page) + i);
                        }
                    }

                } else {
                    for (var i = 0; i < 7; i++) {
                        that.pages.push(i + 1);
                    }
                }
            } else {
                for (var i = 0; i < pages; i++) {
                    that.pages.push(i + 1);
                }
            }


            /*            if (pages > 7) {
             for (var i = 0; i < 8; i++) {
             that.pages.push(i + 1);
             }
             that.pages.push('...');
             if (pages > 100) {
             that.pages.push(100)
             } else {
             that.pages.push(pages)
             }
             } else {
             for (var i = 0; i < pages; i++) {
             that.pages.push(i + 1);
             }
             }*/


            /*                                if(i >= 100){
             break
             }*/

            that.activepage = that.$route.params.page;
            that.total = data.total;
            console.log(that.activepage);
        }
    })
}