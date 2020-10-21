<template>
  <div>
    <div class="menu">
      <div class="account-details" v-show="showDetails">
        <a-row>
          <a-col :span="3" class="photo">
            <div class="information">
              <img
                class="image-profile"
                v-bind:src="urlApi + userData.user_image"
                alt
              />
            </div>
          </a-col>
          <a-col :span="18" class="details">
            <a-row>
              <a-col :span="24">
                <p class="details-name">
                  <b>{{ userData.user_nickname }}</b>
                </p>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <p class="details-message">@{{ userData.user_name }}</p>
              </a-col>
            </a-row>
          </a-col>
        </a-row>

        <a-collapse
          class="collapse-detail"
          default-active-key="1"
          :bordered="false"
        >
          <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel
            key="1"
            header="- Tap Here For Details -"
            :style="customStyle"
            :show-arrow="false"
            :bordered="false"
          >
            <div class="phone">
              <p class="title-details">Account</p>
            </div>
            <div class="phone">
              <p class="title-profile">Phone Number :</p>
              <p class="detail-profile">{{ userData.user_phone }}</p>
            </div>
            <div class="username">
              <p class="title-profile">Usename :</p>
              <p class="detail-profile">@{{ userData.user_name }}</p>
            </div>
            <div class="bio">
              <p class="title-profile">Bio :</p>
              <p class="detail-profile">
                {{ userData.user_bio }}
              </p>
            </div>
            <!-- ================================================== -->
            <div class="phone">
              <p class="title-details title-location">Location</p>
            </div>

            <GmapMap
              class="user-location"
              :center="coordinate"
              :zoom="10"
              map-type-id="terrain"
              style="width: 360px; height: 300px"
            >
              <GmapMarker
                :position="coordinate"
                :clickable="true"
                :draggable="true"
                @click="clickMarker"
                icon="https://img.icons8.com/color/48/000000/map-pin.png"
              />
            </GmapMap>
            <!-- ======================================================= -->
            <div class="phone">
              <p class="title-details">Settings</p>
            </div>
            <div class="phone">
              <a-row>
                <a-col :span="4">
                  <a-icon
                    class="icon-setting"
                    type="user"
                    :style="{ fontSize: '18px', color: '#7e98df' }"
                  />
                </a-col>
                <a-col :span="20">
                  <p
                    class="detail-profile edit-setting"
                    @click="
                      editProfile()
                      initiateFormValue()
                    "
                  >
                    Edit Profile
                  </p>
                </a-col>
              </a-row>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
      <div class="account-details" v-show="showEdit">
        <a-row>
          <a-col :span="6" class="photo">
            <div class="information">
              <!-- <a-upload-dragger
                name="file"
                :multiple="false"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                :headers="headers"
                @change="handleChange"
                class="upload-image"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
              </a-upload-dragger> -->
              <a-upload-dragger
                type="file"
                @change="handleFile"
                :multiple="false"
                class="upload-image"
                ><p class="ant-upload-drag-icon">
                  <a-icon type="inbox" /></p
              ></a-upload-dragger>
            </div>
          </a-col>
          <a-col :span="16" class="details">
            <a-row>
              <a-col :span="22">
                <p class="details-name">
                  <a-input
                    style="margin-left: 10px"
                    placeholder="edit your name"
                    v-model="form.user_nickname"
                  />
                </p>
              </a-col>
            </a-row>
          </a-col>
        </a-row>

        <a-collapse default-active-key="1" :bordered="false">
          <template #expandIcon="props">
            <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" />
          </template>
          <a-collapse-panel
            key="1"
            class="details-dropdown"
            header="Details"
            :style="customStyle"
          >
            <div class="phone">
              <p class="title-details">Account</p>
            </div>
            <div class="phone">
              <p class="title-profile">Phone Number :</p>
              <p class="detail-profile">
                <a-input
                  placeholder="edit your phone number"
                  v-model="form.user_phone"
                />
              </p>
            </div>
            <div class="username">
              <p class="title-profile">Usename :</p>
              <p class="detail-profile">
                <a-input
                  placeholder="edit your username"
                  v-model="form.user_name"
                />
              </p>
            </div>
            <div class="bio">
              <p class="title-profile">Bio :</p>
              <p class="detail-profile">
                <a-textarea
                  placeholder="Type your bio"
                  :auto-size="{ minRows: 2, maxRows: 6 }"
                  v-model="form.user_bio"
                />
              </p>
            </div>
            <a-button class="button-save" @click="editProfile" block>
              <p class="text-button">Save</p>
            </a-button>
            <a-button
              @click="cancelEdit"
              class="button-cancel"
              type="danger"
              block
            >
              <p class="text-button">Cancel</p>
            </a-button>
          </a-collapse-panel>
        </a-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data() {
    return {
      urlApi: process.env.VUE_APP_URL,
      coordinate: {
        lat: 0,
        lng: 0
      },
      headers: {
        authorization: 'authorization-text'
      },
      showDetails: true,
      showEdit: false,
      customStyle:
        'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden',
      user_id: [],
      form: {
        user_id: '',
        user_nickname: '',
        user_name: '',
        user_email: '',
        user_phone: '',
        user_image: '',
        user_bio: ''
      }
    }
  },
  computed: {
    ...mapGetters(['userData'])
  },
  created() {
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
  methods: {
    ...mapActions(['editUser']),
    initiateFormValue() {
      this.showDetails = false
      this.showEdit = true
      this.form = {
        user_id: this.userData.user_id,
        user_nickname: this.userData.user_nickname,
        user_name: this.userData.user_name,
        user_email: this.userData.user_email,
        user_phone: this.userData.user_phone,
        user_image: this.userData.user_image,
        user_bio: this.userData.user_bio
      }
    },

    editProfile() {
      this.editUser(this.form)
        .then((response) => {
          console.log(this.userData)

          console.log(response)
          this.showDetails = true
          this.showEdit = false
        })
        .catch((error) => {
          console.log(error)
        })

      this.showDetails = false
      this.showEdit = true
    },
    cancelEdit() {
      this.showDetails = true
      this.showEdit = false
    },
    handleFile(event) {
      this.form.user_image = event.file.originFileObj
      console.log(event.file.originFileObj)
    },

    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
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
  background-color: #f7f7f7;
}

.collapse-detail {
  background-color: #f7f7f7;
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
  text-align: center;
}

.details-message {
  text-align: center;
}

.information {
  margin-bottom: 10px;
}

.photo {
  margin-left: 15px;
}

.title-profile {
  padding: 0 20px;
  text-align: left;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: -0.17px;

  color: #7e98df;
}

.detail-profile {
  text-align: left;
  padding: 10px 20px;
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: 1.335px;

  color: #232323;
}

.title-details {
  text-align: left;
  padding: 10px 20px;
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 23px;

  color: #232323;
}

.icon-setting {
  padding: 10px 0;
}

.edit-setting:hover {
  cursor: pointer;
}

.components-input-demo-size .ant-input {
  width: 30px;
  margin: 0 8px 8px 0;
}

.upload-image {
  width: 10px;
  height: 10px;
  margin-bottom: 20px;
}

.details-dropdown {
  margin-top: 10px;
}

.button-save {
  margin: 5px 0;
  background: #7e98df;
  border-radius: 20px;
}

.button-cancel {
  margin: 5px 0;
  border-radius: 20px;
}

.text-button {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 185.17%;
  /* identical to box height, or 28px */

  letter-spacing: -0.165px;

  color: #ffffff;
}

@media only screen and (max-width: 766px) {
  .detail-profile {
    font-size: 80%;
  }

  .information img {
    width: 100px;
    height: 80px;
  }

  .details-name {
    margin-top: 90px;
    margin-left: -25px;
  }

  .details-message {
    margin-left: -25px;
  }
}

@media only screen and (max-width: 1023px) {
  .user-location {
    display: none;
  }

  .title-location {
    display: none;
  }
}

@media only screen and (min-width: 1024px) {
  .contact-button {
    display: none;
  }
}
</style>
