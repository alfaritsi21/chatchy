<template>
  <div class="login">
    <div class="login-container">
      <div>
        <p class="login-text">
          <a-row>
            <a-col :span="5">
              <a-icon type="left" />
            </a-col>
            <a-col :span="19" class="register-text">Register</a-col>
          </a-row>
        </p>
      </div>
      <p class="greeting">Let’s create your account !</p>

      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            Name&nbsp;
            <a-tooltip title="What do you want others to call you?">
              <a-icon type="question-circle-o" />
            </a-tooltip>
          </span>
          <a-input
            class="form-name"
            v-decorator="[
              'name',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your name!',
                    whitespace: true
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="E-mail">
          <a-input
            v-decorator="[
              'email',
              {
                rules: [
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]
              }
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="Password" has-feedback>
          <a-input
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please input your password!'
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              }
            ]"
            type="password"
          />
        </a-form-item>
        <a-form-item
          v-bind="formItemLayout"
          label="Confirm Password"
          has-feedback
        >
          <a-input
            v-decorator="[
              'confirm',
              {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              }
            ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="Phone Number">
          <a-input
            v-decorator="[
              'phone',
              {
                rules: [
                  { required: true, message: 'Please input your phone number!' }
                ]
              }
            ]"
            style="width: 100%"
          >
            <a-select
              slot="addonBefore"
              v-decorator="['prefix', { initialValue: '86' }]"
              style="width: 70px"
            >
              <a-select-option value="86"> +62 </a-select-option>
              <a-select-option value="87"> +60 </a-select-option>
              <a-select-option value="87"> +61 </a-select-option>
            </a-select>
          </a-input>
        </a-form-item>
        <a-form-item v-bind="tailFormItemLayout">
          <a-checkbox v-decorator="['agreement', { valuePropName: 'checked' }]">
            I have read the
            <a href=""> agreement </a>
          </a-checkbox>
        </a-form-item>
      </a-form>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          class="login-button login-form-button"
        >
          <p>Register</p>
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
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 500px;
  height: 620px;
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
</style>
