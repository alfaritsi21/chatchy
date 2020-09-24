<template>
  <div class="login">
    <div class="login-container">
      <div>
        <p class="login-text">
          <a-row>
            <a-col :span="5">
              <a-icon type="left" />
            </a-col>
            <a-col :span="19" class="register-text">Forgot Password</a-col>
          </a-row>
        </p>
      </div>
      <p class="greeting">You’ll get messages soon on your e-mail</p>

      <a-form :form="form" @submit="handleSubmit">
        <a-input
          class="email-form"
          size="large"
          v-decorator="[
            'userName',
            {
              rules: [{ required: true, message: 'Please input your email!' }]
            }
          ]"
          placeholder="Email"
        >
          <a-icon
            class="email-form"
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-button login-form-button"
        >
          <p>Send</p>
        </a-button>
      </a-form-item>
      <!-- </a-form> -->
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line space-before-function-paren
  data() {
    return {
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
  // eslint-disable-next-line space-before-function-paren
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'register' })
  },
  methods: {
    // eslint-disable-next-line space-before-function-paren
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    // eslint-disable-next-line space-before-function-paren
    handleConfirmBlur(e) {
      const value = e.target.value
      this.confirmDirty = this.confirmDirty || !!value
    },
    // eslint-disable-next-line space-before-function-paren
    compareToFirstPassword(rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        // eslint-disable-next-line standard/no-callback-literal
        callback('Two passwords that you enter is inconsistent!')
      } else {
        callback()
      }
    },
    // eslint-disable-next-line space-before-function-paren
    validateToNextPassword(rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['confirm'], { force: true })
      }
      callback()
    },
    // eslint-disable-next-line space-before-function-paren
    handleWebsiteChange(value) {
      let autoCompleteResult
      if (!value) {
        autoCompleteResult = []
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(
          (domain) => `${value}${domain}`
        )
      }
      this.autoCompleteResult = autoCompleteResult
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

.login-container {
  width: 500px;
  height: 350px;
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
  margin-bottom: 40px;
}

.email-form {
  padding-left: 40px;
  padding-right: 50px;
  padding-bottom: 30px;
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
</style>
