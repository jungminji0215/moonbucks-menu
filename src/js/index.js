/** STEP2 요구사항 정리
 * 
 * <localStorage>
 * - [ ] localStorage 에 데이터를 저장한다.
 *  - [x] 메뉴를 추가할 때
 *  - [ ] 메뉴를 수정할 때
 *  = [ ] 메뉴를 삭제할 때
 * - [ ] localStorage 에서 데이터를 읽어온다. (새로고침해도 남아있게)
 * 
 * <카테고리별 메뉴판 관리>
 * - [ ] 에스프레소 메뉴판 관리
 * - [ ] 프라푸치노 메뉴판 관리
 * - [ ] 블랜디드 메뉴판 관리
 * - [ ] 티바나 메뉴판 관리
 * - [ ] 디저트 메뉴판 관리
 * 
 * <페이지 접근 시 최초 데이터 Read & Rendering>
 * - [ ] 페이지에 최초로 접근할 때 로컬스토리지에서 데이터를 조회한다.
 * - [ ] 에스프레소 메뉴를 페이지에 그려준다.

* <품절>
 * - [ ] 품절 버튼 추가한다.
 * - [ ] 품절 버튼을 클릭하면 localStorage 에 상태값이 저장된다.
 * - [ ] 클릭 이벤트에서 가장 가까운 li 태그의 class 속성 값에 sold-out 을 추가한다.
 */

const $ = (selector) => document.querySelector(selector);

/** MEMO 로컬스토리지 사용할 때 이렇게 객체 만들어서 관리하면 좋구나... */
const store = {
  setLocalStorage(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
  },
  getLocalStorage() {
    localStorage.getItem("menu");
  },
};

// 이 함수가 실행해야함
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
  this.menu = [];

  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

  // 재사용하는 함수끼리
  const addMenuName = () => {
    console.log("메뉴를 추가하겠습니다. =>> ", this.menu);
    if ($("#espresso-menu-name").value === "") {
      alert("메뉴를 입력하세요!");
      return;
    }

    // 화면에 input 에 입력한 값을 가져온다.
    const espressoMenuName = $("#espresso-menu-name").value;

    this.menu.push({ name: espressoMenuName });
    store.setLocalStorage(this.menu);

    const template = this.menu
      .map((item, index) => {
        // data-menu-id 는 나중에 dataset 으로 접근할 수 있다.
        return `<li data-menu-id="${index}" class="menu-list-item d-flex items-center py-2">
      <span class="w-100 pl-2 menu-name">${item.name}</span>
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
    $("#espresso-menu-list").innerHTML = template;

    /**
     * 총 메뉴 개수 업데이트
     * li 개수를 카운팅?
     */
    updateMenuCount();

    /** input 은 빈 값으로 초기화 */
    $("#espresso-menu-name").value = "";
  };

  const updateMenuName = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    let updatedMenuName = prompt("메뉴명을 수정해주세요.", $menuName.innerText);
    this.menu[menuId].name = updatedMenuName;
    store.setLocalStorage(this.menu);
    $menuName.innerText = updatedMenuName;
  };

  const removeMenuName = (e) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    /** 메뉴 수정 */
    // 수정 버튼에 이벤트를 주려고했는데, 코드를 짜는 시점에 수정 버튼이 없다.
    // 이럴때 "이벤트 위임"이라는 것을 통해 해결할 수 있다.
    // 즉, 요소가 아직 없을 때, 다른애한테 이벤트를 먼저 받고있으라고 위임할 수 있다.
    if (e.target.classList.contains("menu-edit-button")) {
      updateMenuName(e);
    }

    /** 메뉴 삭제 */
    if (e.target.classList.contains("menu-remove-button")) {
      removeMenuName(e);
    }
  });

  // form 태그가 자동으로 전송되는걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  $("#espresso-menu-submit-button").addEventListener("click", addMenuName);

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }

    addMenuName();
  });
}

new App();
