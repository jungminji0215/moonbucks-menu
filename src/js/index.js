// step1 요구사항 구현을 위한 전략

/**
 * [메뉴 추가]
 * - [ ] 메뉴 이름을 입력 받는다.
 * - [ ] 입력한 메뉴를 엔터키 입력으로 추가한다.
 * - [ ] 총 메뉴 갯수를 count 하여 상단에 보여준다.
 * - [ ] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
 * - [ ] 메뉴가 추가되고 나면, input 은 빈 값으로 초기화한다.
 * - [ ] 사용자 입력값이 빈 값이라면 추가되지 않는다.
 */

// 이 함수가 실행해야함
function App() {
  // form 태그가 자동으로 전송되는걸 막아준다.
  document
    .querySelector("#espresso-menu-form")
    .addEventListener("submit", (e) => {
      e.preventDefault();
    });

  const $espressoMenuName = document
    .querySelector("#espresso-menu-name")
    .addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        const menuInput = document.querySelector("#espresso-menu-name").value;
        console.log("menuInput :>> ", menuInput);
      }
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
