// step1 요구사항 구현을 위한 전략

/**
 * [메뉴 추가]
 * - [x] 메뉴 이름을 입력 받는다.
 * - [x] 입력한 메뉴를 엔터키 입력으로 추가한다.
 * - [ ] 확인 버튼 누르면 추가된다.
 * - [x] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
 * - [x] 총 메뉴 갯수를 count 하여 상단에 보여준다.
 * - [x] 메뉴가 추가되고 나면, input 은 빈 값으로 초기화한다.
 * - [x] 사용자 입력값이 빈 값이라면 추가되지 않는다.
 */

const $ = (selector) => document.querySelector(selector);

// 이 함수가 실행해야함
function App() {
  // form 태그가 자동으로 전송되는걸 막아준다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const addMenu = () => {
    if ($("#espresso-menu-name").value === "") {
      alert("메뉴를 입력하세요!");
      return;
    }

    const espressoMenuName = $("#espresso-menu-name").value;

    const menuItemTemplate = (espressoMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name sold-out">${espressoMenuName}</span>
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
    };

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );

    /**
     * 총 메뉴 개수 업데이트
     * li 개수를 카운팅?
     */
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount} 개`;

    /** input 은 빈 값으로 초기화 */
    $("#espresso-menu-name").value = "";
  };

  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenu();
  });

  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }

    addMenu();
  });
}

App();

/**
 * [메뉴 수정]
 * 메뉴 수정 버튼 클릭 이벤트를 받고, prompt 가 뜬다.
 * prompt 창에서 신규 메뉴명을 입력 받는다.
 * 확인 버튼을 누르면 입력 받은 메뉴가 수정된다.
 */

/**
 * [메뉴 삭제]
 * 메뉴 삭제 버튼을 누르면 confirm 창이 뜬다.
 * confirm 에서 확인 버튼을 누르면 메뉴가 삭제된다.
 */
