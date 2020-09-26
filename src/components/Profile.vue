<template>
  <div>
    <div class="menu">
      <div class="account-details" v-show="showDetails">
        <a-row>
          <a-col :span="3" class="photo">
            <div class="information">
              <img
                src="https://oshiprint.in/image/data/poster/new/mqp114.jpeg"
                alt
              />
            </div>
          </a-col>
          <a-col :span="18" class="details">
            <a-row>
              <a-col :span="24">
                <p class="details-name">
                  <b>Jean Alfredo Oliver</b>
                </p>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <p class="details-message">@username</p>
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
          <a-collapse-panel key="1" header="Details" :style="customStyle">
            <div class="phone">
              <p class="title-details">Account</p>
            </div>
            <div class="phone">
              <p class="title-profile">Phone Number :</p>
              <p class="detail-profile">+62851721621</p>
            </div>
            <div class="username">
              <p class="title-profile">Usename :</p>
              <p class="detail-profile">@brobroqi</p>
            </div>
            <div class="bio">
              <p class="title-profile">Bio :</p>
              <p class="detail-profile">
                Saya adalah seorang kapiten. Mempunyai pedang panjang. kalau
                berjalan prok prok prok
              </p>
            </div>
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
                  <p class="detail-profile edit-setting" @click="editProfile">
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
              <a-upload-dragger
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @change="handleChange"
                class="upload-image"
              >
                <p class="ant-upload-drag-icon">
                  <a-icon type="inbox" />
                </p>
              </a-upload-dragger>
            </div>
          </a-col>
          <a-col :span="16" class="details">
            <a-row>
              <a-col :span="22">
                <p class="details-name">
                  <a-input size="small" placeholder="edit your name" />
                </p>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="22">
                <p class="details-message">
                  <a-input size="small" placeholder="edit your username" />
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
                <a-input placeholder="edit your phone number" />
              </p>
            </div>
            <div class="username">
              <p class="title-profile">Usename :</p>
              <p class="detail-profile">
                <a-input placeholder="edit your username" />
              </p>
            </div>
            <div class="bio">
              <p class="title-profile">Bio :</p>
              <p class="detail-profile">
                <a-textarea
                  placeholder="Type your bio"
                  :auto-size="{ minRows: 2, maxRows: 6 }"
                />
              </p>
            </div>
            <a-button class="button-save" block>
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
export default {
  data() {
    return {
      showDetails: true,
      showEdit: false,
      customStyle:
        'background: #f7f7f7;border-radius: 4px;margin-bottom: 24px;border: 0;overflow: hidden'
    }
  },
  methods: {
    editProfile() {
      this.showDetails = false
      this.showEdit = true
    },
    cancelEdit() {
      this.showDetails = true
      this.showEdit = false
    },
    handleChange(info) {
      const status = info.file.status
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
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
</style>
