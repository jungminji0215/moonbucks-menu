/** STEP2 요구사항 정리
 * 
 * <localStorage>
 * - [ ] localStorage 에 데이터를 저장한다.
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

// 이 함수가 실행해야함
function App() {
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;
  };

  // 재사용하는 함수끼리
  const addMenuName = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("메뉴를 입력하세요!");
      return;
    }

    const espressoMenuName = $("#espresso-menu-name").value;

    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
              <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
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
    };

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );

    /**
     * 총 메뉴 개수 업데이트
     * li 개수를 카운팅?
     */
    updateMenuCount();

    /** input 은 빈 값으로 초기화 */
    $("#espresso-menu-name").value = "";
  };

  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    let updatedMenuName = prompt("메뉴명을 수정해주세요.", $menuName.innerText);
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

App();
