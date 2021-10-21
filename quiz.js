document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const form = document.querySelector(".quiz-body-form");
  const formItems = form.querySelectorAll("fieldset");
  const btnsNext = form.querySelectorAll(".button-next");
  const btnsPrev = form.querySelectorAll(".button-prev");
  const quizInputPhone = document.querySelector(".quiz-input-phone");
  const answersObj = {
    step0: {
      question: "",
      answers: [],
    },
    step1: {
      question: "",
      answers: [],
    },
    step2: {
      question: "",
      answers: [],
    },
    step3: {
      question: "",
      answers: [],
    },
    step4: {
      question: "",
      answers: [],
    },
    step5: {
      question: "",
      answers: [],
    },
    step6: {
      phone: "",
    },
  };

  btnsNext.forEach((btn, btnIndex) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();

      formItems[btnIndex].style.display = "none";
      formItems[btnIndex + 1].style.display = "flex";
    });

    btn.disabled = true;
  });

  for (let i = 0; i < btnsPrev.length; i++) {
    btnsPrev[i].addEventListener("click", (event) => {
      event.preventDefault();

      formItems[i + 1].style.display = "none";
      formItems[i].style.display = "flex";
    });
  }

  formItems.forEach((formItem, formItemIndex) => {
    if (formItemIndex === 0) {
      formItem.style.display = "flex";
    } else {
      formItem.style.display = "none";
    }

    if (formItemIndex !== formItems.length - 1) {
      const inputs = formItem.querySelectorAll("input");
      const itemTitle = formItem.querySelector(".form-title");

      answersObj[`step${formItemIndex}`].question = itemTitle.textContent;

      inputs.forEach((input) => {
        const parent = input.parentNode;
        input.checked = false;
        parent.classList.remove("active-radio");
      });
    }

    // выбор radio и checkbox
    formItem.addEventListener("change", (event) => {
      const target = event.target;
      const inputsChecked = formItem.querySelectorAll("input:checked");

      if (formItemIndex !== formItems.length - 1) {
        answersObj[`step${formItemIndex}`].answers.length = 0;
        inputsChecked.forEach((inputChecked) => {
          answersObj[`step${formItemIndex}`].answers.push(inputChecked.value);
        });

        if (inputsChecked.length > 0) {
          btnsNext[formItemIndex].disabled = false;
        } else {
          btnsNext[formItemIndex].disabled = true;
        }

        if (target.classList.contains("form-radio")) {
          const radios = formItem.querySelectorAll(".form-radio");

          radios.forEach((input) => {
            if (input === target) {
              input.parentNode.classList.add("active-radio");
            } else {
              input.parentNode.classList.remove("active-radio");
            }
          });
        } else if (target.classList.contains("form__input")) {
          target.parentNode.classList.toggle("active-checkbox");
        } else {
          return;
        }
      }
    });

    const sendForm = () => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        answersObj.step6.phone = document.getElementById("quiz-phone").value;

        
        // for (let key in answersObj.step4) {
        //   if (answersObj.step4[key].value === "") {
        //     alert("Введите даные во все поля");
        //   }
        // }

        if (document.getElementById("quiz-policy").checked) {
          postData(answersObj)
            .then((res) => res.json())
            .then((res) => {
              if (res["status"] === "ok") {
                overlay.style.display = "none";
                quiz.style.display = "none";
                form.reset();
                alert(res["message"]);
              } else if (res["status"] === "error") {
                alert(res["message"]);
              }
            });
        } else {
          alert("Дайте согласие на обработку персональных данных");
        }
      });
    };
    const postData = (body) => {
      return fetch("./quiz.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    };

    sendForm();

  });

});

const fieldsetLast = document.querySelector(".fieldset-last");
const fieldsetThanks = document.querySelector(".fieldset-thanks");
const sendBtn = document.querySelector(".send-btn");

function change() {
fieldsetLast.style.display = "none";
fieldsetThanks.style.display = "flex";
};

sendBtn.addEventListener('click', change);

function text0() {
  document.querySelector('#test-card-change').innerHTML = "Размер задолженности напрямую влияет на способ и стоимость процедуры списания долгов";
}

function text1() {
  document.querySelector('#test-card-change').innerHTML = "Имущество, кроме единственного жилья, в процедуре банкротства может быть потеряно. Подробнее о защите имущества узнаете на бесплатной консультации";
}

function text2() {
  document.querySelector('#test-card-change').innerHTML = "Ипотечное жилье и залоговый автомобиль в процедуре банкротства будут потеряны. Разработаем верную стратегию и сохраним залоговое имущество";
}

function text3() {
  document.querySelector('#test-card-change').innerHTML = "Наличие официального дохода и его размер отразятся на ускорении процедуры банкротства (пропуск процедуры реструктуризации)";
}


function text4() {
  document.querySelector('#test-card-change').innerHTML = "Сделки за последние 3 года могут быть отменены в процедуре банкротства. Это повлечет за собой неосвобождение от долгов!";
}


function text5() {
  document.querySelector('#test-card-change').innerHTML = "Правильный выбор стратегии списания долгов снижает затраты должника на процедуру до 50 %, снижает вероятность неосвобождения от долгов, потери имущества и отмены сделок";
}


function text6() {
  document.querySelector('#test-card-change').innerHTML = "Правильный выбор стратегии списания долгов снижает затраты должника на процедуру до 50 %, снижает вероятность неосвобождения от долгов, потери имущества и отмены сделок";
}