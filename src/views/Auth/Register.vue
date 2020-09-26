<template>
  <div class="login">
    <div class="login-container">
      <div>
        <p class="login-text">
          <a-row>
            <a-col :span="5">
              <a-icon type="left" @click.prevent="onLogin" class="back" />
            </a-col>
            <a-col :span="19" class="register-text">Register</a-col>
          </a-row>
        </p>
      </div>
      <p class="greeting">Let’s create your account !</p>
      <a-alert
        v-if="visible"
        :message="errorMessage"
        type="error"
        closable
        :after-close="handleClose"
        class="alert"
      />
      <!-- <a-alert :message="errorMessage" type="info" close-text="Close Now" /> -->
      <!-- <a-alert type="error" :message="errorMessage" banner /> -->
      <!-- <p class="greeting">{{ errorMessage }}</p> -->

      <a-form>
        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            Name&nbsp;
            <a-tooltip title="What do you want others to call you?">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            class="form-name"
            placeholder="Input your username"
            v-model="form.user_name"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="E-mail">
          <a-input placeholder="Input your email" v-model="form.user_email" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
          <a-input
            placeholder="Input your password"
            v-model="form.user_password"
            type="password"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="Phone Number">
          <a-input
            placeholder="Input your phone number"
            v-model="form.user_phone"
            style="width: 100%"
          >
          </a-input>
        </a-form-item>
      </a-form>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-button login-form-button"
          @click.prevent="onSubmit"
        >
          <p>Register</p>
        </a-button>
      </a-form-item>
      <!-- </a-form> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
      form: {
        user_name: '',
        user_email: '',
        user_password: '',
        user_phone: ''
      },
      errorMessage: '',
      visible: false,
      confirmDirty: false,
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    }
  },
  methods: {
    ...mapActions(['register']),
    onSubmit() {
      // console.log(this.form)
      this.register(this.form)
        .then(result => {
          console.log(result)
          setTimeout(() => {
            this.$router.push('/login')
          }, 0)
        })
        .catch(error => {
          console.log(error)
          this.errorMessage = error.data.msg
          this.visible = true
        })
    },
    onLogin() {
      this.$router.push('/login')
    },
    handleClose() {
      this.visible = false
    },
    success() {
      this.$message
        .loading('Register in progress..', 2)
        .then(() => this.$message.success('Register Success', 2))
    }
  }
}
</script>

<style scoped>
.login {
  background-color: #e5e5e5;
  height: 629px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.alert {
  margin: 10px;
}

.login-container {
  width: 500px;
  padding: 20px;

  background-color: #ffffff;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  border-radius: 30px;
}

.login-text {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 26px;
  /* identical to box height */
  padding-top: 15px;

  text-align: center;
  letter-spacing: -0.165px;

  color: #7e98df;
}

.greeting {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: left;
  /* identical to box height */

  color: #232323;

  padding-top: 10px;
  padding-left: 40px;
}

.forgot-form {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  margin-bottom: 20px;

  text-align: right;

  color: #7e98df;
}

.login-button {
  width: 300px;
  height: 60px;
  margin-top: 10px;
  background: #7e98df;
  border-radius: 70px;
}

.login-button p {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  /* identical to box height */
  margin-bottom: 0;

  text-align: center;

  color: #ffffff;
}

.signup {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  padding-top: 20px;
  /* identical to box height */

  color: #313131;
}

.register-text {
  padding-right: 75px;
}

.form-name {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  color: #848484;

  opacity: 0.75;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}

.login-form {
  padding: 20px;
}

.back:hover {
  cursor: pointer;
}
</style>
