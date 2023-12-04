<script setup lang="ts">
// 获取屏幕边界到安全区域距离
import { getMemberProfileApi, putMemberProfileApi } from '@/services/profile'
import { onLoad } from '@dcloudio/uni-app'
import type { Gender, ProfileDetail } from '@/types/member'
import { ref } from 'vue'
import { useMemberStore } from '@/stores'

const { safeAreaInsets } = uni.getSystemInfoSync()

const profileData = ref({} as ProfileDetail)

/**
 * 获取会员信息
 */
const getMemberProfileData = async () => {
  const res = await getMemberProfileApi()
  console.log(res)
  profileData.value = res.result
}

const memberStore = useMemberStore()

onLoad(() => {
  getMemberProfileData()
})

const onAvatarImage = () => {
  uni.chooseMedia({
    count: 1, // 选择图片的数量
    mediaType: ['image'], // 选择图片或者视频
    success: (res) => {
      let fileInfos = res.tempFiles
      const currentFile = fileInfos[0]
      const { tempFilePath } = currentFile // 获取图片的临时路径
      uni.uploadFile({
        url: '/member/profile/avatar',
        filePath: tempFilePath,
        name: 'file',
        success: (res) => {
          if (res.statusCode === 200) {
            uni.showToast({
              title: '上传成功',
              icon: 'none',
            })
            let avatar = JSON.parse(res.data).result.avatar
            profileData.value!.avatar = avatar
            memberStore.profile!.avatar = avatar
          } else {
            uni.showToast({
              title: '上传失败',
              icon: 'error',
            })
          }
        },
      })
    },
  })
}

const onSaveProfile = async () => {
  const res = await putMemberProfileApi({
    nickname: profileData.value?.nickname,
    gender: profileData.value.gender,
    birthday: profileData.value.birthday,
    provinceCode: fullLocationCode[0] === '' ? undefined : fullLocationCode[0],
    cityCode: fullLocationCode[1] === '' ? undefined : fullLocationCode[1],
    countyCode: fullLocationCode[2] === '' ? undefined : fullLocationCode[2],
    profession: profileData.value.profession,
  })
  memberStore.profile!.nickname = res.result.nickname
  setTimeout(() => {
    uni.showToast({
      title: '保存成功',
      icon: 'none',
    })
  }, 1000)
  await uni.navigateBack()
}

/**
 * 拿到性别
 */
const onRadioGroup: UniHelper.RadioGroupOnChange = (e) => {
  profileData.value.gender = e.detail.value as Gender
}

let fullLocationCode: [string, string, string] = ['', '', '']
/**
 * 城市
 */
const onFullLocationChange: UniHelper.RegionPickerOnChange = (e) => {
  profileData.value.fullLocation = e.detail.value.join(' ')
  fullLocationCode = e.detail.code!
}
</script>

<template>
  <view class="viewport">
    <!-- 导航栏 -->
    <view class="navbar" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
      <navigator open-type="navigateBack" class="back icon-left" hover-class="none"></navigator>
      <view class="title">个人信息</view>
    </view>
    <!-- 头像 -->
    <view class="avatar">
      <view @tap="onAvatarImage" class="avatar-content">
        <image class="image" :src="profileData?.avatar" mode="aspectFill" />
        <text class="text">点击修改头像</text>
      </view>
    </view>
    <!-- 表单 -->
    <view class="form">
      <!-- 表单内容 -->
      <view class="form-content">
        <view class="form-item">
          <text class="label">账号</text>
          <text class="account">{{ profileData?.account }}</text>
        </view>
        <view class="form-item">
          <text class="label">昵称</text>
          <input
            class="input"
            type="text"
            placeholder="请填写昵称"
            v-model="profileData.nickname"
          />
        </view>
        <view class="form-item">
          <text class="label">性别</text>
          <radio-group @change="onRadioGroup">
            <label class="radio">
              <radio
                value="男"
                color="#27ba9b"
                :checked="profileData?.gender === '男' || profileData?.gender == undefined"
              />
              男
            </label>
            <label class="radio">
              <radio value="女" color="#27ba9b" :checked="profileData?.gender === '女'" />
              女
            </label>
          </radio-group>
        </view>
        <view class="form-item">
          <text class="label">出生日期</text>
          <picker
            class="picker"
            mode="date"
            :value="profileData?.birthday"
            @change="(e:any) => { profileData!.birthday = e.detail.value }"
            start="1900-01-01"
            :end="new Date()"
          >
            <view v-if="profileData?.birthday">{{ profileData?.birthday }}</view>
            <view class="placeholder" v-else>请选择日期</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">城市</text>
          <picker
            class="picker"
            :value="profileData?.fullLocation?.split(' ')"
            mode="region"
            @change="onFullLocationChange"
          >
            <view v-if="profileData?.fullLocation">{{ profileData?.fullLocation }}</view>
            <view class="placeholder" v-else>请选择城市</view>
          </picker>
        </view>
        <view class="form-item">
          <text class="label">职业</text>
          <input
            class="input"
            type="text"
            placeholder="请填写职业"
            v-model="profileData.profession"
          />
        </view>
      </view>
      <!-- 提交按钮 -->
      <button @tap="onSaveProfile" class="form-button">保 存</button>
    </view>
  </view>
</template>

<style lang="scss">
page {
  background-color: #f4f4f4;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-image: url(https://pcapi-xiaotuxian-front-devtest.itheima.net/miniapp/images/order_bg.png);
  background-size: auto 420rpx;
  background-repeat: no-repeat;
}

// 导航栏
.navbar {
  position: relative;

  .title {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
  }

  .back {
    position: absolute;
    height: 40px;
    width: 40px;
    left: 0;
    font-size: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// 头像
.avatar {
  text-align: center;
  width: 100%;
  height: 260rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .image {
    width: 160rpx;
    height: 160rpx;
    border-radius: 50%;
    background-color: #eee;
  }

  .text {
    display: block;
    padding-top: 20rpx;
    line-height: 1;
    font-size: 26rpx;
    color: #fff;
  }
}

// 表单
.form {
  background-color: #f4f4f4;

  &-content {
    margin: 20rpx 20rpx 0;
    padding: 0 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }

  &-item {
    display: flex;
    height: 96rpx;
    line-height: 46rpx;
    padding: 25rpx 10rpx;
    background-color: #fff;
    font-size: 28rpx;
    border-bottom: 1rpx solid #ddd;

    &:last-child {
      border: none;
    }

    .label {
      width: 180rpx;
      color: #333;
    }

    .account {
      color: #666;
    }

    .input {
      flex: 1;
      display: block;
      height: 46rpx;
    }

    .radio {
      margin-right: 20rpx;
    }

    .picker {
      flex: 1;
    }
    .placeholder {
      color: #808080;
    }
  }

  &-button {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    margin: 30rpx 20rpx;
    color: #fff;
    border-radius: 80rpx;
    font-size: 30rpx;
    background-color: #27ba9b;
  }
}
</style>
