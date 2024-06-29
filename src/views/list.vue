<template>
  <div class="list-comp">
    <h1>同学列表</h1>
    <div class="tool-bar">
      <button class="add-btn" type="primary" @click="addUser">新增</button>
    </div>
    <ul>
      <li>
        <span class="No">序号</span>
        <span class="study-code">学号</span>
        <span class="name">姓名</span>
        <span class="year">年龄</span>
        <div class="operation">操作</div>
      </li>
      <li v-for="(item, index) in list" :key="item.id">
        <span class="No">{{ index + 1 }}.</span>
        <span class="study-code">{{ item.id }}</span>
        <span class="name">{{ item.userName }}</span>
        <span class="year">{{ item.age }}</span>
        <div class="operation">
          <button @click="deleteUser(index)">删除</button>
          <button @click="editUser(index)">编辑</button>
          <button @click="getYourName(item.id)">问名字</button>
        </div>
      </li>
    </ul>

    <div class="pop-blank" v-if="showFlag">
      <h2>{{ isEdit ? '编辑同学' : '新增同学' }}</h2>
      <div class="blank-body">
        <div class="blank-item">
          <span>学号</span>
          <input type="text" v-model="studyNum">
        </div>
        <div class="blank-item">
          <span>姓名</span>
          <input type="text" v-model="name">
        </div>
        <div class="blank-item">
          <span>年龄</span>
          <input type="text" v-model="year">
        </div>
      </div>
      <div class="footer">
        <button type="primary" @click="showFlag = false">取消</button>
        <button type="primary" @click="submitFn">确定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, watch } from 'vue';

const LOCAL_STORAGE_KEY = 'students';

const showFlag = ref(false);
const isEdit = ref(false);
const curIdx = ref(0);

const studyNum = ref('');
const name = ref('');
const year = ref('');
const list = reactive([]);

const loadListFromLocalStorage = () => {
  const savedList = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (savedList) {
    const parsedList = JSON.parse(savedList);
    parsedList.forEach(item => list.push(item));
  } else {
    list.push(
      {
        id: 220812022,
        userName: '刘淑文',
        age: 18
      },
      {
        id: 220812008,
        userName: '蔡欣怡',
        age: 18
      },
      {
        id: 220812030,
        userName: '龙依',
        age: 18
      }
    );
  }
};

const saveListToLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
};

onMounted(() => {
  loadListFromLocalStorage();
});

watch(list, saveListToLocalStorage, { deep: true });

const deleteUser = index => {
  list.splice(index, 1);
};

const addUser = () => {
  isEdit.value = false;
  showFlag.value = true;
  clearForm();
};

const editUser = index => {
  isEdit.value = true;
  curIdx.value = index;
  const item = list[index];
  studyNum.value = item.id;
  name.value = item.userName;
  year.value = item.age;
  showFlag.value = true;
};

const checkList = code => {
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (Number(code) === element.id) {
      return true;
    }
  }
  return false;
};

const addNum2name = name => {
  let total = 0;
  list.map(item => {
    if (item.userName.startsWith(name)) {
      total++;
    }
  });
  return `${name}${total}`;
};

const validateForm = () => {
  const exgNum = /^\d+$/;
  const exgStr = /^[\u4e00-\u9fa5a-zA-Z]+$/;

  if (!exgNum.test(studyNum.value)) {
    alert('学号必须是纯数字');
    return false;
  }
  if (!exgStr.test(name.value)) {
    alert('姓名必须是字符串');
    return false;
  }
  if (!exgNum.test(year.value) || year.value <= 0 || year.value > 120) {
    alert('年龄必须是大于0小于120的数字');
    return false;
  }
  return true;
};

const clearForm = () => {
  studyNum.value = '';
  name.value = '';
  year.value = '';
};

const submitFn = () => {
  if (!validateForm()) {
    return;
  }

  if (isEdit.value) { // 编辑
    list[curIdx.value] = {
      id: studyNum.value,
      userName: name.value,
      age: year.value
    };
  } else { // 新增
    if (checkList(studyNum.value)) {
      alert('学号已存在');
      return;
    }
    name.value = addNum2name(name.value);
    list.unshift({
      id: studyNum.value,
      userName: name.value,
      age: year.value
    });
  }
  showFlag.value = false;
  clearForm();
};

const getYourName = id => {
  const student = list.find(item => item.id === id);
  alert(student.userName);
};
</script>

<style lang="less" scoped>
.list-comp {
  text-align: left;
}
h1 {
  text-align: center;
}
.tool-bar {
  display: flex;
  justify-content: flex-end;
  .add-btn {
    background-color: rgba(42, 46, 54, 0.48);
    color: #ffffff;
    width: 90px;
    margin-right: 24px;
  }
}
ul {
  padding-left: 0;
  padding: 0 24px;
  text-align: center;
}
.pop-blank {
  position: absolute;
  background-color: #ffffff;
  border-radius: 8px;
  left: 50%;
  top: 50%;
  width: 50%;
  height: 50vh;
  transform: translate(-50%, -50%);
  padding: 24px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  h2 {
    text-align: center;
  }
  .blank-body {
    flex-grow: 1;
    flex-shrink: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .blank-item {
      height: 72px;
      font-size: 24px;
      display: flex;
      span {
        margin-right: 12px;
        width: 60px;
      }
      input {
        height: 36px;
        flex-grow: 1;
        flex-shrink: 1;
        font-size: 16px;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    button {
      background-color: #1677ff;
      color: #ffffff;
    }
    & > button:nth-child(1) {
      margin-right: 12px;
      background-color: #ffffff;
      border: 1px solid #1677ff;
      color: #1677ff;
    }
  }
}
li {
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 64px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  &:nth-child(1) {
    color: aliceblue;
    background-color: rgba(42, 46, 54, 0.48);
  }
  .No {
    width: 18%;
  }
  .study-code {
    width: 18%;
  }
  .name {
    width: 18%;
  }
  .year {
    width: 18%;
  }
  .operation {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    & > button {
      background-color: #314659;
      color: #ffffff;
      width: 90px;
      transition: background-color 0.3s;
      &:hover {
        background-color: #415a77;
      }
    }
  }
}
</style>