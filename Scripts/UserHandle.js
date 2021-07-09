var lst_cate = []
var lst_sub_user = []
$('#user-dropdown').click(function(){
    console.log('cc')
})

function logIntoDev(username){
    $.ajax({
        url: "http://127.0.0.1:8000/api/user?username=" + username, //http://27.78.33.234:8000/api/course-list
        type: "GET",
        dataType: "json",
        success: function (result) {
          
            user_data = {
                'time_onscreen_page': result[0].time_onscreen_page,
                'most_url_click': result[0].most_url_click,
                'avt': result[0].avartar,
                'type1':result[0].type1,
                'type2': result[0].type2,
                'type3': result[0].type3
            }
            sessionStorage.setItem("user", result[0].name);
            sessionStorage.setItem("userid", result[0].userid);
            sessionStorage.setItem('data',JSON.stringify(user_data))
            document.getElementById('username').innerHTML =  result[0].username + '<span>Freelancer</span>'
            location.reload();
        }	
    })
}
function logout(){
    $.ajax({
        url: "http://127.0.0.1:8000/api/getuseraction", //http://27.78.33.234:8000/api/course-list
        type: "POST",
        dataType: "json",
        data: {
            userid: sessionStorage.getItem('userid'),
            list_action_time: JSON.stringify(sessionStorage.getItem('user_action_time')),
            list_action_click: JSON.stringify(sessionStorage.getItem('user_action_click'))
        },
        success: function (result) {
            // do not anything
        }
    })
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('userid')
    sessionStorage.removeItem('data')
    sessionStorage.removeItem('user_action_time')
    sessionStorage.removeItem('user_action_click')
    location.reload()
}

$(document).ready(function (){
     //logged in
  if(sessionStorage.getItem('user')==undefined){
    $('.user-menu').hide();
    $('.recommendation').hide();
  }
  else{
    $('.log-in-button').hide();
    document.getElementById('username').innerHTML = sessionStorage.getItem('user')
    //course for user:
    courseForYou(sessionStorage.getItem('user'));
  }

  $.ajax({
    type: "GET",
    url: "http://127.0.0.1:8000/api/course?review_option=on",
    contentType:"application/json",
    dataType:"json",
    success: function (data) {
      for(var i = 0; i < data.length; i++){
        if(data[i].skill_gain == null){
            data[i].skill_gain = 'None';
        }
        if(data[i].subtitle == null){
          data[i].subtitle = 'None'
        }
        lst_cate.push(data[i].skill_gain.split(","));
        lst_sub_user.push(data[i].subtitle.split(", "));
      }
      cate_tag();
      
    }
  });
  
})

function courseForYou(username){
    
    k1 = JSON.parse(sessionStorage.getItem('data')).time_onscreen_page;
    k2 = JSON.parse(sessionStorage.getItem('data')).most_url_click;
    $.ajax({
        url: "http://127.0.0.1:8000/api/courseforuser?k1=" + k1 + "&k2=" + k2, //http://27.78.33.234:8000/api/course-list
        type: "GET",
        dataType: "json",
        success: function (result) {
            for(var i = 0; i< result.length; i++){
                document.getElementById('list-course-for-user').innerHTML += '<a id="'+result[i].course_tag+'" onclick="detailCourse(this)" style="cursor:pointer" class="job-listing with-apply-button">' +
                    ' <div class="job-listing-details">' +
                        ' <div class="job-listing-company-logo">' +
                            '<img src="'+result[i].course_image+'" alt="">' +
                        '</div>' +
                        '<div class="job-listing-description">'+
                            '<h3 class="job-listing-title">'+result[i].course_title +'</h3>'+
                            '<div class="job-listing-footer">'+
                                '<ul>'+
                                    '<li><i class="icon-material-outline-business"></i>'+result[i].offer_by+'<div class="verified-badge" title="Verified Employer" data-tippy-placement="top"></div></li>'+
                                    '<li><i class="icon-material-outline-person-pin"></i> '+result[i].enrolled+'</li>'+
                                    '<li>'+gen_star_custom(result[i].rating)+'</li>'+
                                    '<li><i class="icon-material-outline-access-time"></i> 2 days ago</li>'+
                                '</ul>'+
                            '</div>'+
                        '</div>'+
                        '<span class="list-apply-button ripple-effect">Go to class</span>'+
                    '</div>'+
                ' </a>'	
                if(i==4){
                    break
                }
            }
           
        }	
    })
}






//-------------------------------------------------------------------

function gen_star_custom(star){
    if(star < 5 && star > 4){
        return '<div class="star-rating" style="margin-bottom:-7px" data-rating="'+star+'"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star half"></span></div>'
    }
    if(star < 4 && star > 3){
        return '<div class="star-rating" style="margin-bottom:-7px" data-rating="'+star+'"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star half"></span><span class="star empty"></span></div>'
    }
    if(star < 3 && star > 2){
        return '<div class="star-rating" style="margin-bottom:-7px" data-rating="'+star+'"><span class="star"></span><span class="star"></span><span class="star half"></span><span class="star empty"></span><span class="star empty"></span></div>'
    }
    if(star < 2 && star > 1){
        return '<div class="star-rating" style="margin-bottom:-7px" data-rating="'+star+'"><span class="star"></span><span class="star half"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span></div>'
    }

    switch(star) {
        case 5:
            return '<div class="star-rating" style="margin-bottom:-7px" data-rating="5.0"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span></div>'
            break;
        case 4:
            return '<div class="star-rating" style="margin-bottom:-7px" data-rating="4.0"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star"></span><span class="star empty"></span></div>'
            break;
        case 3:
            return '<div class="star-rating" style="margin-bottom:-7px" data-rating="4.0"><span class="star"></span><span class="star"></span><span class="star"></span><span class="star empty"></span><span class="star empty"></span></div>'
            break
        case 2:
            return '<div class="star-rating" style="margin-bottom:-7px" data-rating="2.0"><span class="star"></span><span class="star"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span></div>'
            break
        case 1:
            return '<div class="star-rating" style="margin-bottom:-7px" data-rating="1.0"><span class="star"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span><span class="star empty"></span></div>'
            break 
        default:
            return star
            break
      }
}


function cate_tag() {
    struc = calculate_list(lst_cate);
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
        if (j.count == lst_sorted[i] && j.skill != 'None') {
          const index = struc.indexOf(j);
          if (index > -1) {
            struc.splice(index, 1);
          }
          document.getElementById('pop-cate').innerHTML += '<div class="col-xl-3 col-md-6">'+
                    '<a id="'+j.skill+'" onclick="searchByTopCate(this)" class="backgroud photo-box small" style="cursor:pointer">'+
                        '<div class="photo-box-content">'+
                            ' <h3>'+j.skill+'</h3>'+
                            ' <span>'+j.count+'</span>' +
                        '</div>' +
                    '</a>' + 
                        '</div>'
          temp++;
        }
  
        if (temp > 8) break;
      }
    }
}

function sub_tag_user(){
  struc = calculate_list(lst_sub);
  select = document.getElementById("listsub");
  $("ul.dropdown-menu").attr("id", "dropdown");
  $("ul.dropdown-menu").attr("style", "max-height: 245px; overflow-y: auto;");
  temp = 0
  for (var j of struc) {
    if (j == null) {
      continue;
    }
    var opt = document.createElement("option");
    opt.innerHTML = j.skill;
    select.appendChild(opt);
    document.getElementById("dropdown").innerHTML +=
      '<li data-original-index="' +
      temp +
      '">' +
      '<a tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false">' +
      '<span class="text">' +
      j.skill +
      "</span>" +
      '<span class="glyphicon glyphicon-ok check-mark"></span>' +
      "</a></li>";
      temp++;
  }
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
  
//Tính năng Search
function autocomplete(inp, arr) {
  struc = calculate_list(arr);
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
      var a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();
      if (!val) { return false; }
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      //var n = str.search(val.toUpperCase());
      /*for each item in the array...*/


      for (j of struc) {
        
          /*check if the item starts with the same letters as the text field value:*/
          if (j.skill.substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + j.skill.substr(0, val.length) + "</strong>";
            b.innerHTML += j.skill.substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + j.skill + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                  /*insert the value for the autocomplete text field:*/
                  inp.value = this.getElementsByTagName("input")[0].value;
                  /*close the list of autocompleted values,
                  (or any other open lists of autocompleted values:*/
                  closeAllLists();
                });
            a.appendChild(b);
          }

      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
      } else if (e.keyCode == 38) { //up
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
      if (currentFocus < 0) currentFocus = (x.length - 1);
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
          if (elmnt != x[i] && elmnt != inp) {
              x[i].parentNode.removeChild(x[i]);
          }
      }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
// autocomplete(document.getElementById("intro-keywords-sub"), lst_sub_user)
// autocomplete(document.getElementById("intro-keywords-skill"), lst_cate);
$("#intro-keywords-subtitle").keydown(function () {
  autocomplete(document.getElementById("intro-keywords-subtitle"), lst_sub_user);
})
$("#intro-keywords-skill").keydown(function () {
  autocomplete(document.getElementById("intro-keywords-skill"), lst_cate);
})

