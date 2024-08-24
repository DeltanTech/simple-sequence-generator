"use strict";
(()=>{
  //要素の取得
  const $doc = document;
  const $firstTerm = $doc.getElementById("js-first-term");
  const $sequenceType = $doc.getElementById("js-sequence-type");
  const $terms = $doc.getElementById("js-terms");
  const $value = $doc.getElementById("js-value");
  const $btn = $doc.getElementById("js-submit-btn");
  const $warnText = $doc.getElementById("js-warning-text");
  const $output = $doc.getElementById("js-output");
  const $searchTerm = $doc.getElementById("js-search-term");
  const $searchTermBtn = $doc.getElementById("js-search-term-btn");
  const $searchTermOutput = $doc.getElementById("js-search-term-output");
  let sequence = [];
  //ボタンが押されたら実行される関数
  const execute = () => {
    //数列を初期化し、初項を格納する
    sequence = [];
    const firstTermVal = num($firstTerm.value);
    sequence.push(firstTermVal);

    //数列タイプを判定し、どんどん項を追加していく関数
    const calculateNextTerm = (prevTerm) => {
      if($sequenceType.value === "arithmetic"){
        return prevTerm + firstTermVal;
      } else if ($sequenceType.value === "geometric"){
        return prevTerm * firstTermVal;
      }
    }
    let sequenceIndex = 1;
    while (sequenceIndex < $terms.value) {
      const nextTerm = calculateNextTerm(sequence[sequenceIndex - 1]);
      sequence.push(nextTerm);
      sequenceIndex++;
    }
    $output.value = sequence;
  }
  //Int型にする関数
  const num = (value) => {
    return Number.parseInt(value);
  }
  //文字数制限の関数
  const limitInputLength = (element, maxLength) => {
    element.addEventListener("input", () => {
      if (element.value.length > maxLength) {
        element.value = element.value.slice(0, maxLength);
      }
    });
  }
  const findTermNumber = () => {
    const searchTermVal = $searchTerm.value;
    const result = sequence[searchTermVal - 1];
    if (result === undefined) {
      $searchTermOutput.textContent = `【エラー】1から${sequence.length}までの値を入力してください。`
    } else {
      $searchTermOutput.textContent = `第${searchTermVal}項の値は${result}です。`;
    }
  }

  $searchTermBtn.addEventListener("click", () => {
    if ($output.value !== "") {
      findTermNumber();
    } else {
      $searchTermOutput.textContent = "数列が定義されていません。";
    }
  });


  $btn.addEventListener("click", () => {
    if ($sequenceType.value !== "" && $firstTerm.value !== "" && $terms.value !== "" && $value.value !== "") {
      $warnText.style.display = "none";
      execute();
    } else {
      $warnText.style.display = "block";
    }
  });
  limitInputLength($firstTerm, 5);
  limitInputLength($terms, 5);
  limitInputLength($value, 3)
})();