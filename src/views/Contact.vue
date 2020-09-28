<template>
  <div class="contact">
    <div class="contact-navbar">
      <a-row>
        <a-col :span="2">
          <a-icon
            type="left"
            :style="{ fontSize: '18px', color: '#ffffff' }"
            @click="setShowChat"
          />
        </a-col>
        <a-col :span="22"><p class="title-navbar">My Contact</p></a-col>
      </a-row>
    </div>
    <!-- <a-row class="search">
      <a-col :span="17" class="header-logo">
        <a-input
          placeholder="Type for search contact"
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
    </a-row> -->
    <div class="body-contact">
      <div class="contact-list" v-for="(item, index) in contacts" :key="index">
        <div>
          <a-row>
            <a-col :span="3" class="photo"> </a-col>
            <a-col :span="3" class="photo">
              <div class="information">
                <img v-bind:src="urlApi + item.user_image" alt />
              </div>
            </a-col>
            <a-col :span="15" class="details">
              <a-row>
                <a-col :span="6">
                  <p class="details-name">
                    <b>{{ item.user_nickname }}</b>
                  </p>
                </a-col>
                <a-col :span="6">
                  <a-button class="contact-button" @click="showModal">
                    <p class="details-button">
                      <b>View Location</b>
                    </p>
                  </a-button>
                  <a-modal
                    v-model="visible"
                    title="Friend's Location"
                    @ok="handleOk"
                  >
                    <GmapMap
                      :center="coordinate"
                      :zoom="10"
                      map-type-id="terrain"
                      style="width: 500px; height: 300px"
                    >
                      <GmapMarker
                        :position="coordinate"
                        :clickable="true"
                        :draggable="true"
                        @click="clickMarker"
                        icon="https://img.icons8.com/color/48/000000/map-pin.png"
                      />
                    </GmapMap>
                  </a-modal>
                </a-col>
                <a-col :span="6">
                  <a-button class="contact-button" @click="targetClick(item)">
                    <p class="details-button">
                      <b>Send Message</b>
                    </p>
                  </a-button>
                </a-col>
                <a-col :span="6">
                  <a-button
                    class="contact-button-delete"
                    @click="deleteContact(item)"
                  >
                    <p class="details-button">
                      <b>Delete Contact</b>
                    </p>
                  </a-button>
                </a-col>
              </a-row>
              <a-row>
                <a-col :span="24">
                  <p class="details-message">@{{ item.user_name }}</p>
                </a-col>
              </a-row>
            </a-col>
          </a-row>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
// import ContactList from '../components/ContactList'
import { mapActions, mapMutations, mapGetters } from 'vuex'
import io from 'socket.io-client'

export default {
  name: 'Contact',
  components: {
    // ContactList
  },
  data() {
    return {
      target: { user_id: 0, user_nickname: '', user_image: '' },
      socket: io('http://localhost:3001'),
      user: { user_id: 0, user_nickname: '', user_image: '' },
      urlApi: process.env.VUE_APP_URL,
      visible: false,
      coordinate: {
        lat: 0,
        lng: 0
      }
    }
  },
  created() {
    this.initializeUser()
    this.getContacts()
    this.$getLocation()
      .then((coordinates) => {
        this.coordinate = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
        // console.log(coordinates)s
      })
      .catch((error) => {
        alert(error)
      })
  },
  computed: {
    ...mapGetters({
      contacts: 'getContactData',
      userDatas: 'userData'
    })
  },
  methods: {
    initializeUser() {
      this.user = this.userDatas
      this.target = this.getTarget
      console.log(this.userDatas)
    },
    ...mapMutations([
      'setShowChat',
      'setShowChatroom',
      'setShowContact',
      'setShowInvite'
    ]),
    ...mapActions(['getContacts', 'setTargetAction', 'deleteContacts']),
    targetClick(target) {
      this.target = target
      this.setTargetAction(this.target)
      this.setShowChatroom()
      this.socket.emit('getMessage', {
        user: this.user,
        target: this.target
      })
    },
    deleteContact(item) {
      const data = {
        owner: this.user.user_id,
        saved: item.user_id
      }
      this.deleteContacts(data)
        .then((response) => {
          this.getContacts()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    onSearch() {},
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      console.log(e)
      this.visible = false
    },
    clickMarker(position) {
      console.log('clicked')
      console.log(position)
      console.log(position.latLng.lat())
      console.log(position.latLng.lng())
      this.coordinate = {
        lat: position.latLng.lat(),
        lng: position.latLng.lng()
      }
    }
  }
}
</script>

<style scoped>
.contact {
  height: 625px;
  /* overflow-y: scroll; */
}

/* .contact::-webkit-scrollbar {
  display: none;
} */

.body-contact {
  height: 490px;
  overflow-y: scroll;
}

.body-contact::-webkit-scrollbar {
  display: none;
}

.contact-navbar {
  height: 60px;
  background: #7e98df;
  border-radius: 0 0 10px 10px;
  padding: 20px;
}

.title-navbar {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  letter-spacing: -0.165px;

  color: #ffffff;
}

.contact-list {
  margin: 40px 60px;
}

.search-box {
  margin-left: 160px;
  border-radius: 20px;
  text-align: center;
}

.ant-input {
  border-radius: 15px !important;
}

.search {
  margin: 15px 0;
}

.contact-button {
  margin-top: 10px;
  background-color: #7e98df;
  border-radius: 10px;
  height: 30px;
}

.contact-button-delete {
  margin-top: 10px;
  background-color: #c70323;
  border-radius: 10px;
  height: 30px;
}

.details-button {
  padding-top: 5px;
  color: #ffffff;
}
</style>
