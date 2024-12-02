/** MEMO 로컬스토리지 사용할 때 이렇게 객체 만들어서 관리하면 좋구나... */
const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    // 객체로 변경해주어야한다.
    return JSON.parse(localStorage.getItem("menu"));
  },
};

export default store;
