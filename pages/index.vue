<script setup>
import { getDatabase,ref, push ,child, update, get } from "firebase/database";
import { reactive, onMounted } from 'vue';
import {useAuthStore} from '../store/auth'


const auth = useAuthStore()
const adminRole = reactive(['']) 
const dbRef = ref(getDatabase());
const input1 = reactive([''])


async function onUpdate(item) {
  const db = getDatabase();
  const postData = {
    code: "",
    message: ""
  }
  await get(child(dbRef, adminRole[0] )).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      postData["code"] = snapshot.val().code
      postData["message"] = snapshot.val().message
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  const updates = {};
  updates['App1'] = {...postData, message: item};
  try {
    await update(ref(db), updates);
    alert(`cập nhật giá trị ${item} bởi ${adminRole[0]} thành công`)

  }
  catch (error) {
    alert(`cập nhật giá trị ${item} bởi ${adminRole[0]} thất bại`)
  }
  
}

function findFieldByValue(value, myObject) {
  for (const field in myObject) {
    if (myObject[field] === value) {
      return field
    }
  }
}


onMounted(async ()=>{
  if(!auth.isAuthenticated) navigateTo('/login')
  else
  await get(child(dbRef, "admin" )).then((snapshot) => {
    if (snapshot.exists()) {
      adminRole[0]=findFieldByValue(JSON.parse(localStorage.getItem('user')).uid, snapshot.val())
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
})


const tabItem1 = reactive(["WM",'SEXY','DG','AG'])
const tabItem2 = reactive(["BCR 01",'BCR 01','BCR 03','BCR 04'])
const tabItem3 = reactive(["CHẴN",'LẺ','TÀI','XỈU','THẮNG CƯỢC', 'THUA CƯỢC'])
const tabItem4 = reactive(["CON",'CÁI','THẮNG CUỘC','HÒA', 'THUA CUỘC'])

</script>

<template>
  <!-- <button @click="()=>writeUserData('123','hieu2','lahieu240@gmauil.com')">áhdiuasodhas</button> -->
  <div class="container" v-if="auth.isAuthenticated">
    <button class="btn" 
    @click="()=>{
      navigateTo('/login')
      auth.logout()
    }"
    >đăng xuất</button>
    <div class="form">
      <div class="form-main">
        <input type="text" class="form-input" v-model="input1[0]">
          <button class="btn" @click="()=>onUpdate(input1[0])">Cập nhật</button>
        <input type="text" class="form-input">
          <div style="display: flex; gap: 20px;">
            <button class="btn">Cập nhật</button>
            <button class="btn" style="background-color: #ea3b2e;">Xóa</button>
          </div>
      </div>
    </div>
    <div style="display: flex; justify-content: center;">
      <h3 style="text-align: center; padding: 4px 6px; background-color: #f79904; width: max-content;">Đang bật tool</h3>
    </div>
    <div class="main">
      <div class="main-button">
        <button class="btn">Bắt đầu</button>
        <button class="btn">Đang phân tích</button>
        <button class="btn">Bảo trì</button>
        <button class="btn">kết thúc</button>
      </div>
      <div class="button-list-1">
        <h3>Sảnh</h3>
        <div class="btn-list">
          <div class="btn" v-for="item in tabItem1" :key="item" 
            @click="()=>onUpdate(item)"
          >
            {{ item }}
          </div>
        </div>
        <h3>Bàn</h3>
        <div class="btn-list">
          <div class="btn" v-for="item in tabItem2" :key="item"
          @click="()=>onUpdate(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="button-list-2">
        <h3>Xóc đĩa </h3>
        <div class="btn-list">
          <div class="btn" v-for="item in tabItem3" :key="item"
          @click="()=>onUpdate(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>

      <div class="button-list-3">
        <h3>Baccarat</h3>
        <div class="btn-list">
          <div class="btn" v-for="item in tabItem4" :key="item"
          @click="()=>onUpdate(item)"
          >
            {{ item }}
          </div>
        </div>

      </div>
      
    </div>
  </div>

</template>

<style lang="scss">
  .container {
    max-width: 1280px;
    margin: 0 auto;
    .form {
      padding: 20px;
      .form-main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        .form-input {
          padding: 12px;
          border-radius: 10px;
          width: 100%;
        }
      }
    }
    .btn {
      width: max-content;
      padding: 6px 12px;
      font-size: 16px;
      background-color: #5f7c89;
      border-radius: 5px;
      outline: none;
      border: none;
      cursor: pointer;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      &:hover {
        opacity: 0.8;
        transition: opacity 0.2s ease-in;
      }
    }
    .main {
      display: flex;
      flex-direction: row;
      background-color: #fefefe;
      align-items: flex-start;
      width: 100%;
      .main-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        width: 25%;
      }
      .button-list-1, .button-list-2,.button-list-3 {
        width: 25%;
      }
      .btn-list {
          color: #ffffff;
          display: flex;
          flex-direction: row;
          gap: 20px;
          flex-wrap: wrap;
          .btn {
            background: #f79904;
            width: 30%;
            text-align: center;
          }
        }
    }
  }
</style>
