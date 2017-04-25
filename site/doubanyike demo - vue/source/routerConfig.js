var Today = {
    template:`<div>
        <div class="listBox" v-for="post in posts">
    <span v-if="post.column.name!= ''">
        {{post.column.name}}
    </span>
    <div class="cont">
        <h3>
            {{post.title}}
        </h3>
        <div class="minBox" v-if="post.display_style=='10002'">
            <p>
                {{post.abstract}}
            </p>
            <div class="img">
                <img alt="" v-bind:src="post.thumbs[0].small.url">
            </div>
        </div>
        <p v-if="post.display_style=='10001'">
            {{post.abstract}}
        </p>
        <div class="gallery" v-if="post.display_style=='10003'">
            <img alt="" v-bind:src="post.thumbs[0].large.url">
        </div>
    </div>
</div>
    </div>`,
    data:function () {
        return{
            posts:{}
        }
    },
    methods:{
        getData:function () {
            var that = this;

            ajax({
                url: 'api/stream.php',
                success:function (data) {
                    console.log(JSON.parse(data));
                    that.posts = JSON.parse(data).result.posts
                }
            })
        }
    },
    mounted:function () {
        this.getData()
    }
};

var Module = {
    template:`<div>
        <div class="module clearfix">
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
            <div>
                <img src="doubanyike demo - vue/img/module.gif" alt="">
                <h4>
                    热门精选
                </h4>
                <p>
                    每日段子，提神醒脑
                </p>
            </div>
        </div>
    </div>`
};

var routes = [{
    path:'/today',
    component:Today
},{
    path:'/module',
    component:Module
},{
    path:'*',
    redirect:'/today'
}];

var router = new VueRouter({
    routes:routes,


})