<template>
  <div class="login">
    <div class="login-container">
      <p class="login-text">Login</p>
      <p class="greeting">Hi, Welcome Back !</p>

      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            size="large"
            v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your email!' }] },
        ]"
            placeholder="Email"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
            type="password"
            placeholder="Password"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <!-- <a-checkbox
            v-decorator="[
          'remember',
          {
            valuePropName: 'checked',
            initialValue: true,
          },
        ]"
          >Remember me</a-checkbox>-->
          <a class="forgot-form login-form-forgot" href>Forgot password?</a>
          <a-button type="primary" html-type="submit" class="login-button login-form-button">
            <p>Log in</p>
          </a-button>
          <p class="signup">
            Don't have an account?
            <a href>Sign Up</a>
          </p>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style scoped>
.login {
  background-color: #e5e5e5;
  height: 629px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-container {
  width: 400px;
  height: 450px;
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
  padding-left: 25px;
  /* identical to box height */

  color: #232323;
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
  height: 60px;
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
