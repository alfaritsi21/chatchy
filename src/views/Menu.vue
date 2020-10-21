<template>
  <div class="menu">
    <!-- HEADER -->
    <a-row>
      <a-col :span="18" class="header-logo">
        <p>Chatchy</p>
      </a-col>
      <a-col :span="6" class="header-menu">
        <a-dropdown>
          <a-menu slot="overlay" @click="handleMenuClick" class="menu-dropdown">
            <a-menu-item key="1">
              <a-row>
                <a-col :span="4">
                  <a-icon
                    type="setting"
                    :style="{ fontSize: '18px', color: '#ffffff' }"
                  />
                </a-col>
                <a-col :span="20">
                  <p class="text-dropdown">Setting</p>
                </a-col>
              </a-row>
            </a-menu-item>
            <a-menu-item key="2" @click="setShowContact"
              ><a-row>
                <a-col :span="4">
                  <a-icon
                    type="user"
                    :style="{ fontSize: '18px', color: '#ffffff' }"
                  />
                </a-col>
                <a-col :span="20">
                  <p class="text-dropdown">Contact</p>
                </a-col>
              </a-row></a-menu-item
            >
            <a-menu-item key="3"
              ><a-row>
                <a-col :span="4">
                  <a-icon
                    type="phone"
                    :style="{ fontSize: '18px', color: '#ffffff' }"
                  />
                </a-col>
                <a-col :span="20">
                  <p class="text-dropdown">Calls</p>
                </a-col>
              </a-row></a-menu-item
            >
            <a-menu-item key="4">
              <a-row>
                <a-col :span="4">
                  <a-icon
                    type="save"
                    :style="{ fontSize: '18px', color: '#ffffff' }"
                  />
                </a-col>
                <a-col :span="20">
                  <p class="text-dropdown">Save Messages</p>
                </a-col>
              </a-row>
            </a-menu-item>
            <a-menu-item key="5" @click="setShowInvite">
              <a-row>
                <a-col :span="4">
                  <a-icon
                    type="user-add"
                    :style="{ fontSize: '18px', color: '#ffffff' }"
                  />
                </a-col>
                <a-col :span="20">
                  <p class="text-dropdown">Invite Friends</p>
                </a-col>
              </a-row>
            </a-menu-item>
            <a-menu-item key="6">
              <a-row>
                <a-col :span="4">
                  <a-icon
                    type="question-circle"
                    :style="{ fontSize: '18px', color: '#ffffff' }"
                  />
                </a-col>
                <a-col :span="20">
                  <p class="text-dropdown">Chatchy FAQ</p>
                </a-col>
              </a-row>
            </a-menu-item>
            <a-menu-item key="6" @click="handleLogout">
              <a-row>
                <a-col :span="4">
                  <a-icon
                    type="logout"
                    :style="{ fontSize: '18px', color: '#ffffff' }"
                  />
                </a-col>
                <a-col :span="20">
                  <p class="text-dropdown">Logout</p>
                </a-col>
              </a-row>
            </a-menu-item>
          </a-menu>
          <a-icon
            type="align-right"
            class="menu-icon"
            :style="{ fontSize: '23px', color: '#7E98DF' }"
          />
        </a-dropdown>
      </a-col>
    </a-row>

    <!-- SEARCH -->
    <a-row class="search">
      <a-col :span="17" class="header-logo">
        <a-input
          placeholder="search or start new chat"
          size="large"
          @search="onSearch"
          class="search-box"
        />
        <a-icon
          class="email-form"
          slot="prefix"
          type="search"
          style="color: rgba(0, 0, 0, 0.25)"
        />
      </a-col>
      <a-col :span="6" class="header-menu menu-plus">
        <a-icon
          type="plus"
          class="menu-icon-plus"
          :style="{ fontSize: '27px', color: '#7E98DF' }"
        />
      </a-col>
    </a-row>

    <!-- PROFILE  -->

    <div class="profile-container"><Profile /></div>

    <!-- MESSAGE INDICATOR -->
    <a-row class="message-indicator">
      <a-col :span="8" class="indicator" @click="isActive">All</a-col>
      <a-col :span="8" class="indicator" @click="isActive">Important</a-col>
      <a-col :span="8" class="indicator" @click="isActive">Unread</a-col>
    </a-row>
    <div class="card-container">
      <div>
        <Card />
        <div
          class="card"
          v-for="(item, index) in getContactData"
          :key="index"
          @click="targetClick(item)"
        >
          <a-row>
            <a-col :span="8" class="photo">
              <div class="information">
                <img v-bind:src="urlApi + item.user_image" alt />
              </div>
            </a-col>
            <a-col :span="16" class="details">
              <a-row>
                <a-col :span="18">
                  <p class="details-name">
                    <b>{{ item.user_nickname }}</b>
                  </p>
                </a-col>
                <a-col :span="6">
                  <p class="details-time" v-show="false">21:21</p>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="18">
                  <p class="details-message">{{ item.user_phone }}</p>
                </a-col>
                <a-col :span="6">
                  <a-badge
                    v-show="false"
                    count="109"
                    :number-style="{ backgroundColor: '#7E98DF' }"
                  />
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from '../components/Card'
import Profile from '../components/Profile'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'Menu',
  components: {
    Card,
    Profile
  },
  data() {
    return {
      urlApi: process.env.VUE_APP_URL,
      target: { user_id: 0, user_nickname: '', user_image: '' },
      socket: io('http://localhost:3001'),
      user: { user_nickname: '' },
      messages: []
    }
  },
  created() {
    this.initializeUser()
  },
  computed: {
    ...mapGetters(['userData', 'getTarget', 'getContactData'])
  },
  mounted() {
    this.socket.on('chatMessage', (data) => {
      this.messages.push(data)
      this.setMessages(this.messages)
    })
  },
  methods: {
    initializeUser() {
      this.user = this.userData
      this.target = this.getTarget
    },
    ...mapMutations([
      'setShowChat',
      'setShowChatroom',
      'setShowContact',
      'setShowInvite',
      'setMessages'
    ]),
    ...mapActions(['setTargetAction']),
    targetClick(target) {
      console.log(target)
      this.messages = []
      this.target = target
      this.setTargetAction(this.target)
      this.setShowChatroom()
      this.socket.emit('getMessage', {
        user: this.user,
        target: this.target
      })
    },
    onSearch(value) {
      console.log(value)
    },
    ...mapActions({ handleLogout: 'logout' })
  }
}
</script>

<style scoped>
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

.menu-dropdown {
  background: #7e98df;
  border-radius: 10px 35px 35px 35px;
  padding: 10px;
}

.menu {
  background-color: #ffffff;
}

.menu-icon {
  padding-top: 20px;

  border-radius: 20px;
}

.menu-icon:hover {
  cursor: pointer;
}

.menu-icon-plus {
  padding-top: 7px;
  padding-left: 25px;
}

.box {
  height: 120px;
  background-color: limegreen;
}

.search-box {
  margin-left: 25px;
  border-radius: 20px;
}

.ant-input {
  border-radius: 15px !important;
}

.search {
  margin: 15px 0;
}

.indicator {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 50px;
  /* identical to box height */

  text-align: center;
  letter-spacing: -0.165px;

  color: #848484;
  border-radius: 20px;
}

.indicator:hover {
  background-color: #7e98df;
  color: white;
  cursor: pointer;
}

.indicator:active {
  background-color: #7e98df;
  color: white;
  cursor: pointer;
}

.card-container {
  height: 430px;
  overflow-y: scroll;
  /* background-color: red; */
}

.card-container::-webkit-scrollbar {
  display: none;
}

/* .card {
  background-color: orange;
} */

.text-dropdown {
  padding-left: 10px;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: -0.165px;

  color: #ffffff;
}

@media only screen and (max-width: 766px) {
  .header-logo p {
    font-size: 22px;
    margin-top: -5px;
    margin-left: -15px;
  }

  .menu-plus {
    display: none;
  }

  .information img {
    width: 80px;
    height: 80px;
    margin-bottom: -20px;
    text-align: center;
    margin-left: 30px;
  }

  .details-name {
    margin-top: 90px;
    margin-left: -25px;
    font-size: 90%;
    text-align: center;
  }

  .details-message {
    margin-left: -25px;
    text-align: center;
  }
}

@media only screen and (max-width: 1023px) {
  .message-indicator {
    display: none;
  }
}
</style>
