var lst_skill = [];
var lst_offer = [];
var lst_sub = [];
var lst_search_result = [];
$(document).ready(function () {
  q = window.location.href.split("?q=")[1].split('&offer_by=')[0];
  let query_string = '';
  if (q != undefined) {
    for(var i = 0; i <q.split("%20").length; i++){
      query_string += q.split("%20")[i] + ' ';
    }
  }
  o = window.location.href.split('&offer_by=')[1];
  let offer_string = '';
  if (o != undefined){
    if(o.split('&').length != undefined){
      for(var i = 0; i <o.split('&')[0].split("%20").length; i++){
        offer_string += o.split('&')[0].split("%20")[i] + ' ';
        }
    }    
  }
  s = window.location.href.split('&skill_gain=')[1];
  let skill_string = '';
  if(s != undefined){
    if(s.split('&').length != undefined){
      for(var i = 0; i <s.split('&')[0].split("%20").length; i++){
        skill_string += s.split('&')[0].split("%20")[i] + ' ';
        }
    }
  }

  document.getElementById('keywordfillter').innerHTML = '<span class="keyword"><span class="keyword-remove"></span><span class="keyword-text">'+offer_string.trim()+'</span></span>'
  document.getElementById('keywordfillter').innerHTML += '<span class="keyword"><span class="keyword-remove"></span><span class="keyword-text">'+skill_string.trim()+'</span></span>'
  $.ajax({
    url: "http://27.78.33.234:8000/api/course-list", //http://27.78.33.234:8000/api/course-list
    type: "POST",
    dataType: "json",
    data: {
      queries: query_string.trim(),
      flag: 1
    },
    success: function (result) {
      if (result.suggest_word !== result.word_search + " ") {
        document.getElementById("searchsuggest").innerHTML =
          '<h4>Are you looking for <strong style="color:blue"><i>' +
          result.suggest_word +
          "</i></strong></h4>";
        document.getElementById("searchword").innerHTML =
          '<h4>Search alternatives for <i style="color: blue">' +
          result.word_search +
          "</i></h4>";
      }
      
      for (var i = 0; i < result.result.courses.length; i++) {
        if(result.result.courses[i]._source.offer_by==null){
          result.result.courses[i]._source.offer_by = 'None'
        }
        if(result.result.courses[i]._source.skill_gain==null){
          result.result.courses[i]._source.skill_gain = 'None'
        }
        if((result.result.courses[i]._source.offer_by.indexOf(offer_string.trim()) > -1 || offer_string == '')
          && (result.result.courses[i]._source.skill_gain.indexOf(skill_string.trim()) > -1 || skill_string == '')){
          if (result.result.courses[i]._source.skill_gain != null) {
            lst_skill.push(
              result.result.courses[i]._source.skill_gain.split(",")
            );
          }
          lst_offer.push(result.result.courses[i]._source.offer_by);
  
          lst_sub.push(result.result.courses[i]._source.subtitle.split(","));
  
          document.getElementById("searchresult").innerHTML +=
            '<a id="' +
            result.result.courses[i]._source.course_tag +
            '" onclick="detailCourse(this)" style="cursor:pointer" class="job-listing">' +
            '<div class="job-listing-details">' +
            '<div class="job-listing-company-logo">' +
            '<img src="' +
            result.result.courses[i]._source.course_image +
            '" style="width:50px;height:50px;" alt="">' +
            "</div>" +
            '<div class="job-listing-description">' +
            '<h3 class="job-listing-title">' +
            result.result.courses[i]._source.course_title +
            "</h3>" +
            '<div class="job-listing-footer">' +
            "<ul>" +
            '<li><i class="icon-material-outline-location-city"></i> ' +
            result.result.courses[i]._source.offer_by +
            ' <div class="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>' +
            '<li><i class="icon-material-outline-language"></i> ' +
            result.result.courses[i]._source.language +
            "</li>" +
            '<li><i class="icon-material-outline-star-border"></i> ' +
            result.result.courses[i]._source.rating +
            "</li>" +
            '<li><i class="icon-material-outline-person-pin"></i> ' +
            result.result.courses[i]._source.enrolled +
            "</li>" +
            "</ul>" +
            "<div>" +
            "</div>" +
            "</div>";
        }
        
      }
      skill_tag();
      offer_tag();
      sub_tag();
    },
  });
});

function skill_tag() {
  struc = calculate_list(lst_skill);
  lst_temp = [];
  for (var struc_index = 0; struc_index < struc.length; struc_index++) {
    lst_temp.push(struc[struc_index].count);
  }
  lst_sorted = lst_temp.sort(function (a, b) {
    return b - a;
  });
  temp = 1;
  for (var i = 0; i < 10; i++) {
    for (var j of struc) {
      if (j.count == lst_sorted[i]) {
        const index = struc.indexOf(j);
        if (index > -1) {
          struc.splice(index, 1);
        }
        document.getElementById("skillgain").innerHTML +=
          '<div class="tag">' +
          '<a onclick="filterSkill(this)" id="'+j.skill+'">' +
            '<input type="checkbox" id="checkSkill" />' +
            '<label for="tag1">' +
            j.skill +
            "</label>" +
          '</a>' +
          "</div>";
        temp++;
      }

      if (temp > 10) break;
    }
  }
}
function offer_tag() {
  document.getElementById("listoffer").innerHTML = "";
  if(lst_offer.length == 1){
    document.getElementById("listoffer").setAttribute('title',lst_offer[0])
  }
  arr = unique(lst_offer);
  select = document.getElementById("listoffer");
  $("ul.dropdown-menu").attr("id", "dropdown");
  $("ul.dropdown-menu").attr("style", "max-height: 245px; overflow-y: auto;");
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == null) {
      continue;
    }
    var opt = document.createElement("option");
    opt.innerHTML = arr[i];
    select.appendChild(opt);
    document.getElementById("dropdown").innerHTML +=
      '<li data-original-index="' +
      i +
      '">' +
      '<a tabindex="0" id="'+arr[i]+'" onclick="filterOffer(this)" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false">' +
      '<span class="text">' +
      arr[i] +
      "</span>" +
      '<span class="glyphicon glyphicon-ok check-mark"></span>' +
      " </a></li>";
  }
  // // With jquery

  // <li data-original-index="1">
  //     <a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false">
  //         <span class="text">helo</span>
  //         <span class="glyphicon glyphicon-ok check-mark"></span>
  //     </a>
  // </li>
}
function sub_tag() {
  struc = calculate_list(lst_sub);
  lst_temp = [];
  for (var struc_index = 0; struc_index < struc.length; struc_index++) {
    lst_temp.push(struc[struc_index].count);
  }
  lst_sorted = lst_temp.sort(function (a, b) {
    return b - a;
  });
  temp = 1;
  for (var i = 0; i < lst_sorted.length; i++) {
    for (var j of struc) {
      if (j.count == lst_sorted[i]) {
        const index = struc.indexOf(j);
        if (index > -1) {
          struc.splice(index, 1);
        }
        document.getElementById("dropsub").innerHTML +=
          '<li><div class="checkbox">' +
          '<input type="checkbox" id="chekcbox' +
          temp +
          '">' +
          '<label for="chekcbox' +
          temp +
          '"><span class="checkbox-icon"></span>' +
          j.skill +
          '<span class="nav-tag">' +
          j.count +
          "</span></label>" +
          "</div></li>";
        temp++;
      }
    }
  }
}

function unique(arr) {
  var formArr = arr.sort();
  var newArr = [formArr[0]];
  for (let i = 1; i < formArr.length; i++) {
    if (formArr[i] !== formArr[i - 1]) {
      newArr.push(formArr[i]);
    }
  }
  return newArr;
}

function calculate_list(list) {
  var struc = [];
  for (var i of list) {
    for (var j = 0; j < i.length; j++) {
      var index = 0;
      if (struc.length == 0) {
        struc.push({
          skill: i[j],
          count: 1,
        });
      } else {
        while (true) {
          if (struc.length == index) {
            struc.push({
              skill: i[j],
              count: 1,
            });
            break;
          } else if (i[j] == struc[index].skill) {
            struc[index].count += 1;
            break;
          }
          index += 1;
        }
      }
    }
  }
  return struc;
}


//search-sub
$("#intro-keywords").keyup(function () {
  $.ajax({
    url: "http://127.0.0.1:8000/api/course-list",
    type: "POST",
    dataType: "json",
    data: {
      queries: $(this).val(),
    },
    success: function (data) {
      var currentFocus;
      console.log(data.word_search);
      //Reset keyword nhập vô trước:
      var a,
        b,
        i,
        val = data.word_search;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) {
        return false;
      }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", "intro-keywords" + " autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      document.getElementById("intro-keywords").parentNode.appendChild(a);
      /*for each item in the array...*/

      for (i = 0; i < data.result.courses.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/

        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");

        b.innerHTML += data.result.courses[i]._source.course_title;
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML +=
          "<input type='hidden' value='" +
          data.result.courses[i]._source.course_title +
          "'>";
        // /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          document.getElementById("intro-keywords").value =
            this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
      document
        .getElementById("intro-keywords")
        .addEventListener("keydown", function (e) {
          var x = document.getElementById(this.id + " autocomplete-list");
          if (x) x = x.getElementsByTagName("div");
          if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
                  increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 38) {
            //up
            /*If the arrow UP key is pressed,
                  decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
          } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
              /*and simulate a click on the "active" item:*/
              if (x) x[currentFocus].click();
            }
          }
        });
      function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = x.length - 1;
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
      }
      function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
              except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
          if (
            elmnt != x[i] &&
            elmnt != document.getElementById("intro-keywords")
          ) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
      });
    },
  });
});

//search-main
$("#intro-keywords-main").keydown(function () {
    $('.loader').show();
    $('.button.ripple-effect').hide();
})
$("#intro-keywords-main").keyup(function () {
 
  $.ajax({
    url: "http://27.78.33.234:8000/api/course-list",
    type: "POST",
    dataType: "json",
    data: {
      queries: $(this).val(),
      flag: 0
    },
    success: function (data) {
        setTimeout(() => {  
            //Reset keyword nhập vô trước:
            var currentFocus;
            var a,b,i,val = data.word_search;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) {
                return false;
            }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", "searchsuggest");
            a.setAttribute("class", "listings-container compact-list-layout margin-top-5");
            a.setAttribute("style","position: absolute; top: 100%;z-index: 99;left: 16px;right: 14px;")
            /*append the DIV element as a child of the autocomplete container:*/
            document.getElementById("banner").parentNode.appendChild(a);
            for (i = 0; i < data.result.courses.length; i++) {
            document.getElementById("searchsuggest").innerHTML +=
                '<a id="' +
                data.result.courses[i]._source.course_tag +
                '" onclick="detailCourse(this)" style="cursor:pointer" class="job-listing item">' +
                '<div class="job-listing-details">' +
                '<div class="job-listing-company-logo">' +
                '<img src="' +
                data.result.courses[i]._source.course_image +
                '" style="width:50px;height:50px;" alt="">' +
                "</div>" +
                '<div class="job-listing-description">' +
                '<h3 class="job-listing-title">' +
                data.result.courses[i]._source.course_title +
                "</h3>" +
                '<div class="job-listing-footer">' +
                "<ul>" +
                '<li><i class="icon-material-outline-location-city"></i> ' +
                data.result.courses[i]._source.offer_by +
                ' <div class="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>' +
                '<li><i class="icon-material-outline-language"></i> ' +
                data.result.courses[i]._source.language +
                "</li>" +
                '<li><i class="icon-material-outline-star-border"></i> ' +
                data.result.courses[i]._source.rating +
                "</li>" +
                '<li><i class="icon-material-outline-person-pin"></i> ' +
                data.result.courses[i]._source.enrolled +
                "</li>" +
                "</ul>" +
                "<div>" +
                "</div>" +
                "</div>";
            if(i==2){
                break;
            }
            }
            $('.loader').hide();
            $('.button.ripple-effect').show();
         }, 1000);  
        
      document
      .getElementById("intro-keywords-main")
      .addEventListener("keydown", function (e) {
        closeAllLists(e.target);
      });
      function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
              except the one passed as an argument:*/
        var x = document.getElementsByClassName("listings-container compact-list-layout margin-top-5");
        for (var i = 0; i < x.length; i++) {
          if (
            elmnt != x[i] &&
            elmnt != document.getElementById("intro-keywords-main")
          ) {
            
            x[i].parentNode.removeChild(x[i]);
          }
          else{
            x[i].parentNode.removeChild(x[i]);
          }
       
        }
      }
      /*execute a function when someone clicks in the document:*/
      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
      });
    },
  });
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


