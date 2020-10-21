<template>
  <div class="home">
    <a-row>
      <a-col :span="7" class="app-menu">
        <Menu class="main-menu" />
        <!-- <div style="width: 146px">
          <a-button
            type="primary"
            style="margin-bottom: 16px"
            @click="toggleCollapsed"
          >
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
          </a-button>
          <a-menu
            :default-selected-keys="['1']"
            :default-open-keys="['sub1']"
            mode="inline"
            theme="dark"
            :inline-collapsed="collapsed"
          >
            <a-menu-item key="1">
              <p>a</p>
            </a-menu-item>
          </a-menu>
        </div> -->
      </a-col>
      <a-col :span="17" class="app-chat">
        <div v-show="showChat">
          <Chat class="empty-chat-container" />
        </div>
        <div class="chat-container" v-show="showChatroom">
          <Chatroom />
        </div>
        <div class="chat-container" v-show="showContact">
          <Contact />
        </div>
        <div class="chat-container" v-show="showInvite">
          <Invite />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Menu from './Menu'
import Chat from './Chat'
import Chatroom from './Chatroom'
import Contact from './Contact'
import Invite from './Invite'

import { mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      collapsed: false
    }
  },
  components: {
    Menu,
    Chat,
    Chatroom,
    Contact,
    Invite
  },
  computed: {
    ...mapGetters({
      showChat: 'getShowChat',
      showChatroom: 'getShowChatroom',
      showContact: 'getShowContact',
      showInvite: 'getShowInvite'
    })
  },
  methods: {
    contact() {
      this.showChatroom = false
      this.showContact = true
    },
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap%27');

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.body-app {
  background-color: #fafafa;
}

.app-menu {
  border-right: solid 1px #e5e5e5;
  height: 625px;

  overflow-y: scroll;
}

.app-menu::-webkit-scrollbar {
  display: none;
}

.chat-sign {
  display: flex;
  justify-content: center;
  align-items: center;
}

.empty-chat-container {
  margin-top: 300px;
}

/* .app-menu {
  background-color: lightgreen;
} */
</style>
