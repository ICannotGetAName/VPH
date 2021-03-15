<template>
<div id="top">
    <div id="header" class="flex">
        <h1>虚拟宠物医院</h1>
    </div>

    <div id="section" style="text-align: center;" class="flex">
        <transition name="slide-fade">
            <div id="buttons">
                <button id="login" class="login_button" style="vertical-align: middle"  @click="showLogin()"><span>
                    登录
                </span></button>

                <button id="register" class="login_button" style="vertical-align: middle"  @click="showRegister()"><span>
                    注册
                </span></button>
            </div>
        </transition>

        <div id="login_input_div" style="text-align: left; vertical-align" hidden="true">
            帐号： <br />
            <input id="login_account_input" type="text">
            <br /><br />
            密码： <br />
            <input id="login_password_input" type="password">
            <br /><br />

            <div style="text-align: center; horizontal-align" class="horizontal fullwidth">
                <div style="text-align: left" class="horizontal halfwidth">
                    <el-button icon="el-icon-arrow-left" circle @click="showMain()"></el-button>
                </div>
                <div style="text-align: right" class="horizontal halfwidth">
                    <el-button icon="el-icon-arrow-right" circle @click="TODO_LOGIN()"></el-button>
                </div>
            </div>
        </div>

        <div id="register_input_div" style="text-align: left; vertical-align" hidden="true">
            帐号： <br />
            <input id="regis_account_input" type="text">
            <br /><br />
            密码： <br />
            <input id="regis_password_input" type="password">
            <br /><br />
            确认密码： <br />
            <input id="regis_secpassword_input" type="password">
            <br /><br />

            <div style="text-align: center; horizontal-align" class="horizontal fullwidth">
                <div style="text-align: left" class="horizontal halfwidth">
                    <el-button icon="el-icon-arrow-left" circle @click="showMain()"></el-button>
                </div>
                <div style="text-align: right" class="horizontal halfwidth">
                    <el-button icon="el-icon-arrow-right" circle @click="TODO_REGISTER()"></el-button>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {hex_sha256} from '../../static/js/sha.js'
export default {
  name: 'HelloWorld',
  data() {
    return {
    }
  },
  methods: {
        TODO_LOGIN: function() {
            var account = document.getElementById("login_account_input").value;
            var password = document.getElementById("login_password_input").value; 
            var hashed_pwd = hex_sha256(password);
            
            // TODO: 删除下面的alert 更改条件判断 加入帐号密码查询
            alert("Sending Request for account: " + account + ", hashed password: " + hashed_pwd);
            if (true) {
                this.$router.push({ path:'/function_page' });
            } else {
                alert("帐号或密码错误");
            }
        },

        TODO_REGISTER: function() {
            var account = document.getElementById("regis_account_input").value;
            var password1 = document.getElementById("regis_password_input").value; 
            var password2 = document.getElementById("regis_secpassword_input").value; 
            if (password1 == password2) {
                var hashed_pwd = hex_sha256(password1);
                alert("Sending Request for new account: " + account + ", hashed password: " + hashed_pwd);
            } else {
                alert("两次密码不匹配");
            }
        },

        showLogin: function() {
            var b = document.getElementById("buttons");
            b.hidden = true;
            var input_div = document.getElementById("login_input_div");
            input_div.hidden = false;
        },

        showRegister: function() {
            var b = document.getElementById("buttons");
            b.hidden = true;
            var register_div = document.getElementById("register_input_div");
            register_div.hidden = false;
        },

        showMain: function() {
            var b = document.getElementById("buttons");
            b.hidden = false;
            var input_div = document.getElementById("login_input_div");
            var register_div = document.getElementById("register_input_div");
            input_div.hidden = true;
            register_div.hidden = true;
        }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>

.login_button {
    display: inline-block;
    border-radius: 4px;
    background-color: #f4511e;
    border: none;
    color: #FFFFFF;
    text-align: center;
    font-size: 28px;
    padding: 20px;
    width: 200px;
    transition: all 0.5s;
    cursor: pointer;
    margin: 5px;
}

.login_button span {
    cursor: pointer;
    display: inline-block;
    position: relative;
    transition: 0.5s;
}

.login_button span:after {
    content: '\00bb';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -20px;
    transition: 0.5s;
}

.login_button:hover span {
    padding-right: 25px;
}

.login_button:hover span:after {
    opacity: 1;
    right: 0;
}

.halfwidth {
    width: 50%;
}

.fullwidth {
    width: 100%;
}
</style>