/** STEP2 요구사항 정리
 * 
 * <localStorage>
 * - [x] localStorage 에 데이터를 저장한다.
 *  - [x] 메뉴를 추가할 때
 *  - [x] 메뉴를 수정할 때
 *  - [x] 메뉴를 삭제할 때
 * - [x] localStorage 에서 데이터를 읽어온다. (새로고침해도 남아있게)
 * 
 * <카테고리별 메뉴판 관리>
 * - [x] 에스프레소 메뉴판 관리
 * - [x] 프라푸치노 메뉴판 관리
 * - [x] 블랜디드 메뉴판 관리
 * - [x] 티바나 메뉴판 관리
 * - [x] 디저트 메뉴판 관리
 * 
 * <페이지 접근 시 최초 데이터 Read & Rendering>
 * - [x] 페이지에 최초로 접근할 때 로컬스토리지에서 데이터를 조회한다.
 * - [x] 에스프레소 메뉴를 페이지에 그려준다.

* <품절>
 * - [ ] 품절 버튼 추가한다.
 * - [ ] 품절 버튼을 클릭하면 localStorage 에 상태값이 저장된다.
 * - [ ] 클릭 이벤트에서 가장 가까운 li 태그의 class 속성 값에 sold-out 을 추가한다.
 */

import { $ } from "./utils/dom.js";
import store from "./store/index.js";

// 이 함수가 실행해야함
// 한 파일에는 하나의 객체만 있어야 좋다.
function App() {
  /**
   * 이 앱에 상태가 뭐뭐 있을까?
   * 상태 : 변할 수 있는 데이터 (변하기때문에 관리를 해주어야한다.)
   * - 메뉴명
   * - 품절 여부
   */

  /** 메뉴명 상태
   * App 이라는 함수 객체가 가지고 있는 상태이기때문에
   * this 를 이용해서 관리
   */
  // 메뉴가 여러개니까 배열로 초기화해주자. (이렇게 초기화를 해주면 협업할 때 이 상태는 어떤 형태로 데이터가 관리되겠구나! 를 알 수 있음)
  // this.menu = [];

  // 카테고리 다양화로 인한 menu 형태 변경
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };

  /** 현재 어떤 카테고리를 선택했는지 파악하기 위한 상태 */
  this.currentCategory = "espresso"; // 초기 상태는 에스프레소

  /** 페이지 최초 접근했을 때 App 이라는 함수가 하나의 객체로 인스턴스가 생성될 때 로컬스토리지 데이터를 불러오자 */
  this.init = () => {
    if (store.getLocalStorage()) {
      this.menu = store.getLocalStorage();
    }
    render();
    initEventListeners();
  };

  const render = () => {
    const template = this.menu[this.currentCategory]
      .map((item, index) => {
        // data-menu-id 는 나중에 dataset 으로 접근할 수 있다.
        return `
      <li data-menu-id="${index}" class=" menu-list-item d-flex items-center py-2">
        <span class="${item.soldOut && "sold-out"} w-100 pl-2 menu-name">${
          item.name
        }</span>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
          품절
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
          수정
        </button>
        <button
          type="button"
          class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
          삭제
        </button>
      </li>`;
      })
      .join("");

    // 만든 템플릿을 화면의 적절한 위치에 추가해준다.
    $("#menu-list").innerHTML = template;

    /**
     * 총 메뉴 개수 업데이트
     * li 개수를 카운팅?
     */
    updateMenuCount();
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.currentCategory].length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

  // 재사용하는 함수끼리
  const addMenuName = () => {
    if ($("#menu-name").value === "") {
      alert("메뉴를 입력하세요!");
      return;
    }

    // 화면에 input 에 입력한 값을 가져온다.
    const menuName = $("#menu-name").value;

    this.menu[this.currentCategory].push({ name: menuName });
    store.setLocalStorage(this.menu);

    render();

    /** input 은 빈 값으로 초기화 */
    $("#menu-name").value = "";
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    let updatedMenuName = prompt("메뉴명을 수정해주세요.", $menuName.innerText);
    this.menu[this.currentCategory][menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    render();
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.currentCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
    }
  };

  const soldOutMenu = (e) => {
    // 메뉴 아이디를 가져오기
    const menuId = e.target.closest("li").dataset.menuId;

    // 처음에 soldOut 은 없으므로 undefined 이다.
    this.menu[this.currentCategory][menuId].soldOut =
      !this.menu[this.currentCategory][menuId].soldOut;
    store.setLocalStorage(this.menu);
    render();
  };

  /**
   * 이벤트 리스너 따로 관리
   * 이렇게 따로 관리하면 나중에 분리하기도 좋을 것이다.
   * */
  const initEventListeners = () => {
    /** 이벤트 위임!! */
    $("#menu-list").addEventListener("click", (e) => {
      /** 메뉴 수정 */
      // 수정 버튼에 이벤트를 주려고했는데, 코드를 짜는 시점에 수정 버튼이 없다.
      // 이럴때 "이벤트 위임"이라는 것을 통해 해결할 수 있다.
      // 즉, 요소가 아직 없을 때, 다른애한테 이벤트를 먼저 받고있으라고 위임할 수 있다.
      if (e.target.classList.contains("menu-edit-button")) {
        updateMenuName(e);
        return; // return 을 해주면 밑에 코드를 불필요하게 실행하지 않아도 됨
      }

      /** 메뉴 삭제 */
      if (e.target.classList.contains("menu-remove-button")) {
        removeMenuName(e);
        return;
      }

      /** 품절 상태로 만들기 */
      if (e.target.classList.contains("menu-sold-out-button")) {
        soldOutMenu(e);
        return;
      }
    });

    // form 태그가 자동으로 전송되는걸 막아준다.
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    $("#menu-submit-button").addEventListener("click", addMenuName);

    $("#menu-name").addEventListener("keypress", (e) => {
      if (e.key !== "Enter") {
        return;
      }

      addMenuName();
    });

    /** 카테고리 선택 */
    $("nav").addEventListener("click", (e) => {
      /** 이거를 안 하면 카테고리 가운데 빈 영역을 클릭해도 이벤트가 먹힘 */
      const isCategoryButton =
        e.target.classList.contains("cafe-category-name");
      if (isCategoryButton) {
        const categoryName = e.target.dataset.categoryName;
        this.currentCategory = categoryName;
        $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
        render();
      }
    });
  };
}

/** 맨 처음에 앱이라는 객체가 생성되고, 그 객체의 init 이 실행할 수 있도록하자. */
const app = new App();
app.init();
