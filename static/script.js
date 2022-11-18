if (Cookies.getJSON("drawnArray") == undefined) {
  drawnArray = [];
} else {
  drawnArray = Cookies.getJSON("drawnArray");
}
if (Cookies.getJSON("unclaimedNum") == undefined) {
  unclaimedNum = [];
} else {
  unclaimedNum = Cookies.getJSON("unclaimedNum");
  for (i = 0; i < unclaimedNum.length; i++) {
    addToList(unclaimedNum[i]);
  }
}
if (Cookies.getJSON("lowerRange") == undefined) {
  lowerRange = 1;
} else {
  lowerRange = Cookies.getJSON("lowerRange");
}
if (Cookies.getJSON("upperRange") == undefined) {
  upperRange = 10;
} else {
  upperRange = Cookies.getJSON("upperRange");
}
document.getElementById("max").setAttribute("value", upperRange);
document.getElementById("min").setAttribute("value", lowerRange);
function removeNumber(number) {
  unclaimedNum.splice($.inArray(number, unclaimedNum), 1);
  $("#numList").empty();
  for (i = 0; i < unclaimedNum.length; i++) {
    addToList(unclaimedNum[i]);
  }
  Cookies.set("unclaimedNum", unclaimedNum);
  console.log("Removed " + number + " from list.");
}
function addToList(number) {
  var newItem = document.createElement("A");
  var textnode = document.createTextNode(number);
  newItem.appendChild(textnode);
  newItem.setAttribute("class", "list-group-item");
  newItem.setAttribute("href", "#");
  var list = document.getElementById("numList");
  list.insertBefore(newItem, list.childNodes[0]);
}
function draw(min, max) {
  if (drawnArray.length != max - min + 1) {
    var dupe = true;
    while (dupe === true) {
      var answer = Math.floor(Math.random() * (max - min + 1)) + min;
      dupe = false;
      for (i = 0; i < drawnArray.length; i++) {
        if (drawnArray[i] == answer) {
          dupe = true;
          console.log("Duplicate number detected!");
        }
      }
    }

    drawnArray.push(answer);
    unclaimedNum.push(answer);
    Cookies.set("drawnArray", drawnArray);
    Cookies.set("unclaimedNum", unclaimedNum);
    addToList(answer);
    console.log("Drawn number is " + answer);
    return answer;
  } else {
    console.log("Out of number to draw!");
    return 0;
  }
}

$("#drawModal").on("show.bs.modal", function (e) {
  var number = draw(lowerRange, upperRange);
  if (number != 0) {
    document.getElementById("luckyNumber").innerHTML = number;
  } else {
    document.getElementById("luckyNumber").innerHTML = number;
    alert("No number left!");
  }
});

$("#resetArray").click(function () {
  drawnArray = [];
  unclaimedNum = [];
  Cookies.set("drawnArray", drawnArray);
  Cookies.set("unclaimedNum", unclaimedNum);
  $("#numList").empty();
  console.log("Data resetted!");
});
$(document).on("click", "#newRange", function (event) {
  upperRange = parseInt(document.getElementById("max").value);
  lowerRange = parseInt(document.getElementById("min").value);
  Cookies.set("lowerRange", lowerRange);
  Cookies.set("upperRange", upperRange);
  console.log("New range: " + lowerRange + " - " + upperRange);
});
$("a#download").click(function () {
  var arrayString = "";
  for (i = 0; i < drawnArray.length; i++) {
    arrayString += String(drawnArray[i]);
    arrayString += "\n";
    console.log(i);
  }
  this.href =
    "data:text/plain;charset=UTF-8," + encodeURIComponent(arrayString);
});
$(".list-group").on("click", "a", function () {
  var number = parseInt(this.innerHTML);
  bootbox.confirm({
    message: "Are you sure you want to delete " + number + "?",
    buttons: {
      confirm: {
        label: "Yes",
        className: "btn-success",
      },
      cancel: {
        label: "No",
        className: "btn-danger",
      },
    },
    callback: function (result) {
      if (result == true) {
        removeNumber(number);
      }
    },
  });
});
