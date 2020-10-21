<template>
  <div class="chat">
    <div class="menu">
      <!-- HEADER -->
      <a-row class="chatroom-header">
        <a-col :span="3" class="photo">
          <div class="information">
            <img v-bind:src="urlApi + target.user_image" alt />
          </div>
        </a-col>
        <a-col :span="18" class="details">
          <a-row>
            <a-col :span="18">
              <p class="details-name">
                <b>{{ target.user_nickname }}</b>
              </p>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="18">
              <p class="details-message">online</p>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="3" class="photo">
          <a-icon
            type="appstore"
            class="menu-icon-plus"
            :style="{ fontSize: '27px', color: '#7E98DF' }"
          />
        </a-col>
      </a-row>
    </div>
    <div class="chat-room">
      <p v-if="typing">
        <em>{{ typing.user_nickname }} is typing a message...</em>
      </p>
      <div v-for="(value, index) in getMessages" :key="index">
        <div class="balloon-sender" v-if="checkCurrentUser(value.user)">
          <a-row>
            <a-col :span="6"></a-col>
            <a-col :span="15" class="style-balloon">
              <p class="text-chat">
                <strong>{{ value.user.user_nickname }} : </strong
                >{{ value.message }}
              </p>
            </a-col>
            <a-col :span="2">
              <img
                v-bind:src="urlApi + user.user_image"
                alt=""
                class="image-receiver"
              />
            </a-col>
          </a-row>
        </div>
        <div class="balloon-receiver" v-if="!checkCurrentUser(value.user)">
          <a-row>
            <a-col :span="2">
              <img
                v-bind:src="urlApi + value.user.user_image"
                alt=""
                class="image-receiver"
              />
            </a-col>
            <a-col :span="15" class="style-balloon">
              <p class="text-chat-receiver">
                <strong>{{ value.user.user_nickname }} : </strong
                >{{ value.message }}
              </p>
            </a-col>
            <a-col :span="6"></a-col>
          </a-row>
        </div>
      </div>
    </div>
    <!-- <Footer /> -->
    <div class="menu">
      <!-- HEADER -->
      <a-row>
        <a-col :span="20">
          <div class="components-input-demo-size message-area">
            <a-input
              size="large"
              placeholder="Type a message"
              type="text"
              class="input-message"
              v-model="message"
            />
          </div>
        </a-col>
        <a-col :span="1">
          <a-icon
            type="plus"
            :style="{ fontSize: '25px', color: '#7E98DF' }"
            class="message-send message-add"
          />
        </a-col>
        <a-col :span="1">
          <a-icon
            type="smile"
            :style="{ fontSize: '25px', color: '#7E98DF' }"
            class="message-send message-add"
          />
        </a-col>
        <a-col :span="1">
          <a-icon
            type="arrow-right"
            :style="{ fontSize: '30px', color: '#7E98DF' }"
            class="message-send"
            @click="sendMessage"
          />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapGetters, mapMutations } from 'vuex'

// import Navbar from '../components/chat/Navbar'
// import Footer from '../components/chat/Footer'

export default {
  name: 'Chatroom',
  components: {
    // Navbar
    // Footer
  },
  data() {
    return {
      urlApi: process.env.VUE_APP_URL,
      socket: io('http://localhost:3001'),
      user: { user_nickname: '' },
      target: { user_id: '1' },
      room: 'arqi',
      message: '',
      typing: false,
      tempmessages: []
    }
  },
  computed: {
    ...mapGetters(['userData', 'getTarget', 'getMessages'])
  },
  created() {
    this.initializeUser()
  },
  watch: {
    message(value) {
      value
        ? this.socket.emit('typing', this.user)
        : this.socket.emit('typing', false)
    }
  },
  mounted() {
    // this.socket.emit('welcomeMessage', {
    //   user: this.user,
    //   room: this.room
    // })
    // this.socket.emit('startChat', {
    //   user: this.user,
    //   target: this.target
    // })
    this.socket.on('chatMessage', (data) => {
      this.tempmessages.push(data)
      console.log(data)
      this.setMessages(this.tempmessages)
      console.log(this.tempmessages)
    })
    this.socket.on('typingMessage', (data) => {
      this.typing = data
    })
  },
  methods: {
    ...mapMutations(['setMessages']),
    initializeUser() {
      this.user = this.userData
      this.target = this.getTarget
      this.tempmessages = this.getMessages
    },
    checkCurrentUser(user) {
      // console.log(this.user.user_id === user.user_id)
      return this.user.user_id === user.user_id
    },
    sendMessage() {
      // const setData = {
      //   username: this.username,
      //   message: this.message
      // }
      // this.socket.emit('globalMessage', setData)
      // this.socket.emit('privateMessage', setData)
      // this.socket.emit('broadcastMessage', setData)
      this.tempmessages = []
      console.log(this.user.user_id + '-' + this.target.user_id)
      const setData = {
        user: this.user,
        target: this.target,
        message: this.message
      }
      this.socket.emit('postMessage', setData)
      this.message = ''
      this.socket.emit('getMessage', {
        user: this.user,
        target: this.target
      })
    }
  }
}
</script>

<style scoped>
.chat-room {
  overflow-y: scroll;
}

.chat-room::-webkit-scrollbar {
  display: none;
}

.chat {
  height: 629px;
}

.chat-room {
  height: 450px;
  padding: 30px;
  background-color: gainsboro;
}

.chatroom-header {
  background-color: #ededed;
}

.balloon-sender {
  margin: 10px 0;
}

.balloon-receiver {
  margin: 10px 0;
}

.image-receiver {
  width: 54px;
  height: 54px;
  left: 404px;
  top: 209px;

  border-radius: 20px;
}

.text-chat {
  text-align: left;
  padding: 0 20px;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 250%;
  /* or 28px */

  letter-spacing: -0.165px;

  color: #7e98df;
  background: #ffffff;
  border-radius: 35px 10px 35px 35px;
}

.text-chat-receiver {
  text-align: left;
  padding: 0 20px;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 250%;
  /* or 28px */

  letter-spacing: -0.165px;

  color: #ffffff;
  background: #7e98df;
  border-radius: 10px 35px 35px 25px;
}

.style-balloon {
  margin-top: 10px;
}

.header-logo p {
  width: 128px;
  height: 34px;
  padding-top: 20px;
  padding-left: 30px;

  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 29px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.165px;

  color: #7e98df;
}

/* .header-menu {
  background-color: mediumslateblue;
} */

.menu {
  background-color: #ffffff;
}

.menu-icon {
  padding-top: 20px;

  border-radius: 20px;
}

.menu-icon-plus {
  padding-top: 24px;
}

.details-name {
  margin-top: 10px;
  margin-bottom: 5px;
}

.information {
  margin-bottom: 10px;
}

.input-message {
  margin: 10px 0;
  padding: 20px 0 20px 20px 20px;
  border-radius: 15px;
}

.message-area {
  border-radius: 15px 15px 0 0;
  padding: 15px 0 15px 30px;
  background-color: white;
}

.message-send {
  padding-top: 35px;
}

.message-send:hover {
  cursor: pointer;
}

@media only screen and (max-width: 766px) {
  .image-receiver {
    display: none;
  }

  .message-add {
    display: none;
  }

  .details-name {
    text-align: center;
  }

  .details-message {
    text-align: center;
  }
}

@media only screen and (max-width: 1023px) {
  .details-name {
    margin-left: 20px;
  }

  .details-message {
    margin-left: 20px;
  }

  .message-send {
    font-size: 20px;
  }

  .style-balloon {
    margin-left: 15px;
  }
}
</style>
