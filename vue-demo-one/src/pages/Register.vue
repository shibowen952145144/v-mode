<template>
	<div>
		<hm-header>注册</hm-header>

		<hm-logo></hm-logo>
		<van-field
			v-model="username"
			required
			label="用户名"
			placeholder="请输入用户名"
			:error-message="usernameErrMsg"
			clearable
			@input="checkUsername"
			@clear="clearusername"
		/>
		<van-field
			v-model="password"
			required
			label="密码"
			placeholder="请输入密码"
			:error-message="passwordErrMsg"
			clearable
			@input="checkPassword"
			@clear="clearPassword"
		/>
		<van-field
			v-model="nickname"
			required
			label="昵称"
			placeholder="请输入昵称"
			:error-message="nicknameErrMsg"
			clearable
			@input="checkNickname"
			@clear="clearNickname"
		/>
		<hm-button @click.native="startRegister">注册用户</hm-button>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data() {
		return {
			password: '123',
			username: '486',
			nickname: '好的',
			usernameErrMsg: '',
			passwordErrMsg: '',
			nicknameErrMsg: '',
		}
	},
	methods: {
		// 用户名的校验
		checkUsername() {
			let res = /^\d{3,8}$/
			if (res.test(this.username)) {
				this.usernameErrMsg = ''
			} else {
				this.usernameErrMsg = '用户名校验失败'
			}
		},
		clearusername() {
			this.username = ''
			this.usernameErrMsg = ''
		},
		checkPassword() {
			let res = /^\d{1,5}$/
			if (res.test(this.password)) {
				this.passwordErrMsg = ''
			} else {
				this.passwordErrMsg = '密码校验失败'
			}
		},
		clearPassword() {
			this.passwordErrMsg = ''
			this.password = ''
		},
		checkNickname() {
			let res = /^[\u4e00-\u9fa5]{2,7}$/
			if (res.test(this.nickname)) {
				this.nicknameErrMsg = ''
			} else {
				this.nicknameErrMsg = '昵称校验失败'
			}
		},
		clearNickname() {
			this.nicknameErrMsg = ''
			this.nickname = ''
		},
		startRegister() {
			// console.log('点击成功')
			if (
				this.username !== '' &&
				this.nickname !== '' &&
				this.password !== '' &&
				this.usernameErrMsg === '' &&
				this.nicknameErrMsg === '' &&
				this.passwordErrMsg === ''
			) {
				axios
					.post('http://localhost:3000/register', {
						username: this.username,
						password: this.password,
						nickname: this.nickname,
					})
					.then((res) => {
						console.log(res.data)
						if (res.data.statusCode === 200) {
							this.$toast.success('注册成功')
						} else {
							this.$toast.fail('注册失败')
						}
					})
			} else {
				this.$toast.fail('校验失败')
			}
		},
	},
}
</script>

<style></style>
